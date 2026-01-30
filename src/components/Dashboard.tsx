import { Users, GraduationCap, BookOpen, TrendingUp, Calendar, Clock } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { RecentActivity } from "./RecentActivity";
import { QuickActions } from "./QuickActions";

export const Dashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: "1,247",
      change: "+12%",
      icon: Users,
      gradient: "from-primary to-primary-glow"
    },
    {
      title: "Teachers",
      value: "89",
      change: "+3%",
      icon: GraduationCap,
      gradient: "from-secondary to-secondary-glow"
    },
    {
      title: "Classes",
      value: "34",
      change: "+2%",
      icon: BookOpen,
      gradient: "from-accent to-accent-glow"
    },
    {
      title: "Attendance Rate",
      value: "94.8%",
      change: "+1.2%",
      icon: TrendingUp,
      gradient: "from-success to-success-glow"
    }
  ];

  const upcomingEvents = [
    { title: "Parent-Teacher Meeting", date: "Tomorrow, 2:00 PM", type: "meeting" },
    { title: "Science Exhibition", date: "Friday, 9:00 AM", type: "event" },
    { title: "Mid-term Exams", date: "Next Week", type: "exam" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="card-3d p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">
              Welcome back, Admin!
            </h1>
            <p className="text-muted-foreground text-lg">
              Here's what's happening at your school today.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{new Date().toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={stat.title} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <QuickActions />
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="card-3d p-6">
        <h3 className="text-xl font-bold mb-6 text-gradient-secondary">Upcoming Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingEvents.map((event, index) => (
            <div 
              key={index}
              className="p-4 rounded-xl bg-gradient-to-br from-card-glass to-card border border-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer"
            >
              <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                {event.title}
              </h4>
              <p className="text-sm text-muted-foreground">{event.date}</p>
              <div className={`inline-block px-2 py-1 rounded-full text-xs mt-2 ${
                event.type === 'meeting' ? 'bg-primary/20 text-primary' :
                event.type === 'event' ? 'bg-secondary/20 text-secondary' :
                'bg-accent/20 text-accent'
              }`}>
                {event.type}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
