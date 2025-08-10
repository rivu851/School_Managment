import React, { Suspense, useState } from "react";
import TeacherNavigation from "../components/TeacherNavigation";
import TeacherTests from "../components/TeacherTests";
import { TeacherPerformance } from "../components/TeacherPerformance"; // Named import
import TeacherDashboard from "../components/TeacherDashboard";
import TeacherGrading from "@/components/TeacherGrading";
import TeacherAssignments from "@/components/TeacherAssignments";
import TeacherAttendance from "@/components/TeacherAttendance";


type SectionId = "tests" | "performance" | "dashboard";

const TeacherPortal = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("dashboard");
  const [fadeKey, setFadeKey] = useState(0); // forces re-animation

  const handleSectionChange = (section: SectionId) => {
    setFadeKey((prev) => prev + 1); // trigger animation reset
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "tests":
        return <TeacherTests />;
      case "performance":
        return <TeacherPerformance />;
        case "grading":
        return <TeacherGrading />;
        case "assignments":
        return <TeacherAssignments />;
        case "attendance":
        return <TeacherAttendance />;

      default:
        return <TeacherDashboard onNavigate={setActiveSection} />;
    }
  };

  return (
    <div
      className="min-h-screen text-slate-100 bg-[#0b1220] 
                 bg-[radial-gradient(1200px_600px_at_20%_0%,rgba(37,99,235,0.18),transparent_60%)]"
    >
      <TeacherNavigation
        activeSection={activeSection}
        onSectionChange={(s) => handleSectionChange(s as SectionId)}
      />

      {/* Fade animation wrapper with loading fallback */}
      <main
        key={fadeKey}
        className="md:ml-64 p-6 transition-opacity duration-500 ease-in-out opacity-100 animate-fadeIn"
      >
        <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
          {renderContent()}
        </Suspense>
      </main>
    </div>
  );
};

export default TeacherPortal;
