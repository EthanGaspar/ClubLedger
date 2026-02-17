import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import MemberDetailPage from "./pages/MemberDetailPage"
import SettingsPage from "./pages/SettingsPage"
import Login from "./pages/LoginPage"
import Signup from "./pages/SignupPage"
import ForgotPassword from "./pages/ForgotPasswordPage"
import ResetPassword from "./pages/ResetPasswordPage"
import WelcomePage from "./pages/WelcomePage"
import LimitReachedPage from "./pages/LimitReachedPage"

const App = () => {
  const { user, loading } = useAuthContext();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full bg-base-200" />

      <Routes>
        <Route path="/" element={user ? <HomePage /> : <WelcomePage />} />
        <Route path="/welcome" element={user ? <Navigate to="/" /> : <WelcomePage />} />
        <Route path="/create" element={user ? <CreatePage /> : <Navigate to="/login" />} />
        <Route path="/member/:id" element={user ? <MemberDetailPage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route path="/forgot-password" element={!user ? <ForgotPassword /> : <Navigate to="/" />} />
        <Route path="/reset-password/:token" element={!user ? <ResetPassword /> : <Navigate to="/" />} />
        <Route path="/limit-reached" element={<LimitReachedPage />} />
      </Routes>
    </div>
  )
}

export default App
