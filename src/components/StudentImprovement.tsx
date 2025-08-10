import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, BookOpen, Clock, Award, AlertTriangle } from "lucide-react";

const performanceData = {
  strongAreas: [
    { subject: "Chemistry", topic: "Organic Chemistry", score: 92, trend: "stable" },
    { subject: "Biology", topic: "Cell Biology", score: 90, trend: "improving" },
    { subject: "Mathematics", topic: "Algebra", score: 88, trend: "improving" },
  ],
  improvementAreas: [
    { 
      subject: "Physics", 
      topic: "Wave Motion", 
      score: 65, 
      target: 80,
      recommendations: [
        "Review wave properties and characteristics",
        "Practice wave equation problems",
        "Watch video tutorials on wave interference"
      ],
      urgency: "high"
    },
    { 
      subject: "Mathematics", 
      topic: "Trigonometry", 
      score: 72, 
      target: 85,
      recommendations: [
        "Practice trigonometric identities",
        "Solve more word problems",
        "Review unit circle concepts"
      ],
      urgency: "medium"
    },
    { 
      subject: "Chemistry", 
      topic: "Chemical Bonding", 
      score: 78, 
      target: 88,
      recommendations: [
        "Study different types of bonds",
        "Practice Lewis structures",
        "Review electronegativity concepts"
      ],
      urgency: "low"
    },
  ]
};

const studyPlan = [
  {
    day: "Monday",
    focus: "Physics - Wave Motion",
    duration: "1.5 hours",
    activities: ["Theory review", "Practice problems"],
    status: "completed"
  },
  {
    day: "Tuesday",
    focus: "Mathematics - Trigonometry",
    duration: "1 hour",
    activities: ["Identity practice", "Unit circle"],
    status: "completed"
  },
  {
    day: "Wednesday",
    focus: "Chemistry - Chemical Bonding",
    duration: "45 minutes",
    activities: ["Lewis structures", "Bond types"],
    status: "pending"
  },
  {
    day: "Thursday",
    focus: "Physics - Wave Motion",
    duration: "1 hour",
    activities: ["Problem solving", "Practice test"],
    status: "pending"
  },
];

const achievements = [
  { title: "Consistent Performer", description: "Scored above 80% in 3 consecutive tests", icon: Award, color: "text-primary" },
  { title: "Math Wizard", description: "Improved algebra score by 15 points", icon: TrendingUp, color: "text-success" },
  { title: "Study Streak", description: "Studied for 7 consecutive days", icon: Clock, color: "text-accent" },
];

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case "high": return "border-destructive/30 bg-destructive/10";
    case "medium": return "border-warning/30 bg-warning/10";
    case "low": return "border-success/30 bg-success/10";
    default: return "border-muted/30 bg-muted/10";
  }
};

const getUrgencyBadge = (urgency: string) => {
  switch (urgency) {
    case "high": return "bg-destructive/20 text-destructive border-destructive/30";
    case "medium": return "bg-warning/20 text-warning border-warning/30";
    case "low": return "bg-success/20 text-success border-success/30";
    default: return "bg-muted/20 text-muted-foreground";
  }
};

export const StudentImprovement = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gradient">Areas of Improvement</h1>
        <p className="text-muted-foreground">Track your progress and get personalized recommendations</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-3d border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
                <p className="text-2xl font-bold text-primary">78%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Strong Areas</p>
                <p className="text-2xl font-bold text-success">{performanceData.strongAreas.length}</p>
              </div>
              <Award className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d border-warning/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Need Focus</p>
                <p className="text-2xl font-bold text-warning">{performanceData.improvementAreas.length}</p>
              </div>
              <Target className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Study Hours</p>
                <p className="text-2xl font-bold text-accent">26.5h</p>
              </div>
              <Clock className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strong Areas */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle className="text-gradient flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Your Strong Areas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {performanceData.strongAreas.map((area, index) => (
              <div key={index} className="p-4 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{area.subject}</Badge>
                  <span className="text-lg font-bold text-success">{area.score}%</span>
                </div>
                <p className="font-medium">{area.topic}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-3 h-3 text-success mr-1" />
                  <span className="text-xs text-success capitalize">{area.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Improvement Areas */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle className="text-gradient flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Areas Needing Improvement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {performanceData.improvementAreas.map((area, index) => (
            <div key={index} className={`p-6 rounded-lg border ${getUrgencyColor(area.urgency)}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{area.subject}</Badge>
                    <Badge className={getUrgencyBadge(area.urgency)}>
                      {area.urgency === "high" && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {area.urgency.charAt(0).toUpperCase() + area.urgency.slice(1)} Priority
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold">{area.topic}</h3>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Current / Target</p>
                  <p className="text-lg font-bold">
                    <span className="text-warning">{area.score}%</span> / 
                    <span className="text-success"> {area.target}%</span>
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress to Target</span>
                  <span>{Math.round((area.score / area.target) * 100)}%</span>
                </div>
                <Progress value={(area.score / area.target) * 100} className="h-2" />
              </div>

              <div>
                <h4 className="font-medium mb-2">Recommended Actions:</h4>
                <ul className="space-y-1">
                  {area.recommendations.map((rec, recIndex) => (
                    <li key={recIndex} className="text-sm text-muted-foreground flex items-center">
                      <BookOpen className="w-3 h-3 mr-2 text-primary" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Study Plan */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle className="text-gradient flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Weekly Study Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studyPlan.map((plan, index) => (
              <div key={index} className={`p-4 rounded-lg border transition-all duration-200 ${
                plan.status === "completed" 
                  ? "bg-success/10 border-success/20" 
                  : "bg-muted/10 border-muted/20 hover:bg-muted/20"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium">{plan.day}</h4>
                      <Badge className={plan.status === "completed" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}>
                        {plan.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{plan.focus} • {plan.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Activities:</p>
                    <p className="text-xs text-muted-foreground">{plan.activities.join(", ")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle className="text-gradient flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="p-4 rounded-lg bg-muted/20 border border-muted/30 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon className={`w-6 h-6 ${achievement.color}`} />
                    <h4 className="font-medium">{achievement.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};