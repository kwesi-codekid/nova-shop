import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';

const getRoute = (label, key, icon, children, type) => {
  return {
    label,
    key,
    icon,
    children,
    type,
  }
}

const sidebarRoutes = [
  getRoute("Dashboard", "/admin/dashboard", <UserOutlined />, null, "item"),
  getRoute("Inventory", "/admin/inventory", <VideoCameraOutlined />, null, "item"),
  getRoute("Orders", "/admin/orders", <UploadOutlined />, null, "item"),
  getRoute("User Management", "/admin/user-management", <UserOutlined />, null, "item"),
  getRoute("Reports", "/admin/reports", <UploadOutlined />, null, "item"),
  getRoute("Settings", "/admin/settings", <UploadOutlined />, null, "item"),
]

export default sidebarRoutes