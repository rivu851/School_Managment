import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";

const weeklySchedule = {
  Monday: [
    { time: "9:00 AM", subject: "Mathematics", class: "12-A", room: "101", type: "theory" },
    { time: "10:30 AM", subject: "Physics", class: "11-B", room: "Lab-201", type: "practical" },
    { time: "2:00 PM", subject: "Mathematics", class: "10-C", room: "101", type: "theory" },
    { time: "3:15 PM", subject: "Statistics", class: "12-B", room: "105", type: "theory" },
  ],
  Tuesday: [
    { time: "9:00 AM", subject: "Mathematics", class: "11-A", room: "101", type: "theory" },
    { time: "11:00 AM", subject: "Physics", class: "12-A", room: "Lab-201", type: "practical" },
    { time: "2:00 PM", subject: "Mathematics", class: "10-A", room: "101", type: "theory" },
  ],
  Wednesday: [
    { time: "9:00 AM", subject: "Mathematics", class: "12-C", room: "101", type: "theory" },
    { time: "10:30 AM", subject: "Statistics", class: "11-B", room: "105", type: "theory" },
    { time: "1:00 PM", subject: "Mathematics", class: "10-B", room: "101", type: "theory" },
    { time: "3:15 PM", subject: "Physics", class: "11-A", room: "Lab-201", type: "practical" },
  ],
  Thursday: [
    { time: "9:00 AM", subject: "Mathematics", class: "12-A", room: "101", type: "theory" },
    { time: "10:30 AM", subject: "Mathematics", class: "11-C", room: "101", type: "theory" },
    { time: "2:00 PM", subject: "Statistics", class: "12-B", room: "105", type: "theory" },
  ],
  Friday: [
    { time: "9:00 AM", subject: "Physics", class: "12-B", room: "Lab-201", type: "practical" },
    { time: "11:00 AM", subject: "Mathematics", class: "10-A", room: "101", type: "theory" },
    { time: "2:00 PM", subject: "Mathematics", class: "11-A", room: "101", type: "theory" },
    { time: "3:15 PM", subject: "Statistics", class: "12-A", room: "105", type: "theory" },
  ],
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "theory": return "bg-primary/20 text-primary";
    case "practical": return "bg-secondary/20 text-secondary";
    default: return "bg-muted text-muted-foreground";
  }
};

export const TeacherTimetable = () => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card-3d p-6">
        <h1 className="text-3xl font-bold text-gradient mb-2">Weekly Timetable</h1>
        <p className="text-muted-foreground flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Your complete schedule for this week
        </p>
      </div>

      <div className="grid gap-6">
        {Object.entries(weeklySchedule).map(([day, classes]) => (
          <Card key={day} className={`card-3d ${day === today ? 'ring-2 ring-primary/50' : ''}`}>
            <CardHeader>
              <CardTitle className="text-gradient flex items-center justify-between">
                <span>{day}</span>
                {day === today && <Badge variant="default">Today</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {classes.map((cls, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-primary">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{cls.time}</span>
                      </div>
                      <div>
                        <div className="font-semibold">{cls.subject}</div>
                        <div className="text-sm text-muted-foreground">Class {cls.class}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {cls.room}
                      </div>
                      <Badge className={getTypeColor(cls.type)}>
                        {cls.type}
                      </Badge>
                    </div>
                  </div>
                ))}
                {classes.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No classes scheduled for {day}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};