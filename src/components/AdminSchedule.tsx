import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  Users,
  Plus,
  Edit,
  Eye,
  MapPin
} from "lucide-react";

const scheduleData = {
  Monday: [
    { time: "8:00-9:00", class: "12-A", subject: "Mathematics", teacher: "Dr. Sarah Johnson", room: "101" },
    { time: "9:00-10:00", class: "11-B", subject: "Physics", teacher: "Prof. Michael Chen", room: "Lab-201" },
    { time: "10:00-11:00", class: "10-C", subject: "English", teacher: "Ms. Emily Rodriguez", room: "205" },
    { time: "11:30-12:30", class: "12-B", subject: "Chemistry", teacher: "Dr. James Wilson", room: "Lab-101" },
    { time: "2:00-3:00", class: "11-A", subject: "Biology", teacher: "Ms. Lisa Park", room: "Lab-301" }
  ],
  Tuesday: [
    { time: "8:00-9:00", class: "11-A", subject: "Mathematics", teacher: "Dr. Sarah Johnson", room: "101" },
    { time: "9:00-10:00", class: "12-A", subject: "Physics", teacher: "Prof. Michael Chen", room: "Lab-201" },
    { time: "10:00-11:00", class: "10-A", subject: "English", teacher: "Ms. Emily Rodriguez", room: "205" },
    { time: "11:30-12:30", class: "11-C", subject: "Chemistry", teacher: "Dr. James Wilson", room: "Lab-101" },
    { time: "2:00-3:00", class: "12-C", subject: "Biology", teacher: "Ms. Lisa Park", room: "Lab-301" }
  ],
  Wednesday: [
    { time: "8:00-9:00", class: "10-B", subject: "Mathematics", teacher: "Dr. Sarah Johnson", room: "101" },
    { time: "9:00-10:00", class: "11-B", subject: "Physics", teacher: "Prof. Michael Chen", room: "Lab-201" },
    { time: "10:00-11:00", class: "12-A", subject: "English", teacher: "Ms. Emily Rodriguez", room: "205" },
    { time: "11:30-12:30", class: "10-C", subject: "Chemistry", teacher: "Dr. James Wilson", room: "Lab-101" },
    { time: "2:00-3:00", class: "11-A", subject: "Biology", teacher: "Ms. Lisa Park", room: "Lab-301" }
  ],
  Thursday: [
    { time: "8:00-9:00", class: "12-B", subject: "Mathematics", teacher: "Dr. Sarah Johnson", room: "101" },
    { time: "9:00-10:00", class: "10-A", subject: "Physics", teacher: "Prof. Michael Chen", room: "Lab-201" },
    { time: "10:00-11:00", class: "11-C", subject: "English", teacher: "Ms. Emily Rodriguez", room: "205" },
    { time: "11:30-12:30", class: "12-A", subject: "Chemistry", teacher: "Dr. James Wilson", room: "Lab-101" },
    { time: "2:00-3:00", class: "10-B", subject: "Biology", teacher: "Ms. Lisa Park", room: "Lab-301" }
  ],
  Friday: [
    { time: "8:00-9:00", class: "11-C", subject: "Mathematics", teacher: "Dr. Sarah Johnson", room: "101" },
    { time: "9:00-10:00", class: "12-B", subject: "Physics", teacher: "Prof. Michael Chen", room: "Lab-201" },
    { time: "10:00-11:00", class: "10-C", subject: "English", teacher: "Ms. Emily Rodriguez", room: "205" },
    { time: "11:30-12:30", class: "11-A", subject: "Chemistry", teacher: "Dr. James Wilson", room: "Lab-101" },
    { time: "2:00-3:00", class: "12-C", subject: "Biology", teacher: "Ms. Lisa Park", room: "Lab-301" }
  ]
};

const timeSlots = [
  "8:00-9:00", "9:00-10:00", "10:00-11:00", "11:30-12:30", "2:00-3:00"
];

export const AdminSchedule = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const getSubjectColor = (subject: string) => {
    const colors = {
      "Mathematics": "bg-blue-100 text-blue-800 border-blue-200",
      "Physics": "bg-purple-100 text-purple-800 border-purple-200",
      "Chemistry": "bg-green-100 text-green-800 border-green-200",
      "Biology": "bg-orange-100 text-orange-800 border-orange-200",
      "English": "bg-pink-100 text-pink-800 border-pink-200"
    };
    return colors[subject as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="card-3d p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">Schedule Management</h1>
            <p className="text-muted-foreground">Manage and view school timetables</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Schedule
            </Button>
            <Button className="animate-glow">
              <Plus className="w-4 h-4 mr-2" />
              Add Period
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="weekly" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-fit">
          <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          <TabsTrigger value="teachers">Teacher Schedule</TabsTrigger>
          <TabsTrigger value="rooms">Room Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-6">
          {/* Day Selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(scheduleData).map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? "default" : "outline"}
                onClick={() => setSelectedDay(day)}
                className={day === today ? "ring-2 ring-primary/50" : ""}
              >
                {day}
                {day === today && <Badge className="ml-2" variant="secondary">Today</Badge>}
              </Button>
            ))}
          </div>

          {/* Schedule Grid */}
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="text-gradient flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {selectedDay} Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduleData[selectedDay as keyof typeof scheduleData].map((period, index) => (
                  <div 
                    key={index}
                    className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="font-medium">{period.time}</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={getSubjectColor(period.subject)}>
                          {period.subject}
                        </Badge>
                        <Badge variant="outline">{period.class}</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {period.teacher}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {period.room}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Overview */}
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="text-gradient">Weekly Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left p-2 font-medium">Time</th>
                      {Object.keys(scheduleData).map((day) => (
                        <th key={day} className="text-left p-2 font-medium">{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((time) => (
                      <tr key={time} className="border-t border-muted">
                        <td className="p-2 font-medium text-sm">{time}</td>
                        {Object.keys(scheduleData).map((day) => {
                          const period = scheduleData[day as keyof typeof scheduleData].find(p => p.time === time);
                          return (
                            <td key={day} className="p-2">
                              {period ? (
                                <div className="text-xs">
                                  <div className="font-medium">{period.subject}</div>
                                  <div className="text-muted-foreground">{period.class}</div>
                                </div>
                              ) : (
                                <div className="text-xs text-muted-foreground">Free</div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teachers" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="text-gradient">Teacher Schedules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Teacher Schedule View</h3>
                <p className="text-muted-foreground mb-4">
                  View individual teacher timetables and workload
                </p>
                <Button>View Teacher Schedules</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rooms" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="text-gradient">Room Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MapPin className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Room Schedule Management</h3>
                <p className="text-muted-foreground mb-4">
                  Track room usage and availability
                </p>
                <Button>View Room Schedules</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};