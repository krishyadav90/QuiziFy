
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import NotificationSystem from "./components/NotificationSystem";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <NotificationSystem>
          <TooltipProvider>
            <Toaster />
            <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="dashboard" element={
                <ProtectedRoute allowedRoles={['teacher', 'student', 'personal']}>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="teacher-dashboard" element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              } />
              <Route path="student-dashboard" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } />
              <Route path="profile" element={
                <ProtectedRoute allowedRoles={['teacher', 'student', 'personal']}>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="settings" element={
                <ProtectedRoute allowedRoles={['teacher', 'student', 'personal']}>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="quiz" element={
                <ProtectedRoute allowedRoles={['teacher', 'student', 'personal']}>
                  <Quiz />
                </ProtectedRoute>
              } />
              <Route path="quiz/shared/:id" element={<Quiz />} />
              <Route path="results" element={
                <ProtectedRoute allowedRoles={['teacher', 'student', 'personal']}>
                  <Results />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </TooltipProvider>
        </NotificationSystem>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
