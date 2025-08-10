"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Calendar, Clock, Upload, FileText, Plus, Eye } from "lucide-react"

type TestItem = {
  id: string
  title: string
  type: string
  class: string
  subject: string
  date: string
  time: string
  duration: number
  totalMarks: number
  status: "scheduled" | "active" | "completed"
  studentsRegistered: number
  questionPaper: "uploaded" | "not-required" | "missing"
}

const tests: TestItem[] = [
  {
    id: "1",
    title: "Mathematics Mid-term Exam",
    type: "exam",
    class: "Class 12-A",
    subject: "Mathematics",
    date: "2024-01-30",
    time: "9:00 AM",
    duration: 180,
    totalMarks: 100,
    status: "scheduled",
    studentsRegistered: 35,
    questionPaper: "uploaded",
  },
  {
    id: "2",
    title: "Physics Unit Test",
    type: "test",
    class: "Class 11-B",
    subject: "Physics",
    date: "2024-01-28",
    time: "10:30 AM",
    duration: 90,
    totalMarks: 50,
    status: "active",
    studentsRegistered: 32,
    questionPaper: "uploaded",
  },
  {
    id: "3",
    title: "Chemistry Practical Exam",
    type: "practical",
    class: "Class 12-A",
    subject: "Chemistry",
    date: "2024-01-25",
    time: "2:00 PM",
    duration: 120,
    totalMarks: 30,
    status: "completed",
    studentsRegistered: 35,
    questionPaper: "not-required",
  },
]

const testResults = [
  {
    testId: "3",
    testName: "Chemistry Practical Exam",
    class: "Class 12-A",
    totalStudents: 35,
    submissionsReceived: 35,
    averageScore: 24.5,
    maxScore: 30,
    highestScore: 29,
    lowestScore: 18,
    passRate: 97,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "scheduled":
      return "bg-warning/20 text-warning"
    case "active":
      return "bg-success/20 text-success"
    case "completed":
      return "bg-muted text-muted-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export const TeacherTests = () => {
  // Tabs control so we can navigate programmatically
  const [tab, setTab] = useState("overview")

  // In-component pages
  const [viewTestId, setViewTestId] = useState<string | null>(null)
  const [startTestId, setStartTestId] = useState<string | null>(null)
  const [uploadTestId, setUploadTestId] = useState<string | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File[]>>({})

  const [newTest, setNewTest] = useState({
    title: "",
    type: "test",
    subject: "",
    class: "",
    date: "",
    time: "",
    duration: "",
    totalMarks: "",
    instructions: "",
    syllabus: "",
  })

  const handleCreateTest = () => {
    console.log("Creating test:", newTest)
    setNewTest({
      title: "",
      type: "test",
      subject: "",
      class: "",
      date: "",
      time: "",
      duration: "",
      totalMarks: "",
      instructions: "",
      syllabus: "",
    })
    setTab("overview")
  }

  const testsWithPapers = useMemo(() => {
    return tests.map((t) => {
      const hasUpload = uploadedFiles[t.id]?.length
      if (t.questionPaper === "not-required") return t
      if (hasUpload) return { ...t, questionPaper: "uploaded" as const }
      return t
    })
  }, [uploadedFiles])

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card-3d p-6 relative overflow-hidden ring-1 ring-white/10 hover:ring-blue-400/40 transition duration-900 hover:shadow-[0_20px_45px_-20px_rgba(59,130,246,0.55)] animate-[float_12s_ease-in-out_infinite]">
  <h1 className="text-3xl font-bold text-gradient mb-2">Tests & Exams</h1>
  <p className="text-muted-foreground">Schedule tests, upload question papers, and track results</p>

  <style jsx>{`
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
  `}</style>
</div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-3d border-primary/20 ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
            <GraduationCap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{tests.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="card-3d border-warning/20 ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {tests.filter((t) => t.status === "scheduled").length}
            </div>
            <p className="text-xs text-muted-foreground">Upcoming</p>
          </CardContent>
        </Card>

        <Card className="card-3d border-success/20 ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Clock className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{tests.filter((t) => t.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card className="card-3d border-accent/20 ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <FileText className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{tests.filter((t) => t.status === "completed").length}</div>
            <p className="text-xs text-muted-foreground">Results pending</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-lg">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="papers">Question Papers</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* In-component detail page */}
          {viewTestId ? (
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="text-gradient">Test Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(() => {
                  const t = tests.find((x) => x.id === viewTestId)!
                  return (
                    <>
                      <div className="text-lg font-semibold">{t.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {t.class} • {t.subject}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          {"Date: "}
                          {t.date}
                        </div>
                        <div>
                          {"Time: "}
                          {t.time}
                        </div>
                        <div>
                          {"Duration: "}
                          {t.duration} min
                        </div>
                        <div>
                          {"Total Marks: "}
                          {t.totalMarks}
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" onClick={() => setViewTestId(null)}>
                          Back
                        </Button>
                        {t.status === "scheduled" && <Button onClick={() => setStartTestId(t.id)}>Start Test</Button>}
                      </div>
                    </>
                  )
                })()}
              </CardContent>
            </Card>
          ) : startTestId ? (
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="text-gradient">Start Test</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  {"You are about to start the test. This will notify students and open the test window."}
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      // Here we would trigger start
                      setStartTestId(null)
                    }}
                  >
                    Confirm Start
                  </Button>
                  <Button variant="outline" onClick={() => setStartTestId(null)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gradient">All Tests & Exams</h3>
                <Button className="gap-2" onClick={() => setTab("schedule")}>
                  <Plus className="w-4 h-4" />
                  Schedule New Test
                </Button>
              </div>

              <div className="grid gap-4">
                {testsWithPapers.map((test) => (
                  <Card
                    key={test.id}
                    className="card-3d hover:scale-[1.02] transition-transform ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-lg">{test.title}</h4>
                            <Badge className={getStatusColor(test.status)}>{test.status}</Badge>
                            <Badge variant="outline">{test.type}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{test.class}</span>
                            <span>•</span>
                            <span>{test.subject}</span>
                            <span>•</span>
                            <span>
                              {test.date} at {test.time}
                            </span>
                            <span>•</span>
                            <span>{test.duration} min</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span>
                              {" "}
                              {"Total Marks: "}
                              {test.totalMarks}
                            </span>
                            <span>•</span>
                            <span>Students: {test.studentsRegistered}</span>
                            <span>•</span>
                            <span className={test.questionPaper === "uploaded" ? "text-success" : "text-warning"}>
                              Question Paper: {test.questionPaper}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => setViewTestId(test.id)}>
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          {test.status === "scheduled" && (
                            <Button size="sm" onClick={() => setStartTestId(test.id)}>
                              Start Test
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="text-gradient">Schedule New Test/Exam</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Test Title</label>
                  <Input
                    placeholder="Enter test title"
                    value={newTest.title}
                    onChange={(e) => setNewTest({ ...newTest, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select value={newTest.type} onValueChange={(value) => setNewTest({ ...newTest, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="test">Unit Test</SelectItem>
                      <SelectItem value="exam">Exam</SelectItem>
                      <SelectItem value="practical">Practical</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Select value={newTest.subject} onValueChange={(value) => setNewTest({ ...newTest, subject: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Class</label>
                  <Select value={newTest.class} onValueChange={(value) => setNewTest({ ...newTest, class: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12-a">Class 12-A</SelectItem>
                      <SelectItem value="11-b">Class 11-B</SelectItem>
                      <SelectItem value="10-c">Class 10-C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    type="date"
                    value={newTest.date}
                    onChange={(e) => setNewTest({ ...newTest, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Input
                    type="time"
                    value={newTest.time}
                    onChange={(e) => setNewTest({ ...newTest, time: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration (minutes)</label>
                  <Input
                    type="number"
                    placeholder="90"
                    value={newTest.duration}
                    onChange={(e) => setNewTest({ ...newTest, duration: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Total Marks</label>
                  <Input
                    type="number"
                    placeholder="100"
                    value={newTest.totalMarks}
                    onChange={(e) => setNewTest({ ...newTest, totalMarks: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Syllabus/Topics</label>
                <Textarea
                  placeholder="List the topics/chapters covered in this test..."
                  value={newTest.syllabus}
                  onChange={(e) => setNewTest({ ...newTest, syllabus: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Instructions</label>
                <Textarea
                  placeholder="Enter instructions for students..."
                  value={newTest.instructions}
                  onChange={(e) => setNewTest({ ...newTest, instructions: e.target.value })}
                  rows={3}
                />
              </div>
              <Button onClick={handleCreateTest} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Schedule Test
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="papers" className="space-y-4">
          {/* Upload subpage */}
          {uploadTestId ? (
            <Card className="card-3d ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
              <CardHeader>
                <CardTitle className="text-gradient">Upload Question Paper</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {"Select files from your documents to upload as the question paper."}
                </p>
                <Input
                  type="file"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || [])
                    setUploadedFiles((prev) => ({
                      ...prev,
                      [uploadTestId]: files,
                    }))
                  }}
                />
                <div className="space-y-2">
                  <div className="text-sm font-medium">Selected files</div>
                  <ul className="list-disc pl-6 text-sm">
                    {(uploadedFiles[uploadTestId] || []).map((f, idx) => (
                      <li key={idx}>{f.name}</li>
                    ))}
                    {(uploadedFiles[uploadTestId] || []).length === 0 && (
                      <li className="text-muted-foreground">No files selected yet</li>
                    )}
                  </ul>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setUploadTestId(null)}>Save & Back</Button>
                  <Button variant="outline" onClick={() => setUploadTestId(null)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-gradient">Question Paper Management</h3>
              <div className="grid gap-4">
                {testsWithPapers.map((test) => (
                  <Card key={test.id} className="card-3d">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{test.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {test.class} {"•"} {test.date} {"•"} {test.totalMarks} marks
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant={test.questionPaper === "uploaded" ? "default" : "secondary"}>
                            {test.questionPaper}
                          </Badge>
                          <div className="flex space-x-2">
                            {test.questionPaper === "not-required" ? (
                              <span className="text-sm text-muted-foreground">N/A</span>
                            ) : (
                              <>
                                <Button variant="outline" size="sm" onClick={() => setUploadTestId(test.id)}>
                                  <Upload className="w-4 h-4 mr-1" />
                                  Upload
                                </Button>
                                {test.questionPaper === "uploaded" && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      // Simple in-page preview of selected filenames
                                      setUploadTestId(test.id)
                                    }}
                                  >
                                    <Eye className="w-4 h-4 mr-1" />
                                    View
                                  </Button>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <h3 className="text-xl font-semibold text-gradient">Test Results & Analytics</h3>
          <div className="grid gap-6">
            {testResults.map((result) => (
              <Card key={result.testId} className="card-3d">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{result.testName}</h4>
                        <p className="text-sm text-muted-foreground">{result.class}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-1" />
                        Export Results
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 rounded-lg bg-muted/30 hover:bg-slate-800/50 transition duration-200 hover:-translate-y-[1px] hover:shadow-[0_10px_24px_-18px_rgba(59,130,246,0.35)]">
                        <div className="text-2xl font-bold text-primary">
                          {result.submissionsReceived}/{result.totalStudents}
                        </div>
                        <div className="text-sm text-muted-foreground">Submissions</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/30 hover:bg-slate-800/50 transition duration-200 hover:-translate-y-[1px] hover:shadow-[0_10px_24px_-18px_rgba(59,130,246,0.35)]">
                        <div className="text-2xl font-bold text-success">{result.averageScore.toFixed(1)}</div>
                        <div className="text-sm text-muted-foreground">Average Score</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/30 hover:bg-slate-800/50 transition duration-200 hover:-translate-y-[1px] hover:shadow-[0_10px_24px_-18px_rgba(59,130,246,0.35)]">
                        <div className="text-2xl font-bold text-warning">{result.highestScore}</div>
                        <div className="text-sm text-muted-foreground">Highest Score</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/30 hover:bg-slate-800/50 transition duration-200 hover:-translate-y-[1px] hover:shadow-[0_10px_24px_-18px_rgba(59,130,246,0.35)]">
                        <div className="text-2xl font-bold text-accent">{result.passRate}%</div>
                        <div className="text-sm text-muted-foreground">Pass Rate</div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Detailed Analytics
                      </Button>
                      <Button variant="outline" size="sm">
                        Individual Results
                      </Button>
                      <Button variant="outline" size="sm">
                        Publish Results
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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


export default TeacherTests;
