import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminLayout = ({ children }) => {
  // states
  const [auth, setAuth] = useState(null)

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

  }, [])
  return (
    <>
      <h1>Admin Layout</h1>
      {children}
    </>
  );
}

export default AdminLayout