import { Clock, UserCheck, FileText, Calendar, Star } from "lucide-react";

export const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "attendance",
      title: "John Smith marked present",
      description: "Grade 10 - Mathematics",
      time: "2 minutes ago",
      icon: UserCheck,
      color: "text-success"
    },
    {
      id: 2,
      type: "assignment",
      title: "New assignment submitted",
      description: "Emma Johnson - Physics Project",
      time: "15 minutes ago",
      icon: FileText,
      color: "text-primary"
    },
    {
      id: 3,
      type: "grade",
      title: "Grade updated",
      description: "Michael Brown - Chemistry Quiz: A+",
      time: "1 hour ago",
      icon: Star,
      color: "text-secondary"
    },
    {
      id: 4,
      type: "schedule",
      title: "Class rescheduled",
      description: "Biology Lab - Room 301 → Room 205",
      time: "2 hours ago",
      icon: Calendar,
      color: "text-accent"
    },
    {
      id: 5,
      type: "attendance",
      title: "Sarah Davis marked absent",
      description: "Grade 9 - English Literature",
      time: "3 hours ago",
      icon: UserCheck,
      color: "text-muted-foreground"
    }
  ];

  return (
    <div className="card-3d p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gradient">Recent Activity</h3>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Live updates</span>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          
          return (
            <div 
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-card-glass to-card border border-white/5 hover:border-white/10 transition-all duration-300 group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`p-2 rounded-lg bg-card-glass border border-white/10 ${activity.color} group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-4 h-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {activity.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <button className="text-sm text-primary hover:text-primary-glow transition-colors font-medium">
          View all activity →
        </button>
      </div>
    </div>
  );
};