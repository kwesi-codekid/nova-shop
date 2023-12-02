import React, { useState, useEffect } from "react"
import axios from "axios"
import { Table, Button } from "antd"
import { PlusCircleOutlined } from "@ant-design/icons"

import CreateUserForm from "../../includes/forms/CreateUserForm"

const UserManagement = () => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [openCreateUserForm, setOpenCreateUserForm] = useState(false)
  const [loadingCreateUserForm, setLoadingCreateUserForm] = useState(false)

  document.title = "User Management | Nova Shop Pro"

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.fullname.localeCompare(b.fullname),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (record) => <span>{`0${record}`}</span>,
    },
    {
      title: "Role",
      dataIndex: "user_role",
      key: "user_role",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (record) => (
        <div className="flex gap-2">
          <button className="btn btn-sm btn-primary">Edit</button>
          <button className="btn btn-sm btn-danger">Delete</button>
        </div>
      ),
    },
  ]

  // fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost/akesseh/backend/api/user-account.php/fetch-all`
      )
      setUsers(response.data.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])


  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between py-2">
        <Button
          type="primary"
          className="bg-blue-600 font-poppins !rounded-xl"
          size="large"
          icon={<PlusCircleOutlined />}
          onClick={() => {
            setOpenCreateUserForm(true)
          }}
        >
          Add User
        </Button>
      </div>

      <Table
        loading={loading}
        dataSource={users}
        columns={columns}
        className="!flex-1 !rounded-xl"
      />

      <CreateUserForm
        open={openCreateUserForm}
        loading={loadingCreateUserForm}
        setLoadingCreateUserForm={setLoadingCreateUserForm}
        fetchUsers={fetchUsers}
        setOpenCreateUserForm={setOpenCreateUserForm}
        onCancel={() => {
          setOpenCreateUserForm(false)
        }}
      />
    </div>
  )
}

export default UserManagement
