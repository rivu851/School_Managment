import { useState } from "react";
import { BookOpen, TrendingUp, MessageSquare, FileText, Trophy, Menu, X, LogOut } from "lucide-react";

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: BookOpen },
  { id: "marks", label: "My Marks", icon: Trophy },
  { id: "tests", label: "Take Tests", icon: FileText },
  { id: "doubts", label: "Ask Doubts", icon: MessageSquare },
  { id: "improvement", label: "Improvement", icon: TrendingUp },
];

interface StudentNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const StudentNavigation = ({ activeSection, onSectionChange }: StudentNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card/80 backdrop-blur-md border border-white/10"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <nav className={`fixed left-0 top-0 h-full w-64 bg-card/70 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}>
        
        {/* Logo Section */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">Pamela</h1>
              <p className="text-sm text-muted-foreground">Student Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="p-4 space-y-2">
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
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Student Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary-glow flex items-center justify-center">
              <span className="text-sm font-bold text-secondary-foreground">JS</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">John Smith</p>
              <p className="text-xs text-muted-foreground">Grade 10 - Science</p>
            </div>
            <button className="p-2 hover:bg-destructive/20 hover:text-destructive rounded-lg transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
