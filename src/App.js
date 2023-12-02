// App.js
import React from "react"
import { Routes, Route } from "react-router-dom"
import AdminLayout from "./layouts/AdminLayout"
import Login from "./pages/Login"
import Landing from "./pages/Landing"
import ProtectedRoute from "./ProtectedRoute"
import Error404 from "./pages/error/404"
import Error403 from "./pages/error/403"

function App() {
  return (
    <div className="h-screen bg-white dark:bg-slate-950 overflow-hidden">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        />
        <Route path="/error-403" element={<Error403 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default App
