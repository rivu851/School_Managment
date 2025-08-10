import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Trophy, Target } from "lucide-react";

const subjects = [
  {
    name: "Mathematics",
    tests: [
      { name: "Algebra Test", date: "2024-01-15", score: 85, total: 100, grade: "A" },
      { name: "Geometry Quiz", date: "2024-01-08", score: 78, total: 90, grade: "B+" },
      { name: "Calculus Assessment", date: "2024-01-02", score: 92, total: 100, grade: "A+" },
    ],
    average: 85,
    trend: "up"
  },
  {
    name: "Physics",
    tests: [
      { name: "Mechanics Test", date: "2024-01-12", score: 78, total: 100, grade: "B+" },
      { name: "Optics Quiz", date: "2024-01-05", score: 82, total: 90, grade: "A-" },
      { name: "Thermodynamics", date: "2023-12-28", score: 75, total: 100, grade: "B" },
    ],
    average: 78,
    trend: "up"
  },
  {
    name: "Chemistry",
    tests: [
      { name: "Organic Chemistry", date: "2024-01-10", score: 92, total: 100, grade: "A+" },
      { name: "Periodic Table Quiz", date: "2024-01-03", score: 88, total: 95, grade: "A" },
      { name: "Chemical Bonding", date: "2023-12-26", score: 85, total: 100, grade: "A" },
    ],
    average: 88,
    trend: "down"
  },
  {
    name: "Biology",
    tests: [
      { name: "Cell Biology", date: "2024-01-09", score: 90, total: 100, grade: "A" },
      { name: "Genetics Quiz", date: "2024-01-02", score: 87, total: 95, grade: "A-" },
      { name: "Ecology Test", date: "2023-12-29", score: 83, total: 100, grade: "B+" },
    ],
    average: 87,
    trend: "up"
  },
];

const getGradeColor = (grade: string) => {
  if (grade.startsWith("A")) return "text-success";
  if (grade.startsWith("B")) return "text-warning";
  return "text-destructive";
};

const getScoreColor = (percentage: number) => {
  if (percentage >= 90) return "text-success";
  if (percentage >= 80) return "text-warning";
  return "text-destructive";
};

export const StudentMarks = () => {
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  
  const overallAverage = Math.round(subjects.reduce((acc, subject) => acc + subject.average, 0) / subjects.length);
  const currentSubject = subjects.find(s => s.name === selectedSubject)!;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-3d border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Average</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{overallAverage}%</div>
            <p className="text-xs text-muted-foreground">Across all subjects</p>
          </CardContent>
        </Card>

        <Card className="card-3d border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Subject</CardTitle>
            <Target className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Chemistry</div>
            <p className="text-xs text-muted-foreground">88% average</p>
          </CardContent>
        </Card>

        <Card className="card-3d border-warning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Improvement Area</CardTitle>
            <TrendingUp className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">Physics</div>
            <p className="text-xs text-muted-foreground">Focus needed</p>
          </CardContent>
        </Card>
      </div>

      {/* Subject Performance */}
      <Tabs value={selectedSubject} onValueChange={setSelectedSubject}>
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          {subjects.map((subject) => (
            <TabsTrigger key={subject.name} value={subject.name} className="text-xs">
              {subject.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {subjects.map((subject) => (
          <TabsContent key={subject.name} value={subject.name} className="space-y-4">
            {/* Subject Overview */}
            <Card className="card-3d">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gradient">{subject.name} Performance</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant={subject.trend === "up" ? "default" : "destructive"}>
                      {subject.trend === "up" ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {subject.trend === "up" ? "Improving" : "Declining"}
                    </Badge>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{subject.average}%</p>
                      <p className="text-xs text-muted-foreground">Average</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subject.tests.map((test, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02]">
                      <div className="flex-1">
                        <h4 className="font-medium">{test.name}</h4>
                        <p className="text-sm text-muted-foreground">{test.date}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-lg font-bold">
                            <span className={getScoreColor((test.score / test.total) * 100)}>
                              {test.score}
                            </span>
                            <span className="text-muted-foreground">/{test.total}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {Math.round((test.score / test.total) * 100)}%
                          </p>
                        </div>
                        <Badge className={`${getGradeColor(test.grade)} bg-transparent border`}>
                          {test.grade}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress Chart */}
                <div className="mt-6 p-4 bg-muted/20 rounded-lg">
                  <h5 className="text-sm font-medium mb-4">Score Trend</h5>
                  <div className="flex items-end space-x-2 h-20">
                    {subject.tests.map((test, index) => {
                      const percentage = (test.score / test.total) * 100;
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-gradient-to-t from-primary to-primary-glow rounded-t-lg transition-all duration-300"
                            style={{ height: `${percentage}%` }}
                          ></div>
                          <p className="text-xs text-muted-foreground mt-2">Test {index + 1}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};