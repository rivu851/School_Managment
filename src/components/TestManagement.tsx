import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Calendar, Clock, Users, Plus, Eye, Edit, Send } from "lucide-react";

const tests = [
  {
    id: "test-1",
    title: "Mathematics - Algebra Test",
    subject: "Mathematics",
    class: "Class 12 - Science",
    date: "2024-01-25",
    time: "10:00 AM",
    duration: 120,
    totalMarks: 100,
    status: "scheduled",
    students: 45,
    type: "written"
  },
  {
    id: "test-2", 
    title: "Physics - Mechanics Quiz",
    subject: "Physics",
    class: "Class 11 - Science",
    date: "2024-01-22",
    time: "2:00 PM", 
    duration: 90,
    totalMarks: 50,
    status: "active",
    students: 48,
    type: "online"
  },
  {
    id: "test-3",
    title: "Chemistry - Organic Chemistry",
    subject: "Chemistry",
    class: "Class 12 - Science",
    date: "2024-01-18",
    time: "9:00 AM",
    duration: 150,
    totalMarks: 100,
    status: "completed",
    students: 45,
    type: "written"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "scheduled": return "bg-warning/20 text-warning";
    case "active": return "bg-success/20 text-success";
    case "completed": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

export const TestManagement = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [newTest, setNewTest] = useState({
    title: "",
    subject: "",
    class: "",
    date: "",
    time: "",
    duration: "",
    totalMarks: "",
    type: "written",
    instructions: ""
  });

  const handleCreateTest = () => {
    console.log("Creating test:", newTest);
    // Reset form
    setNewTest({
      title: "",
      subject: "",
      class: "",
      date: "",
      time: "",
      duration: "",
      totalMarks: "",
      type: "written",
      instructions: ""
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-3d border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{tests.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="card-3d border-warning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {tests.filter(t => t.status === "scheduled").length}
            </div>
            <p className="text-xs text-muted-foreground">Upcoming tests</p>
          </CardContent>
        </Card>

        <Card className="card-3d border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Clock className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {tests.filter(t => t.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card className="card-3d border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participants</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {tests.reduce((acc, test) => acc + test.students, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Total registrations</p>
          </CardContent>
        </Card>
      </div>

      {/* Test Management Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Test Overview</TabsTrigger>
          <TabsTrigger value="create">Create Test</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gradient">All Tests</h3>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Quick Create
            </Button>
          </div>

          <div className="grid gap-4">
            {tests.map((test) => (
              <Card key={test.id} className="card-3d hover:scale-[1.02] transition-transform">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-lg">{test.title}</h4>
                        <Badge className={getStatusColor(test.status)}>
                          {test.status}
                        </Badge>
                        <Badge variant="outline">{test.type}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{test.class}</span>
                        <span>•</span>
                        <span>{test.date} at {test.time}</span>
                        <span>•</span>
                        <span>{test.duration} minutes</span>
                        <span>•</span>
                        <span>{test.totalMarks} marks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{test.students} students</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      {test.status === "scheduled" && (
                        <Button size="sm">
                          <Send className="w-4 h-4 mr-1" />
                          Start
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="text-gradient">Create New Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Test Title</label>
                  <Input 
                    placeholder="Enter test title"
                    value={newTest.title}
                    onChange={(e) => setNewTest({...newTest, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Select value={newTest.subject} onValueChange={(value) => setNewTest({...newTest, subject: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Class</label>
                  <Select value={newTest.class} onValueChange={(value) => setNewTest({...newTest, class: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12-science">Class 12 - Science</SelectItem>
                      <SelectItem value="11-science">Class 11 - Science</SelectItem>
                      <SelectItem value="10-general">Class 10 - General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Test Type</label>
                  <Select value={newTest.type} onValueChange={(value) => setNewTest({...newTest, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="written">Written Test</SelectItem>
                      <SelectItem value="online">Online Test</SelectItem>
                      <SelectItem value="practical">Practical Test</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input 
                    type="date"
                    value={newTest.date}
                    onChange={(e) => setNewTest({...newTest, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Input 
                    type="time"
                    value={newTest.time}
                    onChange={(e) => setNewTest({...newTest, time: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration (minutes)</label>
                  <Input 
                    type="number"
                    placeholder="120"
                    value={newTest.duration}
                    onChange={(e) => setNewTest({...newTest, duration: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Total Marks</label>
                  <Input 
                    type="number"
                    placeholder="100"
                    value={newTest.totalMarks}
                    onChange={(e) => setNewTest({...newTest, totalMarks: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Instructions</label>
                <Textarea 
                  placeholder="Enter test instructions for students..."
                  value={newTest.instructions}
                  onChange={(e) => setNewTest({...newTest, instructions: e.target.value})}
                  rows={4}
                />
              </div>
              <Button onClick={handleCreateTest} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Create Test
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <h3 className="text-xl font-semibold text-gradient">Test Results</h3>
          <div className="grid gap-4">
            {tests.filter(test => test.status === "completed").map((test) => (
              <Card key={test.id} className="card-3d">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{test.title}</h4>
                      <p className="text-sm text-muted-foreground">{test.class} • {test.date}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Results
                      </Button>
                      <Button variant="outline" size="sm">
                        Export Results
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};