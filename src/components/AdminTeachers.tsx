import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar,
  Phone,
  Mail,
  MapPin,
  Plus,
  Edit,
  Eye,
  MoreHorizontal,
  Award,
  Clock
} from "lucide-react";

const teachers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    subject: "Mathematics",
    classes: ["12-A", "11-B", "10-C"],
    experience: "8 years",
    qualification: "PhD Mathematics",
    phone: "+1 234-567-8901",
    email: "sarah.johnson@school.edu",
    address: "123 Academic Lane",
    status: "active",
    rating: 4.8,
    schedule: [
      { day: "Monday", periods: ["9:00-10:00", "11:00-12:00"] },
      { day: "Tuesday", periods: ["10:00-11:00", "2:00-3:00"] }
    ]
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    subject: "Physics",
    classes: ["12-B", "11-A"],
    experience: "12 years",
    qualification: "MSc Physics",
    phone: "+1 234-567-8902",
    email: "michael.chen@school.edu",
    address: "456 Science Street",
    status: "active",
    rating: 4.9,
    schedule: [
      { day: "Monday", periods: ["2:00-3:00"] },
      { day: "Wednesday", periods: ["9:00-10:00", "11:00-12:00"] }
    ]
  },
  {
    id: 3,
    name: "Ms. Emily Rodriguez",
    subject: "English Literature",
    classes: ["11-C", "10-A", "9-B"],
    experience: "6 years",
    qualification: "MA English",
    phone: "+1 234-567-8903",
    email: "emily.rodriguez@school.edu",
    address: "789 Literature Ave",
    status: "active",
    rating: 4.7,
    schedule: [
      { day: "Tuesday", periods: ["9:00-10:00", "10:00-11:00"] },
      { day: "Thursday", periods: ["1:00-2:00"] }
    ]
  }
];

const departments = [
  { name: "Mathematics", teachers: 8, subjects: ["Math", "Statistics", "Calculus"] },
  { name: "Science", teachers: 12, subjects: ["Physics", "Chemistry", "Biology"] },
  { name: "Languages", teachers: 6, subjects: ["English", "Spanish", "French"] },
  { name: "Arts", teachers: 4, subjects: ["Music", "Art", "Drama"] }
];

export const AdminTeachers = () => {
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleViewTeacher = (teacher: any) => {
    setSelectedTeacher(teacher);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="card-3d p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">Teachers Management</h1>
            <p className="text-muted-foreground">Manage teaching staff and their assignments</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="animate-glow">
                <Plus className="w-4 h-4 mr-2" />
                Add New Teacher
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter teacher's name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="teacher@school.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Primary Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qualification">Qualification</Label>
                  <Input id="qualification" placeholder="e.g., MSc Mathematics" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+1 234-567-8900" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input id="experience" type="number" placeholder="5" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Add Teacher
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all-teachers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-fit">
          <TabsTrigger value="all-teachers">All Teachers</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="schedules">Schedules</TabsTrigger>
        </TabsList>

        <TabsContent value="all-teachers" className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="card-3d">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gradient">89</div>
                <p className="text-xs text-muted-foreground">+3 from last month</p>
              </CardContent>
            </Card>
            <Card className="card-3d">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Teachers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gradient">86</div>
                <p className="text-xs text-muted-foreground">97% availability</p>
              </CardContent>
            </Card>
            <Card className="card-3d">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Experience</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gradient">8.5</div>
                <p className="text-xs text-muted-foreground">years</p>
              </CardContent>
            </Card>
          </div>

          {/* Teachers List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <Card key={teacher.id} className="card-3d hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {teacher.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{teacher.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                      </div>
                    </div>
                    <Badge variant={teacher.status === 'active' ? 'default' : 'secondary'}>
                      {teacher.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span>Classes: {teacher.classes.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{teacher.experience} experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="w-4 h-4 text-muted-foreground" />
                      <span>Rating: {teacher.rating}/5</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleViewTeacher(teacher)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((dept) => (
              <Card key={dept.name} className="card-3d">
                <CardHeader>
                  <CardTitle className="text-gradient">{dept.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Teachers</span>
                    <Badge>{dept.teachers}</Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">Subjects:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {dept.subjects.map((subject) => (
                        <Badge key={subject} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Department
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedules" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="text-gradient">Weekly Schedule Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Schedule Management</h3>
                <p className="text-muted-foreground mb-4">
                  View and manage teacher schedules across all classes
                </p>
                <Button>View Full Schedule</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Teacher Details Dialog */}
      {selectedTeacher && (
        <Dialog open={!!selectedTeacher} onOpenChange={() => setSelectedTeacher(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedTeacher.name} - Details</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <h4 className="font-semibold text-gradient">Personal Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedTeacher.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedTeacher.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedTeacher.address}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-gradient">Professional Details</h4>
                <div className="space-y-2">
                  <p><strong>Subject:</strong> {selectedTeacher.subject}</p>
                  <p><strong>Qualification:</strong> {selectedTeacher.qualification}</p>
                  <p><strong>Experience:</strong> {selectedTeacher.experience}</p>
                  <p><strong>Classes:</strong> {selectedTeacher.classes.join(', ')}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};