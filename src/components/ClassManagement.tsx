import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, Calendar, TrendingUp, Plus, Edit, Eye } from "lucide-react";

const classes = [
  {
    id: "12-science",
    name: "Class 12 - Science",
    students: 45,
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
    teacher: "Dr. Sarah Johnson",
    performance: 88,
    attendance: 92,
    recentTests: 3,
    schedule: "Mon-Fri 8:00 AM - 2:00 PM"
  },
  {
    id: "11-science",
    name: "Class 11 - Science", 
    students: 48,
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
    teacher: "Prof. Michael Brown",
    performance: 85,
    attendance: 89,
    recentTests: 2,
    schedule: "Mon-Fri 8:00 AM - 2:00 PM"
  },
  {
    id: "10-general",
    name: "Class 10 - General",
    students: 52,
    subjects: ["Mathematics", "Science", "English", "Social Studies"],
    teacher: "Ms. Emily Davis",
    performance: 82,
    attendance: 94,
    recentTests: 4,
    schedule: "Mon-Fri 9:00 AM - 3:00 PM"
  }
];

const classStats = {
  totalStudents: 145,
  totalClasses: 3,
  averagePerformance: 85,
  averageAttendance: 92
};

const getPerformanceColor = (score: number) => {
  if (score >= 90) return "text-success";
  if (score >= 80) return "text-warning";
  return "text-destructive";
};

export const ClassManagement = () => {
  const [selectedClass, setSelectedClass] = useState("12-science");
  
  const currentClass = classes.find(c => c.id === selectedClass)!;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-3d border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{classStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>

        <Card className="card-3d border-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{classStats.totalClasses}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card className="card-3d border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{classStats.averagePerformance}%</div>
            <p className="text-xs text-muted-foreground">School average</p>
          </CardContent>
        </Card>

        <Card className="card-3d border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{classStats.averageAttendance}%</div>
            <p className="text-xs text-muted-foreground">Average attendance</p>
          </CardContent>
        </Card>
      </div>

      {/* Class Management */}
      <Tabs value={selectedClass} onValueChange={setSelectedClass}>
        <div className="flex items-center justify-between mb-4">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            {classes.map((cls) => (
              <TabsTrigger key={cls.id} value={cls.id} className="text-xs">
                {cls.name.split(' - ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Class
          </Button>
        </div>

        {classes.map((cls) => (
          <TabsContent key={cls.id} value={cls.id} className="space-y-6">
            {/* Class Overview */}
            <Card className="card-3d">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-gradient">{cls.name}</CardTitle>
                    <p className="text-muted-foreground mt-1">Taught by {cls.teacher}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit Class
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <p className="text-2xl font-bold text-primary">{cls.students}</p>
                    <p className="text-sm text-muted-foreground">Students</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <p className={`text-2xl font-bold ${getPerformanceColor(cls.performance)}`}>
                      {cls.performance}%
                    </p>
                    <p className="text-sm text-muted-foreground">Performance</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <p className="text-2xl font-bold text-success">{cls.attendance}%</p>
                    <p className="text-sm text-muted-foreground">Attendance</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <p className="text-2xl font-bold text-accent">{cls.recentTests}</p>
                    <p className="text-sm text-muted-foreground">Recent Tests</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subjects & Schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="text-gradient">Subjects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {cls.subjects.map((subject, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">Schedule</p>
                    <p className="font-medium">{cls.schedule}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="text-gradient">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    View Student List
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Manage Assignments
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Test
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};