import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, BookOpen, AlertCircle, CheckCircle, UserCheck, GraduationCap } from "lucide-react";

const todayClasses = [
  { time: "9:00 AM", subject: "Mathematics", class: "Class 12-A", room: "Room 101", duration: "45 min" },
  { time: "10:30 AM", subject: "Physics", class: "Class 11-B", room: "Lab 201", duration: "60 min" },
  { time: "2:00 PM", subject: "Mathematics", class: "Class 10-C", room: "Room 101", duration: "45 min" },
  { time: "3:15 PM", subject: "Statistics", class: "Class 12-B", room: "Room 105", duration: "45 min" },
];

const announcements = [
  { title: "Parent-Teacher Meeting", date: "Jan 25", priority: "high" },
  { title: "Mid-term Exam Schedule", date: "Jan 28", priority: "medium" },
  { title: "Science Fair Preparation", date: "Feb 1", priority: "low" },
];

const upcomingTasks = [
  { task: "Grade Math Test Papers", deadline: "Today", status: "pending" },
  { task: "Prepare Physics Lab Report", deadline: "Tomorrow", status: "in-progress" },
  { task: "Submit Monthly Report", deadline: "Jan 30", status: "pending" },
  { task: "Review Homework Assignments", deadline: "Jan 26", status: "completed" },
];

export const TeacherDashboard = () => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="card-3d p-6">
        <h1 className="text-3xl font-bold text-gradient mb-2">Welcome back, Teacher!</h1>
        <p className="text-muted-foreground flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {currentDate} • {currentTime}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 " >
        <Card className="card-3d border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{todayClasses.length}</div>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>

        <Card className="card-3d border-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Users className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">156</div>
            <p className="text-xs text-muted-foreground">Total enrolled</p>
          </CardContent>
        </Card>

        <Card className="card-3d border-warning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {upcomingTasks.filter(t => t.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">To complete</p>
          </CardContent>
        </Card>

        <Card className="card-3d border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <BookOpen className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">12</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="text-gradient flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayClasses.map((cls, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div>
                  <div className="font-medium">{cls.subject}</div>
                  <div className="text-sm text-muted-foreground">{cls.class} • {cls.room}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{cls.time}</div>
                  <div className="text-sm text-muted-foreground">{cls.duration}</div>
                </div>
              </div>
            ))}
            <Button className="w-full mt-4" variant="outline">
              View Full Timetable
            </Button>
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="text-gradient">Announcements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {announcements.map((announcement, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <div className="font-medium">{announcement.title}</div>
                  <div className="text-sm text-muted-foreground">{announcement.date}</div>
                </div>
                <Badge 
                  variant={announcement.priority === "high" ? "destructive" : 
                          announcement.priority === "medium" ? "default" : "secondary"}
                >
                  {announcement.priority}
                </Badge>
              </div>
            ))}
            <Button className="w-full mt-4" variant="outline">
              View All Announcements
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="text-gradient">Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  {task.status === "completed" ? (
                    <CheckCircle className="w-4 h-4 text-success" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-warning" />
                  )}
                  <div>
                    <div className="font-medium">{task.task}</div>
                    <div className="text-sm text-muted-foreground">Due: {task.deadline}</div>
                  </div>
                </div>
                <Badge 
                  variant={task.status === "completed" ? "default" : 
                          task.status === "in-progress" ? "secondary" : "outline"}
                >
                  {task.status}
                </Badge>
              </div>
            ))}
            <Button className="w-full mt-4" variant="outline">
              View All Tasks
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="text-gradient">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <UserCheck className="w-4 h-4 mr-2" />
              Mark Attendance
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BookOpen className="w-4 h-4 mr-2" />
              Create Assignment
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <GraduationCap className="w-4 h-4 mr-2" />
              Schedule Test
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              View Student Performance
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default TeacherDashboard;