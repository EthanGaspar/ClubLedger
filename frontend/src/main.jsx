import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//We can use page routing in our entire app
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast"
import { AuthContextProvider } from "./context/AuthContext.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 

    Wraps the entire app in the AuthContext, resulting in macro
     differences between logged in vs logged out states 
     
     */}
    <AuthContextProvider> 
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>,
)
