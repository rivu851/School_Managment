"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClipboardList, Calculator, TrendingUp, FileText, Save } from "lucide-react"

const gradingItems = [
  {
    id: "1",
    type: "test",
    title: "Mathematics Mid-term Test",
    class: "Class 12-A",
    totalMarks: 100,
    submissions: 35,
    graded: 30,
    pending: 5,
    dueDate: "2024-01-25",
  },
  {
    id: "2",
    type: "assignment",
    title: "Physics Lab Report",
    class: "Class 11-B",
    totalMarks: 50,
    submissions: 32,
    graded: 28,
    pending: 4,
    dueDate: "2024-01-26",
  },
  {
    id: "3",
    type: "homework",
    title: "Trigonometry Practice",
    class: "Class 10-C",
    totalMarks: 25,
    submissions: 38,
    graded: 38,
    pending: 0,
    dueDate: "2024-01-20",
  },
]

const studentsList = [
  { id: "1", name: "John Smith", rollNo: "12A01", currentGrade: "", maxMarks: 100 },
  { id: "2", name: "Sarah Johnson", rollNo: "12A02", currentGrade: "", maxMarks: 100 },
  { id: "3", name: "Mike Wilson", rollNo: "12A03", currentGrade: "", maxMarks: 100 },
  { id: "4", name: "Emma Davis", rollNo: "12A04", currentGrade: "", maxMarks: 100 },
  { id: "5", name: "Alex Brown", rollNo: "12A05", currentGrade: "", maxMarks: 100 },
]

const reportCards = [
  {
    id: "1",
    student: "John Smith",
    class: "Class 12-A",
    term: "Mid-term",
    subjects: {
      mathematics: { marks: 85, grade: "A", total: 100 },
      physics: { marks: 78, grade: "B+", total: 100 },
      chemistry: { marks: 92, grade: "A+", total: 100 },
    },
    overall: 85,
    overallGrade: "A",
  },
  {
    id: "2",
    student: "Sarah Johnson",
    class: "Class 12-A",
    term: "Mid-term",
    subjects: {
      mathematics: { marks: 92, grade: "A+", total: 100 },
      physics: { marks: 88, grade: "A", total: 100 },
      chemistry: { marks: 90, grade: "A", total: 100 },
    },
    overall: 90,
    overallGrade: "A+",
  },
]

type PageState = "list" | "submissions"

export const TeacherGrading = () => {
  const [selectedItem, setSelectedItem] = useState("")
  const [grades, setGrades] = useState<Record<string, string>>({})
  const [page, setPage] = useState<PageState>("list")
  const [activeItemId, setActiveItemId] = useState<string | null>(null)

  const handleGradeChange = (studentId: string, grade: string) => {
    setGrades((prev) => ({
      ...prev,
      [studentId]: grade,
    }))
  }

  const saveGrades = () => {
    console.log("Saving grades:", grades)
    setGrades({})
  }

  const getGradeColor = (grade: string) => {
    if (grade.includes("A")) return "text-success"
    if (grade.includes("B")) return "text-warning"
    if (grade.includes("C")) return "text-orange-500"
    return "text-destructive"
  }

  const submissions = useMemo(() => {
    // Mock submissions for the selected grading item
    const count = gradingItems.find((g) => g.id === activeItemId)?.submissions ?? 0
    const base = studentsList
    const expanded = Array.from({ length: Math.min(count, base.length) }).map((_, idx) => ({
      id: base[idx].id,
      student: base[idx].name,
      rollNo: base[idx].rollNo,
      file: `answerscript_${base[idx].rollNo}.pdf`,
      status: idx % 3 === 0 ? "graded" : "pending",
    }))
    return expanded
  }, [activeItemId])

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card-3d p-6 relative overflow-hidden ring-1 ring-white/10 hover:ring-blue-400/40 transition duration-300 hover:shadow-[0_20px_45px_-20px_rgba(59,130,246,0.55)] animate-[float_10s_ease-in-out_infinite]">
        <h1 className="text-3xl font-bold text-gradient mb-2">Grading & Report Cards</h1>
        <p className="text-muted-foreground">Enter marks, calculate results, and generate student reports</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-3d border-primary/20 ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
            <ClipboardList className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {gradingItems.reduce((sum, item) => sum + item.pending, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Items to grade</p>
          </CardContent>
        </Card>

        <Card className="card-3d border-success/20 ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Calculator className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {gradingItems.reduce((sum, item) => sum + item.graded, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Already graded</p>
          </CardContent>
        </Card>

        <Card className="card-3d border-warning/20 ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Average</CardTitle>
            <TrendingUp className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">87%</div>
            <p className="text-xs text-muted-foreground">Overall performance</p>
          </CardContent>
        </Card>

        <Card className="card-3d border-accent/20 ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Report Cards</CardTitle>
            <FileText className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{reportCards.length}</div>
            <p className="text-xs text-muted-foreground">Generated</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="grade" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="grade">Grade Items</TabsTrigger>
          <TabsTrigger value="enter">Enter Marks</TabsTrigger>
          <TabsTrigger value="reports">Report Cards</TabsTrigger>
        </TabsList>

        <TabsContent value="grade" className="space-y-4">
          {page === "submissions" && activeItemId ? (
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="text-gradient">Submitted Answer Scripts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  {"Viewing submissions for: "}
                  <span className="font-medium">{gradingItems.find((g) => g.id === activeItemId)?.title}</span>
                </div>
                <div className="grid gap-3">
                  {submissions.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-slate-800/50 transition duration-200 hover:-translate-y-[1px] hover:shadow-[0_10px_24px_-18px_rgba(59,130,246,0.35)]"
                    >
                      <div>
                        <div className="font-medium">{s.student}</div>
                        <div className="text-sm text-muted-foreground">
                          Roll No: {s.rollNo} {"• "} File: {s.file}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{s.status}</Badge>
                        <Button variant="outline" size="sm">
                          Open
                        </Button>
                        <Button size="sm">Grade</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <Button variant="outline" onClick={() => setPage("list")}>
                    Back
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-gradient">Items to Grade</h3>
              <div className="grid gap-4">
                {gradingItems.map((item) => (
                  <Card
                    key={item.id}
                    className="card-3d hover:scale-[1.02] transition-transform ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-lg">{item.title}</h4>
                            <Badge variant="outline">{item.type}</Badge>
                            {item.pending > 0 && <Badge variant="destructive">{item.pending} pending</Badge>}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{item.class}</span>
                            <span>•</span>
                            <span>Total Marks: {item.totalMarks}</span>
                            <span>•</span>
                            <span>Due: {item.dueDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-sm">
                              Progress: {item.graded}/{item.submissions} graded
                            </div>
                            <div className="w-32 bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(item.graded / item.submissions) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setActiveItemId(item.id)
                              setPage("submissions")
                            }}
                          >
                            View Submissions
                          </Button>
                          {item.pending > 0 && (
                            <Button
                              size="sm"
                              onClick={() => {
                                setActiveItemId(item.id)
                                setPage("submissions")
                              }}
                            >
                              Start Grading
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

        <TabsContent value="enter" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="text-gradient">Enter Marks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Assessment</label>
                  <Select value={selectedItem} onValueChange={setSelectedItem}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose assessment" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradingItems.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.title} - {item.class}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedItem && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Enter Marks for Students</h3>
                  <div className="grid gap-3">
                    {studentsList.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">Roll No: {student.rollNo}</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-muted-foreground">/ {student.maxMarks}</div>
                          <Input
                            type="number"
                            placeholder="Marks"
                            className="w-20"
                            value={grades[student.id] || ""}
                            onChange={(e) => handleGradeChange(student.id, e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button onClick={saveGrades} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save All Grades
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gradient">Generated Report Cards</h3>
            <Button className="gap-2">
              <FileText className="w-4 h-4" />
              Generate New Reports
            </Button>
          </div>

          <div className="grid gap-4">
            {reportCards.map((report) => (
              <Card key={report.id} className="card-3d">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{report.student}</h4>
                        <p className="text-sm text-muted-foreground">
                          {report.class} {"• "} {report.term}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getGradeColor(report.overallGrade)}`}>
                          {report.overallGrade}
                        </div>
                        <div className="text-sm text-muted-foreground">{report.overall}%</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(report.subjects).map(([subject, data]) => (
                        <div key={subject} className="p-3 rounded-lg bg-muted/30">
                          <div className="font-medium capitalize">{subject}</div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm">
                              {data.marks}/{data.total}
                            </span>
                            <Badge variant="outline" className={getGradeColor(data.grade)}>
                              {data.grade}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Full Report
                      </Button>
                      <Button variant="outline" size="sm">
                        Download PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        Email to Parent
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
export default TeacherGrading;