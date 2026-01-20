import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import MemberDetailPage from "./pages/MemberDetailPage"
import SettingsPage from "./pages/SettingsPage"
import toast from "react-hot-toast"
import Login from "./pages/LoginPage"
import Signup from "./pages/SignupPage"

const App = () => {
  return (
    <div className="relative h-full w-full">
          <div className="absolute inset-0 -z-10 h-full w-full bg-base-200" />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/member/:id" element={<MemberDetailPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
