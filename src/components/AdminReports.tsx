import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar,
  Download,
  Eye,
  FileText,
  PieChart,
  Target,
  Award
} from "lucide-react";

const reports = [
  {
    id: 1,
    title: "Academic Performance Report",
    type: "Academic",
    period: "Q1 2024",
    status: "Ready",
    generatedOn: "2024-01-15",
    description: "Comprehensive analysis of student academic performance across all subjects"
  },
  {
    id: 2,
    title: "Attendance Analysis",
    type: "Attendance",
    period: "January 2024",
    status: "Ready",
    generatedOn: "2024-01-30",
    description: "Monthly attendance patterns and trends by class and student"
  },
  {
    id: 3,
    title: "Teacher Performance Review",
    type: "Staff",
    period: "Annual 2023",
    status: "In Progress",
    generatedOn: "2024-01-20",
    description: "Annual evaluation of teaching staff performance and achievements"
  },
  {
    id: 4,
    title: "Financial Summary",
    type: "Financial",
    period: "Q4 2023",
    status: "Ready",
    generatedOn: "2024-01-10",
    description: "Financial overview including fees, expenses, and budget analysis"
  }
];

const reportStats = {
  totalReports: 45,
  readyReports: 38,
  inProgress: 7,
  monthlyReports: 12
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Ready": return "bg-green-100 text-green-800";
    case "In Progress": return "bg-yellow-100 text-yellow-800";
    case "Pending": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Academic": return <Award className="w-4 h-4" />;
    case "Attendance": return <Calendar className="w-4 h-4" />;
    case "Staff": return <Users className="w-4 h-4" />;
    case "Financial": return <TrendingUp className="w-4 h-4" />;
    default: return <FileText className="w-4 h-4" />;
  }
};

export const AdminReports = () => {
  const [selectedReport, setSelectedReport] = useState<any>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="card-3d p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">Reports & Analytics</h1>
            <p className="text-muted-foreground">Generate and view comprehensive school reports</p>
          </div>
          <Button className="animate-glow">
            <FileText className="w-4 h-4 mr-2" />
            Generate New Report
          </Button>
        </div>
      </div>

      {/* Report Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-3d">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{reportStats.totalReports}</div>
            <p className="text-xs text-muted-foreground">all time</p>
          </CardContent>
        </Card>
        <Card className="card-3d">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ready Reports</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{reportStats.readyReports}</div>
            <p className="text-xs text-muted-foreground">available for download</p>
          </CardContent>
        </Card>
        <Card className="card-3d">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{reportStats.inProgress}</div>
            <p className="text-xs text-muted-foreground">being generated</p>
          </CardContent>
        </Card>
        <Card className="card-3d">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{reportStats.monthlyReports}</div>
            <p className="text-xs text-muted-foreground">generated this month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all-reports" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-fit">
          <TabsTrigger value="all-reports">All Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="all-reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reports.map((report) => (
              <Card key={report.id} className="card-3d hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        {getTypeIcon(report.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{report.period}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>Generated on {report.generatedOn}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setSelectedReport(report)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      disabled={report.status !== "Ready"}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="text-gradient">Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Interactive Analytics</h3>
                  <p className="text-muted-foreground mb-4">
                    Dive deep into school performance metrics
                  </p>
                  <Button>Open Analytics Dashboard</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="text-gradient">Trend Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Trend Insights</h3>
                  <p className="text-muted-foreground mb-4">
                    Identify patterns and improvement opportunities
                  </p>
                  <Button>View Trends</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Academic Report", "Attendance Report", "Financial Report", "Progress Report", "Custom Report"].map((template) => (
              <Card key={template} className="card-3d hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <CardTitle className="text-gradient flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    {template}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Generate standardized {template.toLowerCase()} with predefined metrics
                  </p>
                  <Button className="w-full" variant="outline">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Report Details Dialog */}
      {selectedReport && (
        <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedReport.title}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <p><strong>Type:</strong> {selectedReport.type}</p>
                  <p><strong>Period:</strong> {selectedReport.period}</p>
                  <p><strong>Status:</strong> 
                    <Badge className={`ml-2 ${getStatusColor(selectedReport.status)}`}>
                      {selectedReport.status}
                    </Badge>
                  </p>
                </div>
                <div className="space-y-2">
                  <p><strong>Generated On:</strong> {selectedReport.generatedOn}</p>
                  <p><strong>File Size:</strong> 2.4 MB</p>
                  <p><strong>Format:</strong> PDF</p>
                </div>
              </div>
              <div className="border rounded-lg p-4 bg-muted/20">
                <h4 className="font-semibold mb-2">Report Preview</h4>
                <p className="text-sm text-muted-foreground mb-4">{selectedReport.description}</p>
                <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
                  <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Report preview would appear here</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};