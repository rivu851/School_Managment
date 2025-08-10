import { Plus, UserPlus, BookOpen, Calendar, FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export const QuickActions = () => {
  const actions = [
    {
      title: "Add Student",
      description: "Register a new student",
      icon: UserPlus,
      color: "from-primary to-primary-glow",
      action: () => console.log("Add student")
    },
    {
      title: "Create Class",
      description: "Set up a new class",
      icon: BookOpen,
      color: "from-secondary to-secondary-glow",
      action: () => console.log("Create class")
    },
    {
      title: "Schedule Event",
      description: "Add to calendar",
      icon: Calendar,
      color: "from-accent to-accent-glow",
      action: () => console.log("Schedule event")
    },
    {
      title: "Generate Report",
      description: "Create new report",
      icon: FileText,
      color: "from-success to-success-glow",
      action: () => console.log("Generate report")
    },
    {
      title: "Upload Files",
      description: "Add documents",
      icon: Upload,
      color: "from-warning to-yellow-400",
      action: () => console.log("Upload files")
    }
  ];

  return (
    <div className="card-3d p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
          <Plus className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gradient">Quick Actions</h3>
      </div>

      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start p-4 h-auto group hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300"
              onClick={action.action}
            >
              <div className="flex items-center gap-4 w-full">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left flex-1">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {action.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {action.description}
                  </p>
                </div>
              </div>
            </Button>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <Button 
          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow text-white font-medium py-3 rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          View All Tools
        </Button>
      </div>
    </div>
  );
};