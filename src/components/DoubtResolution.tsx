import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, MessageSquare, Clock, CheckCircle, AlertCircle, Send, User } from "lucide-react";

const doubts = [
  {
    id: "doubt-1",
    student: "John Smith",
    class: "Class 12 - Science",
    subject: "Mathematics",
    question: "I'm having trouble understanding the concept of limits in calculus. Can you explain with an example?",
    timestamp: "2024-01-20 10:30 AM",
    status: "pending",
    priority: "medium",
    responses: 0
  },
  {
    id: "doubt-2",
    student: "Sarah Johnson",
    class: "Class 11 - Science", 
    subject: "Physics",
    question: "What's the difference between velocity and acceleration? I get confused between these two concepts.",
    timestamp: "2024-01-20 09:15 AM",
    status: "in-progress",
    priority: "high",
    responses: 2
  },
  {
    id: "doubt-3",
    student: "Mike Wilson",
    class: "Class 12 - Science",
    subject: "Chemistry",
    question: "How do I balance chemical equations? I understand the concept but struggle with complex equations.",
    timestamp: "2024-01-19 03:45 PM",
    status: "resolved",
    priority: "low",
    responses: 3
  },
  {
    id: "doubt-4",
    student: "Emma Davis",
    class: "Class 10 - General",
    subject: "Mathematics",
    question: "Can someone help me with quadratic equations? I don't understand how to find the roots.",
    timestamp: "2024-01-19 02:20 PM",
    status: "pending",
    priority: "high",
    responses: 0
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending": return "bg-warning/20 text-warning";
    case "in-progress": return "bg-blue-500/20 text-blue-600";
    case "resolved": return "bg-success/20 text-success";
    default: return "bg-muted text-muted-foreground";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "bg-destructive/20 text-destructive";
    case "medium": return "bg-warning/20 text-warning";
    case "low": return "bg-success/20 text-success";
    default: return "bg-muted text-muted-foreground";
  }
};

export const DoubtResolution = () => {
  const [selectedDoubt, setSelectedDoubt] = useState<string | null>(null);
  const [response, setResponse] = useState("");

  const handleRespondToDoubt = (doubtId: string) => {
    console.log("Responding to doubt:", doubtId, "with:", response);
    setResponse("");
    setSelectedDoubt(null);
  };

  const stats = {
    total: doubts.length,
    pending: doubts.filter(d => d.status === "pending").length,
    inProgress: doubts.filter(d => d.status === "in-progress").length,
    resolved: doubts.filter(d => d.status === "resolved").length
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-3d border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Doubts</CardTitle>
            <HelpCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card className="card-3d border-warning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card className="card-3d border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground">Being resolved</p>
          </CardContent>
        </Card>

        <Card className="card-3d border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.resolved}</div>
            <p className="text-xs text-muted-foreground">Successfully solved</p>
          </CardContent>
        </Card>
      </div>

      {/* Doubt Management */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">Active</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {doubts.map((doubt) => (
              <Card key={doubt.id} className="card-3d hover:scale-[1.01] transition-transform">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{doubt.student}</span>
                          <Badge variant="outline">{doubt.class}</Badge>
                          <Badge variant="secondary">{doubt.subject}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(doubt.status)}>
                            {doubt.status}
                          </Badge>
                          <Badge className={getPriorityColor(doubt.priority)}>
                            {doubt.priority} priority
                          </Badge>
                          <span className="text-sm text-muted-foreground">{doubt.timestamp}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{doubt.responses} responses</span>
                      </div>
                    </div>

                    {/* Question */}
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm">{doubt.question}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex space-x-2">
                        {doubt.status === "pending" && (
                          <Button 
                            size="sm" 
                            onClick={() => setSelectedDoubt(doubt.id)}
                            className="gap-1"
                          >
                            <Send className="w-3 h-3" />
                            Respond
                          </Button>
                        )}
                        {doubt.status === "in-progress" && (
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            Continue Discussion
                          </Button>
                        )}
                        {doubt.status === "resolved" && (
                          <Button size="sm" variant="outline">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            View Solution
                          </Button>
                        )}
                      </div>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost">
                          Mark as Priority
                        </Button>
                        <Button size="sm" variant="ghost">
                          Forward
                        </Button>
                      </div>
                    </div>

                    {/* Response Form */}
                    {selectedDoubt === doubt.id && (
                      <div className="space-y-3 pt-4 border-t">
                        <Textarea
                          placeholder="Type your response to help the student..."
                          value={response}
                          onChange={(e) => setResponse(e.target.value)}
                          rows={3}
                        />
                        <div className="flex space-x-2">
                          <Button onClick={() => handleRespondToDoubt(doubt.id)}>
                            <Send className="w-4 h-4 mr-1" />
                            Send Response
                          </Button>
                          <Button variant="outline" onClick={() => setSelectedDoubt(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {doubts.filter(d => d.status === "pending").map((doubt) => (
              <Card key={doubt.id} className="card-3d">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-warning" />
                    <span className="font-medium text-warning">Needs Attention</span>
                  </div>
                  {/* ... Rest of doubt card content ... */}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          <div className="grid gap-4">
            {doubts.filter(d => d.status === "in-progress").map((doubt) => (
              <Card key={doubt.id} className="card-3d">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-blue-500">Discussion Active</span>
                  </div>
                  {/* ... Rest of doubt card content ... */}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          <div className="grid gap-4">
            {doubts.filter(d => d.status === "resolved").map((doubt) => (
              <Card key={doubt.id} className="card-3d">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="font-medium text-success">Successfully Resolved</span>
                  </div>
                  {/* ... Rest of doubt card content ... */}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};