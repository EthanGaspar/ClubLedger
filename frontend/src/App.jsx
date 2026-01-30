import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import MemberDetailPage from "./pages/MemberDetailPage"
import SettingsPage from "./pages/SettingsPage"
import toast from "react-hot-toast"
import Login from "./pages/LoginPage"
import Signup from "./pages/SignupPage"

const App = () => {
  const { user } = useAuthContext();

  return (
    <div className="relative h-full w-full">
          <div className="absolute inset-0 -z-10 h-full w-full bg-base-200" />

      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/member/:id" element={<MemberDetailPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/login" element={ !user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
