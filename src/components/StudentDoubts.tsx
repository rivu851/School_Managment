import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, Search, Clock, CheckCircle, AlertCircle } from "lucide-react";

const doubts = [
  {
    id: 1,
    subject: "Mathematics",
    title: "Understanding complex numbers",
    description: "I'm having trouble with the concept of imaginary numbers and how to perform operations with them.",
    date: "2024-01-16",
    status: "answered",
    teacher: "Dr. Smith",
    answer: "Complex numbers consist of a real part and an imaginary part. The imaginary unit 'i' is defined as the square root of -1. Operations follow specific rules..."
  },
  {
    id: 2,
    subject: "Physics",
    title: "Wave interference patterns",
    description: "Can someone explain how constructive and destructive interference work in wave physics?",
    date: "2024-01-15",
    status: "pending",
    teacher: null,
    answer: null
  },
  {
    id: 3,
    subject: "Chemistry",
    title: "Balancing chemical equations",
    description: "I'm struggling with balancing complex chemical equations. Are there any tricks or methods?",
    date: "2024-01-14",
    status: "answered",
    teacher: "Prof. Johnson",
    answer: "Start by identifying the most complex molecule and balance it first. Then work on simpler molecules. Always check your work by counting atoms on both sides."
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "answered": return "bg-success/20 text-success border-success/30";
    case "pending": return "bg-warning/20 text-warning border-warning/30";
    case "urgent": return "bg-destructive/20 text-destructive border-destructive/30";
    default: return "bg-muted/20 text-muted-foreground";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "answered": return <CheckCircle className="w-4 h-4" />;
    case "pending": return <Clock className="w-4 h-4" />;
    case "urgent": return <AlertCircle className="w-4 h-4" />;
    default: return <MessageSquare className="w-4 h-4" />;
  }
};

export const StudentDoubts = () => {
  const [showNewDoubtForm, setShowNewDoubtForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newDoubt, setNewDoubt] = useState({
    subject: "",
    title: "",
    description: ""
  });

  const filteredDoubts = doubts.filter(doubt =>
    doubt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doubt.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doubt.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitDoubt = () => {
    // In a real app, this would submit to the backend
    alert("Doubt submitted successfully! You'll receive an answer soon.");
    setNewDoubt({ subject: "", title: "", description: "" });
    setShowNewDoubtForm(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Ask Doubts</h1>
          <p className="text-muted-foreground">Get help from your teachers and peers</p>
        </div>
        <Button 
          onClick={() => setShowNewDoubtForm(!showNewDoubtForm)}
          className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ask New Doubt
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-3d border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Doubts</p>
                <p className="text-2xl font-bold text-primary">{doubts.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Answered</p>
                <p className="text-2xl font-bold text-success">
                  {doubts.filter(d => d.status === "answered").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d border-warning/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">
                  {doubts.filter(d => d.status === "pending").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Doubt Form */}
      {showNewDoubtForm && (
        <Card className="card-3d border-primary/20">
          <CardHeader>
            <CardTitle className="text-gradient">Ask a New Doubt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input
                  placeholder="e.g., Mathematics, Physics..."
                  value={newDoubt.subject}
                  onChange={(e) => setNewDoubt({...newDoubt, subject: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input
                  placeholder="Brief title for your doubt"
                  value={newDoubt.title}
                  onChange={(e) => setNewDoubt({...newDoubt, title: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                placeholder="Describe your doubt in detail..."
                value={newDoubt.description}
                onChange={(e) => setNewDoubt({...newDoubt, description: e.target.value})}
                rows={4}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSubmitDoubt} className="bg-gradient-to-r from-success to-success-glow">
                Submit Doubt
              </Button>
              <Button variant="outline" onClick={() => setShowNewDoubtForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search your doubts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Doubts List */}
      <div className="space-y-4">
        {filteredDoubts.map((doubt) => (
          <Card key={doubt.id} className="card-3d hover:scale-[1.01] transition-all duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{doubt.subject}</Badge>
                    <Badge className={getStatusColor(doubt.status)}>
                      {getStatusIcon(doubt.status)}
                      <span className="ml-1 capitalize">{doubt.status}</span>
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{doubt.title}</CardTitle>
                </div>
                <span className="text-sm text-muted-foreground">{doubt.date}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{doubt.description}</p>
              
              {doubt.status === "answered" && doubt.answer && (
                <div className="bg-success/10 border border-success/20 rounded-lg p-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium text-success">
                      Answered by {doubt.teacher}
                    </span>
                  </div>
                  <p className="text-sm">{doubt.answer}</p>
                </div>
              )}

              {doubt.status === "pending" && (
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-warning" />
                    <span className="text-sm font-medium text-warning">
                      Waiting for teacher response...
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDoubts.length === 0 && (
        <Card className="card-3d">
          <CardContent className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No doubts found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Try adjusting your search terms." : "Start by asking your first doubt!"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};