// import dependencies
import React, { useEffect, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import axios from "axios"

// import pages and layouts
import AdminLayout from "./layouts/AdminLayout"
import Login from "./pages/Login"

function App() {
  // states
  const [auth, setAuth] = useState(null)

  // check if user is logged in
  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await axios.get(
          "https://akesseh.kirkgoc.com/api/auth.php/check-session",
            { withCredentials: true }
        )
        setAuth(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchAuth()

    // periodically check every 5 minutes
    const interval = setInterval(() => {
      fetchAuth()
    }, 300000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-screen bg-white dark:bg-gray-950 overflow-hidden">
      <Routes>
        <Route
          path="/"
          exact
          element={
            auth ? <Navigate to="/admin" /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </div>
  )
}

export default App
