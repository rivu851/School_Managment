import { useState } from "react";
import { Search, Filter, Plus, MoreVertical, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const students = [
    {
      id: 1,
      name: "Emma Johnson",
      email: "emma.johnson@school.edu",
      phone: "+1 (555) 123-4567",
      grade: "Grade 10",
      class: "10-A",
      address: "123 Oak Street, Springfield",
      avatar: "EJ",
      status: "active",
      gpa: "3.8"
    },
    {
      id: 2,
      name: "Michael Brown",
      email: "michael.brown@school.edu",
      phone: "+1 (555) 234-5678",
      grade: "Grade 11",
      class: "11-B",
      address: "456 Pine Avenue, Springfield",
      avatar: "MB",
      status: "active",
      gpa: "3.6"
    },
    {
      id: 3,
      name: "Sarah Davis",
      email: "sarah.davis@school.edu",
      phone: "+1 (555) 345-6789",
      grade: "Grade 9",
      class: "9-C",
      address: "789 Elm Road, Springfield",
      avatar: "SD",
      status: "inactive",
      gpa: "3.9"
    },
    {
      id: 4,
      name: "John Smith",
      email: "john.smith@school.edu",
      phone: "+1 (555) 456-7890",
      grade: "Grade 12",
      class: "12-A",
      address: "321 Maple Drive, Springfield",
      avatar: "JS",
      status: "active",
      gpa: "3.7"
    },
    {
      id: 5,
      name: "Lisa Wang",
      email: "lisa.wang@school.edu",
      phone: "+1 (555) 567-8901",
      grade: "Grade 10",
      class: "10-B",
      address: "654 Birch Lane, Springfield",
      avatar: "LW",
      status: "active",
      gpa: "4.0"
    },
    {
      id: 6,
      name: "David Wilson",
      email: "david.wilson@school.edu",
      phone: "+1 (555) 678-9012",
      grade: "Grade 11",
      class: "11-A",
      address: "987 Cedar Court, Springfield",
      avatar: "DW",
      status: "active",
      gpa: "3.5"
    }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="card-3d p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">Students</h1>
            <p className="text-muted-foreground">Manage student records and information</p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow text-white font-medium rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <Plus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card-3d p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search students..."
              className="pl-10 bg-card-glass border-white/10 focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="glass border-white/20">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student, index) => (
          <div 
            key={student.id}
            className="card-3d p-6 group cursor-pointer hover:border-primary/20"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                  {student.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {student.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{student.grade} • {student.class}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            {/* Status and GPA */}
            <div className="flex items-center justify-between mb-4">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                student.status === 'active' 
                  ? 'bg-success/20 text-success' 
                  : 'bg-muted/20 text-muted-foreground'
              }`}>
                {student.status}
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">GPA</p>
                <p className="font-bold text-gradient">{student.gpa}</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="truncate">{student.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{student.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{student.address}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-4 border-t border-white/10 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 glass border-white/20 text-xs">
                View Profile
              </Button>
              <Button variant="outline" size="sm" className="flex-1 glass border-white/20 text-xs">
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="card-3d p-6">
        <h3 className="text-lg font-semibold mb-4 text-gradient-secondary">Quick Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{filteredStudents.length}</p>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{filteredStudents.filter(s => s.status === 'active').length}</p>
            <p className="text-sm text-muted-foreground">Active</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-secondary">
              {(filteredStudents.reduce((acc, s) => acc + parseFloat(s.gpa), 0) / filteredStudents.length).toFixed(1)}
            </p>
            <p className="text-sm text-muted-foreground">Avg GPA</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">4</p>
            <p className="text-sm text-muted-foreground">Grades</p>
          </div>
        </div>
      </div>
    </div>
  );
};