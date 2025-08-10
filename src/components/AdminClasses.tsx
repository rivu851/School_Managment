import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Calendar,
  Plus,
  Eye,
  Edit,
  GraduationCap,
  Clock,
  BarChart3
} from "lucide-react";

const classes = [
  {
    id: 1,
    name: "Class 12-A",
    students: 35,
    subjects: ["Mathematics", "Physics", "Chemistry", "English"],
    teacher: "Dr. Sarah Johnson",
    performance: 92,
    attendance: 95,
    recentTests: 3,
    schedule: [
      { day: "Monday", periods: ["Math", "Physics", "Chemistry"] },
      { day: "Tuesday", periods: ["English", "Math", "Lab"] }
    ]
  },
  {
    id: 2,
    name: "Class 11-B",
    students: 32,
    subjects: ["Mathematics", "Physics", "Biology", "English"],
    teacher: "Prof. Michael Chen",
    performance: 88,
    attendance: 92,
    recentTests: 2,
    schedule: [
      { day: "Monday", periods: ["Biology", "Math", "English"] },
      { day: "Tuesday", periods: ["Physics", "Biology", "Math"] }
    ]
  },
  {
    id: 3,
    name: "Class 10-C",
    students: 38,
    subjects: ["Mathematics", "Science", "Social Studies", "English"],
    teacher: "Ms. Emily Rodriguez",
    performance: 85,
    attendance: 89,
    recentTests: 4,
    schedule: [
      { day: "Monday", periods: ["Math", "Science", "English"] },
      { day: "Tuesday", periods: ["Social", "Math", "Science"] }
    ]
  }
];

const classStats = {
  totalStudents: 1247,
  totalClasses: 34,
  averagePerformance: 88.5,
  averageAttendance: 92.1
};

const getPerformanceColor = (score: number) => {
  if (score >= 90) return "text-green-600";
  if (score >= 75) return "text-yellow-600";
  return "text-red-600";
};

export const AdminClasses = () => {
  const [selectedClass, setSelectedClass] = useState<any>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="card-3d p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">Classes Management</h1>
            <p className="text-muted-foreground">Monitor and manage all classes</p>
          </div>
          <Button className="animate-glow">
            <Plus className="w-4 h-4 mr-2" />
            Create New Class
          </Button>
        </div>
      </div>

      {/* Class Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-3d">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{classStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">across all classes</p>
          </CardContent>
        </Card>
        <Card className="card-3d">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{classStats.totalClasses}</div>
            <p className="text-xs text-muted-foreground">active this year</p>
          </CardContent>
        </Card>
        <Card className="card-3d">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{classStats.averagePerformance}%</div>
            <p className="text-xs text-muted-foreground">+2.5% from last term</p>
          </CardContent>
        </Card>
        <Card className="card-3d">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{classStats.averageAttendance}%</div>
            <p className="text-xs text-muted-foreground">+1.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Classes Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-fit">
          <TabsTrigger value="overview">Class Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {classes.map((classItem) => (
              <Card key={classItem.id} className="card-3d hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <CardTitle className="text-gradient flex items-center justify-between">
                    <span>{classItem.name}</span>
                    <Badge variant="outline">{classItem.students} students</Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Class Teacher: {classItem.teacher}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-lg bg-muted/20">
                      <div className={`text-lg font-bold ${getPerformanceColor(classItem.performance)}`}>
                        {classItem.performance}%
                      </div>
                      <div className="text-xs text-muted-foreground">Performance</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/20">
                      <div className={`text-lg font-bold ${getPerformanceColor(classItem.attendance)}`}>
                        {classItem.attendance}%
                      </div>
                      <div className="text-xs text-muted-foreground">Attendance</div>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div>
                    <div className="text-sm font-medium mb-2">Subjects:</div>
                    <div className="flex flex-wrap gap-1">
                      {classItem.subjects.map((subject) => (
                        <Badge key={subject} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setSelectedClass(classItem)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit Class
                    </Button>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="ghost" className="justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Student List
                    </Button>
                    <Button size="sm" variant="ghost" className="justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Test
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="text-gradient">Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Class Performance Analytics</h3>
                  <p className="text-muted-foreground mb-4">
                    Detailed performance metrics and trends
                  </p>
                  <Button>View Analytics</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="text-gradient">Attendance Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Attendance Analytics</h3>
                  <p className="text-muted-foreground mb-4">
                    Track attendance patterns across classes
                  </p>
                  <Button>View Reports</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Class Details Dialog */}
      {selectedClass && (
        <Dialog open={!!selectedClass} onOpenChange={() => setSelectedClass(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedClass.name} - Detailed View</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <h4 className="font-semibold text-gradient">Class Information</h4>
                <div className="space-y-2">
                  <p><strong>Students:</strong> {selectedClass.students}</p>
                  <p><strong>Class Teacher:</strong> {selectedClass.teacher}</p>
                  <p><strong>Performance:</strong> {selectedClass.performance}%</p>
                  <p><strong>Attendance:</strong> {selectedClass.attendance}%</p>
                  <p><strong>Recent Tests:</strong> {selectedClass.recentTests}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-gradient">Schedule</h4>
                <div className="space-y-2">
                  {selectedClass.schedule.map((day: any) => (
                    <div key={day.day} className="p-3 rounded-lg bg-muted/20">
                      <div className="font-medium">{day.day}</div>
                      <div className="text-sm text-muted-foreground">
                        {day.periods.join(' • ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};