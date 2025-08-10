import { Trophy, Clock, BookOpen, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const recentTests = [
  { subject: "Mathematics", score: 85, total: 100, date: "2024-01-15", status: "completed" },
  { subject: "Physics", score: 78, total: 100, date: "2024-01-12", status: "completed" },
  { subject: "Chemistry", score: 92, total: 100, date: "2024-01-10", status: "completed" },
];

const upcomingTests = [
  { subject: "Biology", date: "2024-01-20", time: "10:00 AM", duration: "2 hours" },
  { subject: "English", date: "2024-01-22", time: "2:00 PM", duration: "1.5 hours" },
];

const weeklyProgress = [
  { day: "Mon", hours: 3.5 },
  { day: "Tue", hours: 4.2 },
  { day: "Wed", hours: 2.8 },
  { day: "Thu", hours: 3.9 },
  { day: "Fri", hours: 4.5 },
  { day: "Sat", hours: 5.1 },
  { day: "Sun", hours: 2.3 },
];

export const StudentDashboard = () => {
  const averageScore = Math.round(recentTests.reduce((acc, test) => acc + (test.score / test.total) * 100, 0) / recentTests.length);
  const totalStudyHours = weeklyProgress.reduce((acc, day) => acc + day.hours, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="student-card p-6 animate-slide-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold student-gradient mb-2">Welcome back, John!</h1>
            <p style={{ color: 'hsl(var(--student-muted-foreground))' }}>Ready to continue your learning journey?</p>
          </div>
          <div className="text-right animate-float">
            <p className="text-sm" style={{ color: 'hsl(var(--student-muted-foreground))' }}>Current GPA</p>
            <p className="text-2xl font-bold" style={{ color: 'hsl(var(--student-success))' }}>3.8/4.0</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="student-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Trophy className="h-4 w-4 student-text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold student-text-primary">{averageScore}%</div>
            <p className="text-xs" style={{ color: 'hsl(var(--student-muted-foreground))' }}>+2.5% from last month</p>
          </CardContent>
        </Card>

        <Card className="student-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
            <Clock className="h-4 w-4" style={{ color: 'hsl(var(--student-secondary))' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: 'hsl(var(--student-secondary))' }}>{totalStudyHours.toFixed(1)}h</div>
            <p className="text-xs" style={{ color: 'hsl(var(--student-muted-foreground))' }}>This week</p>
          </CardContent>
        </Card>

        <Card className="student-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tests Taken</CardTitle>
            <BookOpen className="h-4 w-4" style={{ color: 'hsl(var(--student-accent))' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: 'hsl(var(--student-accent))' }}>{recentTests.length}</div>
            <p className="text-xs" style={{ color: 'hsl(var(--student-muted-foreground))' }}>This month</p>
          </CardContent>
        </Card>

        <Card className="student-card animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Improvement</CardTitle>
            <TrendingUp className="h-4 w-4" style={{ color: 'hsl(var(--student-success))' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: 'hsl(var(--student-success))' }}>+12%</div>
            <p className="text-xs" style={{ color: 'hsl(var(--student-muted-foreground))' }}>Since last semester</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tests & Upcoming Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Test Results */}
        <Card className="student-card animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle className="student-gradient">Recent Test Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTests.map((test, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:scale-105 transition-all duration-200" 
                   style={{ backgroundColor: 'hsl(var(--student-muted) / 0.5)' }}>
                <div>
                  <p className="font-medium">{test.subject}</p>
                  <p className="text-sm" style={{ color: 'hsl(var(--student-muted-foreground))' }}>{test.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold student-text-primary">{test.score}/{test.total}</p>
                  <p className="text-sm" style={{ color: 'hsl(var(--student-muted-foreground))' }}>{Math.round((test.score / test.total) * 100)}%</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Tests */}
        <Card className="student-card animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <CardHeader>
            <CardTitle className="student-gradient">Upcoming Tests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTests.map((test, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:scale-105 transition-all duration-200"
                   style={{ backgroundColor: 'hsl(var(--student-warning) / 0.1)', border: '1px solid hsl(var(--student-warning) / 0.3)' }}>
                <div>
                  <p className="font-medium">{test.subject}</p>
                  <p className="text-sm" style={{ color: 'hsl(var(--student-muted-foreground))' }}>{test.date} at {test.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium" style={{ color: 'hsl(var(--student-warning))' }}>Duration: {test.duration}</p>
                  <p className="text-xs" style={{ color: 'hsl(var(--student-muted-foreground))' }}>Prepare well!</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Weekly Study Progress */}
      <Card className="student-card animate-slide-up" style={{ animationDelay: '0.7s' }}>
        <CardHeader>
          <CardTitle className="student-gradient">Weekly Study Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end space-x-2 h-32">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center animate-float" style={{ animationDelay: `${index * 0.1}s` }}>
                <div 
                  className="w-full rounded-t-lg transition-all duration-300 hover:scale-110"
                  style={{ 
                    height: `${(day.hours / 6) * 100}%`,
                    background: 'linear-gradient(to top, hsl(var(--student-primary)), hsl(var(--student-primary-glow)))'
                  }}
                ></div>
                <p className="text-xs mt-2" style={{ color: 'hsl(var(--student-muted-foreground))' }}>{day.day}</p>
                <p className="text-xs font-medium">{day.hours}h</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};