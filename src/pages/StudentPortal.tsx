import { useState } from "react";
import { StudentNavigation } from "@/components/StudentNavigation";
import { StudentDashboard } from "@/components/StudentDashboard";
import { StudentMarks } from "@/components/StudentMarks";
import { StudentTests } from "@/components/StudentTests";
import { StudentDoubts } from "@/components/StudentDoubts";
import { StudentImprovement } from "@/components/StudentImprovement";

const StudentPortal = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <StudentDashboard />;
      case "marks":
        return <StudentMarks />;
      case "tests":
        return <StudentTests />;
      case "doubts":
        return <StudentDoubts />;
      case "improvement":
        return <StudentImprovement />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="min-h-screen student-theme">
      <StudentNavigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <main className="md:ml-64 p-6 animate-fade-in">
        <div className="animate-slide-up">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default StudentPortal;