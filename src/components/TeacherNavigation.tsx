"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  Calendar,
  UserCheck,
  BookOpen,
  GraduationCap,
  TrendingUp,
  ClipboardList,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "timetable", label: "Timetable", icon: Calendar },
  { id: "attendance", label: "Attendance", icon: UserCheck },
  { id: "assignments", label: "Assignments", icon: BookOpen },
  { id: "grading", label: "Grading", icon: ClipboardList },
  { id: "tests", label: "Tests & Exams", icon: GraduationCap },
  { id: "performance", label: "Performance", icon: TrendingUp },
];

interface TeacherNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const TeacherNavigation = ({
  activeSection,
  onSectionChange,
}: TeacherNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden glass border-white/20 bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <nav
        className={cn(
          "fixed left-0 top-0 h-full w-64 glass backdrop-blur-xl border-r border-white/10 z-40 transform transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center animate-glow">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">Pamela</h1>
              <p className="text-sm text-muted-foreground">Teacher Portal</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left group",
                    isActive
                      ? "bg-blue-600/90 text-white shadow-[0_10px_28px_-12px_rgba(37,99,235,0.7)] ring-1 ring-blue-400/40 hover:ring-blue-300/60"
                      : "hover:bg-white/5 text-muted-foreground hover:text-foreground hover:translate-x-0.5 hover:shadow-[0_6px_20px_-12px_rgba(59,130,246,0.35)]"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-transform duration-300",
                      isActive ? "scale-110" : "group-hover:scale-110"
                    )}
                  />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom User Info */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="card-3d p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-secondary-foreground">
                  TR
                </span>
              </div>
              <div>
                <p className="font-medium">Teacher User</p>
                <p className="text-sm text-muted-foreground">
                  Mathematics Dept.
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default TeacherNavigation;
