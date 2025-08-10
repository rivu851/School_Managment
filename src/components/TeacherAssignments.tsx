"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Calendar, Clock, Plus, Eye, Edit } from "lucide-react"

const assignments = [
  {
    id: "1",
    title: "Quadratic Equations Practice",
    subject: "Mathematics",
    class: "Class 12-A",
    dueDate: "2024-01-28",
    assignedDate: "2024-01-20",
    submissions: 28,
    totalStudents: 35,
    status: "active",
  },
  {
    id: "2",
    title: "Newton's Laws Lab Report",
    subject: "Physics",
    class: "Class 11-B",
    dueDate: "2024-01-25",
    assignedDate: "2024-01-18",
    submissions: 30,
    totalStudents: 32,
    status: "active",
  },
  {
    id: "3",
    title: "Trigonometry Assignment",
    subject: "Mathematics",
    class: "Class 10-C",
    dueDate: "2024-01-22",
    assignedDate: "2024-01-15",
    submissions: 38,
    totalStudents: 38,
    status: "completed",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-warning/20 text-warning"
    case "completed":
      return "bg-success/20 text-success"
    case "overdue":
      return "bg-destructive/20 text-destructive"
    default:
      return "bg-muted text-muted-foreground"
  }
}

type SubPage = "none" | "view" | "edit" | "submissions"

export const TeacherAssignments = () => {
  const [tab, setTab] = useState("overview")
  const [subPage, setSubPage] = useState<SubPage>("none")
  const [activeId, setActiveId] = useState<string | null>(null)

  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    subject: "",
    class: "",
    dueDate: "",
    maxMarks: "",
    instructions: "",
  })

  const activeAssignment = useMemo(() => assignments.find((a) => a.id === activeId), [activeId])

  const handleCreateAssignment = () => {
    console.log("Creating assignment:", newAssignment)
    setNewAssignment({
      title: "",
      description: "",
      subject: "",
      class: "",
      dueDate: "",
      maxMarks: "",
      instructions: "",
    })
    setTab("overview")
  }

  const submissionsList = useMemo(() => {
    if (!activeAssignment) return []
    const count = activeAssignment.submissions
    return Array.from({ length: count }).map((_, i) => ({
      id: String(i + 1),
      student: `Student ${String(i + 1).padStart(2, "0")}`,
      rollNo: `${activeAssignment.class.replace("Class ", "").replace("-", "")}${String(i + 1).padStart(2, "0")}`,
      file: `assignment_${i + 1}.pdf`,
      status: i % 4 === 0 ? "graded" : "pending",
    }))
  }, [activeAssignment])

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card-3d p-6 relative overflow-hidden ring-1 ring-white/10 hover:ring-blue-400/40 transition duration-300 hover:shadow-[0_20px_45px_-20px_rgba(59,130,246,0.55)] animate-[float_11s_ease-in-out_infinite]">
        <h1 className="text-3xl font-bold text-gradient mb-2">Assignment Management</h1>
        <p className="text-muted-foreground">Create, assign, and track homework assignments</p>
        <style jsx>{`
          @keyframes float {
            0%,100% { transform: translateY(0) }
            50% { transform: translateY(-3px) }
          }
        `}</style>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-3d border-primary/20 ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{assignments.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="card-3d border-warning/20 ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {assignments.filter((a) => a.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card className="card-3d border-success/20 ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submissions</CardTitle>
            <Calendar className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">96</div>
            <p className="text-xs text-muted-foreground">Total received</p>
          </CardContent>
        </Card>

        <Card className="card-3d border-accent/20 ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <BookOpen className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">91%</div>
            <p className="text-xs text-muted-foreground">Average</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {subPage === "view" && activeAssignment ? (
            <Card className="card-3d ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
              <CardHeader>
                <CardTitle className="text-gradient">Assignment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-lg font-semibold">{activeAssignment.title}</div>
                <div className="text-sm text-muted-foreground">
                  {activeAssignment.class} {"• "} {activeAssignment.subject}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm pt-2">
                  <div>Due: {activeAssignment.dueDate}</div>
                  <div>Assigned: {activeAssignment.assignedDate}</div>
                  <div>Submissions: {activeAssignment.submissions}</div>
                  <div>Total Students: {activeAssignment.totalStudents}</div>
                </div>
                <div className="pt-3 flex gap-2">
                  <Button variant="outline" onClick={() => setSubPage("none")}>
                    Back
                  </Button>
                  <Button onClick={() => setSubPage("submissions")}>View Submissions</Button>
                </div>
              </CardContent>
            </Card>
          ) : subPage === "edit" && activeAssignment ? (
            <Card className="card-3d ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
              <CardHeader>
                <CardTitle className="text-gradient">Edit Assignment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input defaultValue={activeAssignment.title} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input defaultValue={activeAssignment.subject} />
                  <Input defaultValue={activeAssignment.class} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input type="date" defaultValue={activeAssignment.dueDate} />
                  <Input type="date" defaultValue={activeAssignment.assignedDate} />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setSubPage("none")}>Save</Button>
                  <Button variant="outline" onClick={() => setSubPage("none")}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gradient">All Assignments</h3>
                <Button className="gap-2" onClick={() => setTab("create")}>
                  <Plus className="w-4 h-4" />
                  New Assignment
                </Button>
              </div>

              <div className="grid gap-4">
                {assignments.map((assignment) => (
                  <Card
                    key={assignment.id}
                    className="card-3d hover:scale-[1.02] transition-transform ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-lg">{assignment.title}</h4>
                            <Badge className={getStatusColor(assignment.status)}>{assignment.status}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{assignment.class}</span>
                            <span>•</span>
                            <span>{assignment.subject}</span>
                            <span>•</span>
                            <span>Due: {assignment.dueDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-sm">
                              Submissions: {assignment.submissions}/{assignment.totalStudents}
                            </div>
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: `${(assignment.submissions / assignment.totalStudents) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setActiveId(assignment.id)
                              setSubPage("view")
                            }}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setActiveId(assignment.id)
                              setSubPage("edit")
                            }}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="text-gradient">Create New Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assignment Title</label>
                  <Input
                    placeholder="Enter assignment title"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Select
                    value={newAssignment.subject}
                    onValueChange={(value) => setNewAssignment({ ...newAssignment, subject: value })}
                  >
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
                  <Select
                    value={newAssignment.class}
                    onValueChange={(value) => setNewAssignment({ ...newAssignment, class: value })}
                  >
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
                  <label className="text-sm font-medium">Due Date</label>
                  <Input
                    type="date"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Maximum Marks</label>
                  <Input
                    type="number"
                    placeholder="100"
                    value={newAssignment.maxMarks}
                    onChange={(e) => setNewAssignment({ ...newAssignment, maxMarks: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Describe the assignment..."
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Instructions</label>
                <Textarea
                  placeholder="Enter detailed instructions for students..."
                  value={newAssignment.instructions}
                  onChange={(e) => setNewAssignment({ ...newAssignment, instructions: e.target.value })}
                  rows={4}
                />
              </div>
              <Button onClick={handleCreateAssignment} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Create Assignment
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-4">
          {subPage === "submissions" && activeAssignment ? (
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="text-gradient">Assignment Submissions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {activeAssignment.title} {"• "} {activeAssignment.class}
                </p>
                <div className="grid gap-3">
                  {submissionsList.map((s) => (
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
                <Button variant="outline" onClick={() => setSubPage("none")}>
                  Back
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-gradient">Assignment Submissions</h3>
              <div className="grid gap-4">
                {assignments
                  .filter((a) => a.submissions > 0)
                  .map((assignment) => (
                    <Card key={assignment.id} className="card-3d">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{assignment.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {assignment.class} {"• "} Due: {assignment.dueDate}
                            </p>
                            <p className="text-sm mt-2">
                              {assignment.submissions} of {assignment.totalStudents} students submitted
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setActiveId(assignment.id)
                                setSubPage("submissions")
                              }}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Submissions
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => {
                                setActiveId(assignment.id)
                                setSubPage("submissions")
                              }}
                            >
                              Grade All
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default TeacherAssignments;