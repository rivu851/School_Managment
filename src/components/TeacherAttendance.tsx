"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { UserCheck, Users, Calendar, TrendingUp } from "lucide-react"

const classes = [
  { id: "12-a", name: "Class 12-A", subject: "Mathematics", students: 35 },
  { id: "11-b", name: "Class 11-B", subject: "Physics", students: 32 },
  { id: "10-c", name: "Class 10-C", subject: "Mathematics", students: 38 },
]

const students = {
  "12-a": [
    { id: "1", name: "John Smith", rollNo: "12A01", attendance: 95 },
    { id: "2", name: "Sarah Johnson", rollNo: "12A02", attendance: 88 },
    { id: "3", name: "Mike Wilson", rollNo: "12A03", attendance: 92 },
    { id: "4", name: "Emma Davis", rollNo: "12A04", attendance: 97 },
    { id: "5", name: "Alex Brown", rollNo: "12A05", attendance: 85 },
  ],
  "11-b": [
    { id: "6", name: "Lisa Anderson", rollNo: "11B01", attendance: 93 },
    { id: "7", name: "Tom Garcia", rollNo: "11B02", attendance: 89 },
    { id: "8", name: "Nina Patel", rollNo: "11B03", attendance: 96 },
  ],
  "10-c": [
    { id: "9", name: "Ryan Lee", rollNo: "10C01", attendance: 91 },
    { id: "10", name: "Grace Kim", rollNo: "10C02", attendance: 94 },
  ],
} as const

export const TeacherAttendance = () => {
  const [selectedClass, setSelectedClass] = useState("12-a")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [attendance, setAttendance] = useState<Record<string, boolean>>({})

  const handleAttendanceChange = (studentId: string, isPresent: boolean) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: isPresent,
    }))
  }

  const markAllPresent = () => {
    const classStudents = students[selectedClass as keyof typeof students] || []
    const newAttendance: Record<string, boolean> = {}
    classStudents.forEach((student) => {
      newAttendance[student.id] = true
    })
    setAttendance(newAttendance)
  }

  const markAllAbsent = () => {
    const classStudents = students[selectedClass as keyof typeof students] || []
    const newAttendance: Record<string, boolean> = {}
    classStudents.forEach((student) => {
      newAttendance[student.id] = false
    })
    setAttendance(newAttendance)
  }

  const saveAttendance = () => {
    console.log("Saving attendance:", { class: selectedClass, date: selectedDate, attendance })
    setAttendance({})
  }

  const currentClass = classes.find((c) => c.id === selectedClass)
  const classStudents = students[selectedClass as keyof typeof students] || []

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card-3d relative overflow-hidden ring-1 ring-white/10 hover:ring-blue-400/40 transition duration-300 hover:shadow-[0_20px_45px_-20px_rgba(59,130,246,0.55)] animate-[float_9s_ease-in-out_infinite] p-6">
        <h1 className="text-3xl font-bold text-gradient mb-2">Attendance Management</h1>
        <p className="text-muted-foreground">Track and manage student attendance</p>
      </div>

      <Tabs defaultValue="mark" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="mark">Mark Attendance</TabsTrigger>
          <TabsTrigger value="view">View Records</TabsTrigger>
        </TabsList>

        <TabsContent value="mark" className="space-y-6">
          <Card className="card-3d ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
            <CardHeader>
              <CardTitle className="text-gradient">Mark Today's Attendance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Class</label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name} - {cls.subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quick Actions</label>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={markAllPresent}>
                      All Present
                    </Button>
                    <Button size="sm" variant="outline" onClick={markAllAbsent}>
                      All Absent
                    </Button>
                  </div>
                </div>
              </div>

              {currentClass && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      {currentClass.name} - {currentClass.subject}
                    </h3>
                    <Badge variant="outline">{classStudents.length} Students</Badge>
                  </div>

                  <div className="grid gap-3">
                    {classStudents.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-slate-800/50 transition duration-200 hover:-translate-y-[1px] hover:shadow-[0_10px_24px_-18px_rgba(59,130,246,0.35)]"
                      >
                        <div className="flex items-center gap-4">
                          <Checkbox
                            checked={attendance[student.id] || false}
                            onCheckedChange={(checked) => handleAttendanceChange(student.id, Boolean(checked))}
                          />
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">Roll No: {student.rollNo}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Overall: {student.attendance}%</div>
                          <Badge variant={attendance[student.id] ? "default" : "secondary"}>
                            {attendance[student.id] ? "Present" : "Absent"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button onClick={saveAttendance} className="w-full">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Save Attendance
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="view" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="card-3d border-primary/20 ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">105</div>
                <p className="text-xs text-muted-foreground">Across all classes</p>
              </CardContent>
            </Card>

            <Card className="card-3d border-success/20 ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
                <TrendingUp className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">92%</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card className="card-3d border-warning/20 ring-1 ring-white/10 hover:ring-blue-400/40 transition hover:-translate-y-0.5 duration-300 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Attendance</CardTitle>
                <Calendar className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">3</div>
                <p className="text-xs text-muted-foreground">Students below 75%</p>
              </CardContent>
            </Card>
          </div>

          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="text-gradient">Class-wise Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classes.map((cls) => (
                  <div key={cls.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div>
                      <div className="font-medium">{cls.name}</div>
                      <div className="text-sm text-muted-foreground">{cls.subject}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">94%</div>
                      <div className="text-sm text-muted-foreground">{cls.students} students</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
export default TeacherAttendance;