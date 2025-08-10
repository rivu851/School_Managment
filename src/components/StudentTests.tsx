import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, Play, CheckCircle, AlertCircle } from "lucide-react";

const availableTests = [
  {
    id: 1,
    subject: "Mathematics",
    title: "Trigonometry Assessment",
    duration: 60,
    questions: 25,
    difficulty: "Medium",
    deadline: "2024-01-20",
    status: "available",
    description: "Test your understanding of trigonometric functions and identities."
  },
  {
    id: 2,
    subject: "Physics",
    title: "Wave Motion Quiz",
    duration: 45,
    questions: 20,
    difficulty: "Hard",
    deadline: "2024-01-22",
    status: "available",
    description: "Comprehensive test on wave properties and behaviors."
  },
  {
    id: 3,
    subject: "Chemistry",
    title: "Chemical Reactions",
    duration: 90,
    questions: 35,
    difficulty: "Easy",
    deadline: "2024-01-25",
    status: "available",
    description: "Basic understanding of chemical reaction types and balancing."
  },
];

const completedTests = [
  {
    id: 4,
    subject: "Biology",
    title: "Cell Structure Quiz",
    score: 87,
    total: 100,
    completedDate: "2024-01-15",
    timeTaken: 35,
    status: "completed"
  },
  {
    id: 5,
    subject: "Mathematics",
    title: "Algebra Fundamentals",
    score: 92,
    total: 100,
    completedDate: "2024-01-12",
    timeTaken: 42,
    status: "completed"
  },
];

const TestCard = ({ test, onStartTest }: { test: any; onStartTest: (testId: number) => void }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy": return "bg-success/20 text-success border-success/30";
      case "medium": return "bg-warning/20 text-warning border-warning/30";
      case "hard": return "bg-destructive/20 text-destructive border-destructive/30";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  const isDeadlineSoon = () => {
    const deadline = new Date(test.deadline);
    const now = new Date();
    const diffDays = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 3600 * 24));
    return diffDays <= 3;
  };

  return (
    <Card className="card-3d hover:scale-[1.02] transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Badge variant="outline" className="text-xs">
              {test.subject}
            </Badge>
            <CardTitle className="text-lg">{test.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{test.description}</p>
          </div>
          {isDeadlineSoon() && (
            <AlertCircle className="w-5 h-5 text-warning animate-pulse" />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{test.duration} mins</span>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span>{test.questions} questions</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge className={getDifficultyColor(test.difficulty)}>
            {test.difficulty}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Due: {test.deadline}
          </span>
        </div>

        <Button 
          onClick={() => onStartTest(test.id)}
          className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary"
        >
          <Play className="w-4 h-4 mr-2" />
          Start Test
        </Button>
      </CardContent>
    </Card>
  );
};

const CompletedTestCard = ({ test }: { test: any }) => {
  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "text-success";
    if (percentage >= 80) return "text-warning";
    return "text-destructive";
  };

  const percentage = Math.round((test.score / test.total) * 100);

  return (
    <Card className="card-3d">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="outline" className="text-xs mb-2">
              {test.subject}
            </Badge>
            <CardTitle className="text-lg">{test.title}</CardTitle>
          </div>
          <CheckCircle className="w-6 h-6 text-success" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className={`text-2xl font-bold ${getScoreColor(percentage)}`}>
              {test.score}/{test.total}
            </p>
            <p className="text-sm text-muted-foreground">{percentage}%</p>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <p>Completed: {test.completedDate}</p>
            <p>Time taken: {test.timeTaken} mins</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const StudentTests = () => {
  const [activeTab, setActiveTab] = useState<"available" | "completed">("available");

  const handleStartTest = (testId: number) => {
    // In a real app, this would navigate to the test interface
    alert(`Starting test ${testId}. This would open the test interface.`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Tests & Assessments</h1>
          <p className="text-muted-foreground">Complete your tests and track your progress</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === "available" ? "default" : "outline"}
            onClick={() => setActiveTab("available")}
          >
            Available Tests ({availableTests.length})
          </Button>
          <Button
            variant={activeTab === "completed" ? "default" : "outline"}
            onClick={() => setActiveTab("completed")}
          >
            Completed ({completedTests.length})
          </Button>
        </div>
      </div>

      {/* Test Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-3d border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Tests</p>
                <p className="text-2xl font-bold text-primary">{availableTests.length}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-success">{completedTests.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d border-warning/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold text-warning">
                  {Math.round(completedTests.reduce((acc, test) => acc + (test.score / test.total) * 100, 0) / completedTests.length)}%
                </p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === "available" 
          ? availableTests.map((test) => (
              <TestCard key={test.id} test={test} onStartTest={handleStartTest} />
            ))
          : completedTests.map((test) => (
              <CompletedTestCard key={test.id} test={test} />
            ))
        }
      </div>

      {(activeTab === "available" ? availableTests : completedTests).length === 0 && (
        <Card className="card-3d">
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No tests {activeTab}</h3>
            <p className="text-muted-foreground">
              {activeTab === "available" 
                ? "All caught up! Check back later for new tests."
                : "You haven't completed any tests yet. Start with the available tests."
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};