import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";
import { Students } from "@/components/Students";
import { AdminTeachers } from "@/components/AdminTeachers";
import { AdminClasses } from "@/components/AdminClasses";
import { AdminSchedule } from "@/components/AdminSchedule";
import { AdminReports } from "@/components/AdminReports";
import { AdminSettings } from "@/components/AdminSettings";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "students":
        return <Students />;
      case "teachers":
        return <AdminTeachers />;
      case "classes":
        return <AdminClasses />;
      case "schedule":
        return <AdminSchedule />;
      case "reports":
        return <AdminReports />;
      case "settings":
        return <AdminSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <main className="md:ml-64 p-4 sm:p-6">
        <div className="animate-slide-up">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;