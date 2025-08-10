import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Trophy, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gradient animate-fade-in">
                Pamela
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-slide-up">
                Comprehensive School Management System for Modern Education
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
              <Button 
                size="lg"
                onClick={() => navigate("/admin")}
                className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary w-full sm:w-auto"
              >
                <Users className="w-5 h-5 mr-2" />
                Admin Portal
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate("/teacher")}
                className="w-full sm:w-auto border-secondary/30 hover:bg-secondary/10"
              >
                <Users className="w-5 h-5 mr-2" />
                Teachers Portal
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate("/student")}
                className="w-full sm:w-auto border-primary/30 hover:bg-primary/10"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Student Portal
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-accent/20 rounded-full animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            Everything You Need for Modern Education
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Streamline your educational processes with our comprehensive management system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-3d border-primary/20 hover:border-primary/40 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-gradient">Student Management</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Comprehensive student profiles, enrollment tracking, and academic records management
              </p>
            </CardContent>
          </Card>

          <Card className="card-3d border-secondary/20 hover:border-secondary/40 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle className="text-gradient-secondary">Assessment Tools</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Create and manage tests, quizzes, and assignments with automated grading
              </p>
            </CardContent>
          </Card>

          <Card className="card-3d border-accent/20 hover:border-accent/40 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-gradient">Performance Tracking</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Real-time analytics and insights into student performance and progress
              </p>
            </CardContent>
          </Card>

          <Card className="card-3d border-success/20 hover:border-success/40 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <CardTitle className="text-gradient">Smart Analytics</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Data-driven insights to improve teaching methods and student outcomes
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-card/50 backdrop-blur-xl border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient">
              Ready to Transform Your Educational Experience?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of schools and students already using EduPortal to enhance their educational journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate("/admin")}
                className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary"
              >
                Get Started as Admin
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate("/teacher")}
                className="border-secondary/30 hover:bg-secondary/10"
              >
                Access Teachers Portal
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate("/student")}
                className="border-primary/30 hover:bg-primary/10"
              >
                Access Student Portal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
