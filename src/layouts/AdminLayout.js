// AdminLayout.js
import React, { useEffect, useState } from "react"
import axios from "axios"
import { Layout, Menu, Dropdown, message } from "antd"
import { UserOutlined } from "@ant-design/icons"
import {
  useNavigate,
  useLocation,
  Navigate,
  Routes,
  Route,
} from "react-router-dom"
import { useAuth } from "../contexts/AuthContext" // Import useAuth
import sidebarRotes from "../routes"

// Import pages and layouts
import UserManagement from "../pages/admin/UserManagement"
import Categories from "../pages/admin/Categories"
import Error404 from "../pages/error/404"

const AdminLayout = () => {
  const { Header, Content, Sider } = Layout
  const [collapsed, setCollapsed] = useState(false)
  const { clearAuth } = useAuth() // Use the useAuth hook
  const navigate = useNavigate()
  const location = useLocation()

  const items = [
    {
      label: "Logout",
      key: "logout",
      icon: <UserOutlined />,
    },
  ]

  const onClickItem = ({ key }) => {
    if (key === "logout") {
      axios.get("http://localhost/akesseh/backend/api/auth.php/logout", {
        withCredentials: true,
      })
      message.success("Logout successful")
      clearAuth()
      navigate("/login")
    }
  }

  const navigateTo = (path) => {
    navigate(path.key)
  }

  const [headerText, setHeaderText] = useState("Dashboard")
  const path = window.location.pathname

  useEffect(() => {
    switch (path) {
      case "/akesseh/admin/dashboard":
        setHeaderText("Dashboard")
        break
      case "/akesseh/admin/categories":
        setHeaderText("Product Categories")
        break
      case "/akesseh/admin/inventory":
        setHeaderText("Inventory")
        break
      case "/akesseh/admin/orders":
        setHeaderText("Orders")
        break
      case "/akesseh/admin/user-management":
        setHeaderText("User Management")
        break
      case "/akesseh/admin/reports":
        setHeaderText("Reports")
        break
      case "/akesseh/admin/settings":
        setHeaderText("Settings")
        break
      default:
        setHeaderText("Dashboard")
    }
  }, [headerText, path])

  return (
    <Layout className="h-full overflow-hidden">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        breakpoint="lg"
        collapsedWidth="0"
        className="!bg-white dark:!bg-slate-900"
      >
        <div className="logo"></div>
        <Menu
          mode="inline"
          className="!bg-transparent"
          defaultSelectedKeys={[location.pathname.slice("/akesseh".length)]}
          onSelect={navigateTo}
          items={sidebarRotes}
        />
      </Sider>

      <Layout>
        <Header className="bg-blue-600 !h-14 !px-4">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center gap-3">
              <div
                onClick={() => setCollapsed(!collapsed)}
                className="lg:hidden"
              >
                {/* Hamburger menu icon */}
                {collapsed ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className="text-white text-md lg:text-xl font-bold font-poppins">
                {headerText}
              </div>
            </div>

            <Dropdown
              trigger={["click"]}
              menu={{
                items,
                onClick: onClickItem,
              }}
            >
              <button>
                <div className="flex items-center h-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </button>
            </Dropdown>
          </div>
        </Header>

        <Content className="bg-slate-300/50 dark:bg-gray-950 py-4 px-4 overflow-hidden">
          <div className="h-full overflow-y-auto overflow-x-hidden bg-white dark:bg-slate-900 rounded-2xl p-3">
            <Routes>
              <Route path="/" element={<Navigate to="dashboard" />} />
              <Route
                path="/dashboard"
                element={<div className="dark:text-white">Dashboard</div>}
              />
              <Route 
                path="/categories"
                element={<Categories />}
              />
              <Route
                path="/inventory"
                element={<div className="dark:text-white">Inventory</div>}
              />
              <Route
                path="/orders"
                element={<div className="dark:text-white">Orders</div>}
              />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
