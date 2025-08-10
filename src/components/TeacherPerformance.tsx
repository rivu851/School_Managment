"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Users, Calendar, FileText, Eye } from "lucide-react"
import { useState } from "react"

const performanceData = [
  {
    studentId: "1",
    name: "John Smith",
    class: "Class 12-A",
    rollNo: "12A01",
    attendance: 95,
    academicProgress: {
      mathematics: { current: 85, previous: 82, trend: "up" },
      physics: { current: 78, previous: 80, trend: "down" },
      chemistry: { current: 92, previous: 89, trend: "up" },
    },
    behaviorNotes: [
      { date: "2024-01-20", note: "Excellent participation in class discussions", type: "positive" },
      { date: "2024-01-15", note: "Submitted assignment late", type: "concern" },
    ],
    overallGrade: "A",
  },
  {
    studentId: "2",
    name: "Sarah Johnson",
    class: "Class 12-A",
    rollNo: "12A02",
    attendance: 88,
    academicProgress: {
      mathematics: { current: 92, previous: 90, trend: "up" },
      physics: { current: 88, previous: 85, trend: "up" },
      chemistry: { current: 90, previous: 92, trend: "down" },
    },
    behaviorNotes: [
      { date: "2024-01-18", note: "Helped classmates during group work", type: "positive" },
      { date: "2024-01-10", note: "Showed improvement in problem-solving", type: "positive" },
    ],
    overallGrade: "A+",
  },
]

const classAnalytics = {
  "12-a": {
    totalStudents: 35,
    averageAttendance: 92,
    averageGrade: 85,
    subjectPerformance: {
      mathematics: { average: 88, trend: "up" },
      physics: { average: 83, trend: "stable" },
      chemistry: { average: 87, trend: "up" },
    },
    recentTrends: [
      { aspect: "Assignment Submission Rate", value: "94%", trend: "up" },
      { aspect: "Test Performance", value: "86%", trend: "up" },
      { aspect: "Class Participation", value: "Good", trend: "stable" },
    ],
  },
}

const getTrendIcon = (trend: string) => {
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-success" />
  if (trend === "down") return <TrendingDown className="w-4 h-4 text-destructive" />
  return <div className="w-4 h-4" />
}

const getBehaviorColor = (type: string) => {
  switch (type) {
    case "positive":
      return "bg-success/20 text-success"
    case "concern":
      return "bg-warning/20 text-warning"
    case "issue":
      return "bg-destructive/20 text-destructive"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export const TeacherPerformance = () => {
  const [showSampleReport, setShowSampleReport] = useState(false)
  const [noteStudentId, setNoteStudentId] = useState<string | null>(null)
  const [newNote, setNewNote] = useState("")

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card-3d p-6 relative overflow-hidden ring-1 ring-white/10 hover:ring-blue-400/40 transition duration-300 hover:shadow-[0_20px_45px_-20px_rgba(59,130,246,0.55)] animate-[float_9s_ease-in-out_infinite]">
        <h1 className="text-3xl font-bold text-gradient mb-2">Student Performance Tracking</h1>
        <p className="text-muted-foreground">Monitor attendance trends, academic progress, and behavior notes</p>
      </div>

      <Tabs defaultValue="individual" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="individual">Individual</TabsTrigger>
          <TabsTrigger value="class">Class Analytics</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-6">
          <Card className="card-3d ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
            <CardHeader>
              <CardTitle className="text-gradient">Select Student</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue="1" onValueChange={(v) => setNoteStudentId(v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a student" />
                </SelectTrigger>
                <SelectContent>
                  {performanceData.map((student) => (
                    <SelectItem key={student.studentId} value={student.studentId}>
                      {student.name} - {student.rollNo} ({student.class})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {performanceData.map((student) => (
            <div key={student.studentId} className="space-y-6">
              {/* Student Overview */}
              <Card className="card-3d ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
                <CardHeader>
                  <CardTitle className="text-gradient flex items-center justify-between">
                    <span>{student.name}</span>
                    <Badge variant="outline">{student.overallGrade}</Badge>
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {student.class} • Roll No: {student.rollNo}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-lg bg-muted/30">
                      <div className="text-2xl font-bold text-primary">{student.attendance}%</div>
                      <div className="text-sm text-muted-foreground">Attendance Rate</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/30">
                      <div className="text-2xl font-bold text-success">
                        {(
                          Object.values(student.academicProgress).reduce((sum, subject) => sum + subject.current, 0) /
                          Object.values(student.academicProgress).length
                        ).toFixed(0)}
                        %
                      </div>
                      <div className="text-sm text-muted-foreground">Average Grade</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/30">
                      <div className="text-2xl font-bold text-accent">{student.behaviorNotes.length}</div>
                      <div className="text-sm text-muted-foreground">Recent Notes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Academic Progress */}
              <Card className="card-3d ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
                <CardHeader>
                  <CardTitle className="text-gradient">Academic Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(student.academicProgress).map(([subject, data]) => (
                      <div key={subject} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                        <div>
                          <div className="font-medium capitalize">{subject}</div>
                          <div className="text-sm text-muted-foreground">
                            {"Previous: "}
                            {data.previous}% {"→"} {"Current: "}
                            {data.current}%
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{data.current}%</span>
                          {getTrendIcon(data.trend)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Behavior Notes */}
              <Card className="card-3d ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
                <CardHeader>
                  <CardTitle className="text-gradient">Behavior Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {student.behaviorNotes.map((note, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-muted/30 hover:bg-slate-800/50 transition duration-200 hover:-translate-y-[1px] hover:shadow-[0_10px_24px_-18px_rgba(59,130,246,0.35)]"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">{note.date}</span>
                          <Badge className={getBehaviorColor(note.type)}>{note.type}</Badge>
                        </div>
                        <p className="text-sm">{note.note}</p>
                      </div>
                    ))}

                    {noteStudentId === student.studentId ? (
                      <div className="space-y-2">
                        <textarea
                          className="w-full rounded-md border bg-background p-2 text-sm"
                          placeholder="Add a new note..."
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setNewNote("")
                              setNoteStudentId(null)
                            }}
                            className="w-32"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              // In real app, persist the new note
                              setNewNote("")
                              setNoteStudentId(null)
                            }}
                            className="w-40"
                          >
                            Save Note
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => setNoteStudentId(student.studentId)}
                      >
                        Add New Note
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="class" className="space-y-6">
          <Card className="card-3d ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
            <CardHeader>
              <CardTitle className="text-gradient">Class 12-A Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-primary/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                    <Users className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">{classAnalytics["12-a"].totalStudents}</div>
                  </CardContent>
                </Card>

                <Card className="border-success/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
                    <Calendar className="h-4 w-4 text-success" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-success">{classAnalytics["12-a"].averageAttendance}%</div>
                  </CardContent>
                </Card>

                <Card className="border-warning/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Grade</CardTitle>
                    <TrendingUp className="h-4 w-4 text-warning" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-warning">{classAnalytics["12-a"].averageGrade}%</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card className="card-3d ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
            <CardHeader>
              <CardTitle className="text-gradient">Subject-wise Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(classAnalytics["12-a"].subjectPerformance).map(([subject, data]) => (
                  <div key={subject} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div>
                      <div className="font-medium capitalize">{subject}</div>
                      <div className="text-sm text-muted-foreground">Class Average</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{data.average}%</span>
                      {getTrendIcon(data.trend)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-3d ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
            <CardHeader>
              <CardTitle className="text-gradient">Recent Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classAnalytics["12-a"].recentTrends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div>
                      <div className="font-medium">{trend.aspect}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{trend.value}</span>
                      {getTrendIcon(trend.trend)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {showSampleReport ? (
            <Card className="card-3d ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
              <CardHeader>
                <CardTitle className="text-gradient">Sample Performance Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p>{"This is a sample report preview with placeholder content."}</p>
                  <ul className="list-disc pl-6">
                    <li>{"Attendance trend: Upward"}</li>
                    <li>{"Average grade trend: Stable"}</li>
                    <li>{"Participation: Improving"}</li>
                  </ul>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" onClick={() => setShowSampleReport(false)}>
                      Close
                    </Button>
                    <Button>Export PDF</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="card-3d ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
              <CardHeader>
                <CardTitle className="text-gradient">Performance Trends Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8 text-muted-foreground">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Detailed Analytics Coming Soon</h3>
                  <p>
                    {
                      "Comprehensive charts and graphs showing student performance trends over time will be available here."
                    }
                  </p>
                  <Button className="mt-4 bg-transparent" variant="outline" onClick={() => setShowSampleReport(true)}>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Sample Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      <style jsx>{`
    @keyframes float {
      0%,100% { transform: translateY(0) }
      50% { transform: translateY(-3px) }
    }
  `}</style>
    </div>
  )
}
