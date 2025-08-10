import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  School, 
  Shield, 
  Bell,
  Database,
  Palette,
  Globe,
  Save,
  RefreshCw,
  Trash2,
  Key
} from "lucide-react";

export const AdminSettings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    attendance: true,
    grades: true,
    announcements: false
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="card-3d p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <Settings className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">System Settings</h1>
            <p className="text-muted-foreground">Configure your school management system</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 lg:w-fit">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="text-gradient flex items-center gap-2">
                <School className="w-5 h-5" />
                School Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="schoolName">School Name</Label>
                  <Input id="schoolName" defaultValue="Pamela High School" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schoolCode">School Code</Label>
                  <Input id="schoolCode" defaultValue="PHS2024" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="principal">Principal Name</Label>
                  <Input id="principal" defaultValue="Dr. Amanda Smith" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 234-567-8900" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="info@pamelahigh.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="www.pamelahigh.edu" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">School Address</Label>
                <Input id="address" defaultValue="123 Education Avenue, Knowledge City, KC 12345" />
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button className="animate-glow">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="text-gradient">Academic Year Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currentYear">Current Academic Year</Label>
                  <Input id="currentYear" defaultValue="2023-2024" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Academic Year Start</Label>
                  <Input id="startDate" type="date" defaultValue="2023-09-01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Academic Year End</Label>
                  <Input id="endDate" type="date" defaultValue="2024-06-30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="terms">Number of Terms</Label>
                  <Input id="terms" type="number" defaultValue="3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="text-gradient flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Automatic Logout</Label>
                    <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Login Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified of new logins</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Session Timeout (minutes)</Label>
                <Input type="number" defaultValue="30" />
              </div>
              <Button variant="outline" className="w-full">
                <Key className="w-4 h-4 mr-2" />
                Change Admin Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="text-gradient flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Communication Methods</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Email Notifications</Label>
                    <Switch 
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications(prev => ({...prev, email: checked}))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>SMS Notifications</Label>
                    <Switch 
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications(prev => ({...prev, sms: checked}))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Push Notifications</Label>
                    <Switch 
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications(prev => ({...prev, push: checked}))}
                    />
                  </div>
                </div>
                <Separator />
                <h4 className="font-semibold">Event Types</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Attendance Alerts</Label>
                    <Switch 
                      checked={notifications.attendance}
                      onCheckedChange={(checked) => setNotifications(prev => ({...prev, attendance: checked}))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Grade Updates</Label>
                    <Switch 
                      checked={notifications.grades}
                      onCheckedChange={(checked) => setNotifications(prev => ({...prev, grades: checked}))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Announcements</Label>
                    <Switch 
                      checked={notifications.announcements}
                      onCheckedChange={(checked) => setNotifications(prev => ({...prev, announcements: checked}))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="text-gradient flex items-center gap-2">
                <Database className="w-5 h-5" />
                System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Default Language</Label>
                  <Input defaultValue="English" />
                </div>
                <div className="space-y-2">
                  <Label>Time Zone</Label>
                  <Input defaultValue="UTC-5 (EST)" />
                </div>
                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Input defaultValue="MM/DD/YYYY" />
                </div>
                <div className="space-y-2">
                  <Label>Grade Scale</Label>
                  <Input defaultValue="A-F Scale" />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-semibold">System Maintenance</h4>
                <div className="flex gap-4">
                  <Button variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear Cache
                  </Button>
                  <Button variant="outline">
                    <Database className="w-4 h-4 mr-2" />
                    Optimize Database
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="text-gradient flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Appearance Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Switch to dark theme</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-primary"></div>
                    <div className="w-8 h-8 rounded-full bg-green-500 border"></div>
                    <div className="w-8 h-8 rounded-full bg-purple-500 border"></div>
                    <div className="w-8 h-8 rounded-full bg-red-500 border"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>School Logo</Label>
                  <Button variant="outline" className="w-full">
                    <Globe className="w-4 h-4 mr-2" />
                    Upload New Logo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="text-gradient flex items-center gap-2">
                <Database className="w-5 h-5" />
                Backup & Recovery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Automatic Backup</Label>
                    <p className="text-sm text-muted-foreground">Daily automatic backups</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Backup Frequency</Label>
                  <Input defaultValue="Daily at 2:00 AM" />
                </div>
                <div className="space-y-2">
                  <Label>Retention Period</Label>
                  <Input defaultValue="30 days" />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-semibold">Manual Backup</h4>
                <div className="flex gap-4">
                  <Button>
                    <Database className="w-4 h-4 mr-2" />
                    Create Backup Now
                  </Button>
                  <Button variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Restore from Backup
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <h4 className="font-semibold text-destructive mb-2">Danger Zone</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  These actions cannot be undone. Please be careful.
                </p>
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Reset All Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};