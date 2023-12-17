import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import ContainerIcon from "../../assets/pngs/icons8-container.png"
import { Table, Button } from "antd"
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"

// import forms
import CreateCategoryForm from "../../includes/forms/CreateCategoryForm"
import EditCategoryForm from "../../includes/forms/EditCategoryForm"

const Categories = () => {
  document.title = "Categories | Nova Shop Pro"

  // states
  const [categories, setCategories] = useState([])
  const [openEditCategoryForm, setOpenEditCategoryForm] = useState(false)
  const [loadingEditCategoryForm, setLoadingEditCategoryForm] = useState(false)
  const [category, setCategory] = useState()

  const [openCreateCategoryForm, setOpenCreateCategoryForm] = useState(false)
  const [loadingCreateCategoryForm, setLoadingCreateCategoryForm] = useState(false)

  const columns = [
    {
      title: "Catogory Name",
      dataIndex: "category_name",
      key: "category_name",
      sorter: (a, b) => a.category_name.localeCompare(b.category_name),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "category_id",
      key: "action",
      render: (record) => (
        <div className="flex gap-2">
          <Button 
            icon={<EditOutlined />}
            onClick={() => handleEditCategory(record)}
            className='bg-blue-500 hover:bg-blue-400 !rounded-xl font-sen text-white hover:!text-white'
          >
            Edit
          </Button>
          <Button icon={<DeleteOutlined />} className='!rounded-xl text-red-500 border-red-500 hover:bg-red-500 hover:!text-white hover:!border-transparent'>
            Delete
          </Button>
        </div>
      ),
    }
  ]

  // edit category
  const handleEditCategory = async (id) => {
    setCategory(id)
    setOpenEditCategoryForm(true)
  }

  const fetchCategories = async () => {
    try {
      const {data} = await axios.get("http://localhost/akesseh/backend/api/product-category.php/fetch-all")
      
      if (data.status === 200) {
        setCategories(data.data)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
    console.log(categories);
  }, [])
  
  return (
    <div className='flex flex-col h-full gap-3'>
      <div className="flex justify-between items-center">
        <Button
          type="primary"
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 !rounded-xl font-sen"
          icon={<PlusCircleOutlined />}
          size='large'
          onClick={() => setOpenCreateCategoryForm(true)}
        >
          Add Category
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={categories}
        pagination={{ pageSize: 5 }}
        className="bg-white shadow-md rounded-lg"
        rowKey={(record) => record.category_id}
      />

      <EditCategoryForm 
        open={openEditCategoryForm}
        setOpen={setOpenEditCategoryForm}
        loading={loadingEditCategoryForm}
        setLoading={setLoadingEditCategoryForm}
        category_id={category}
        onCancel={() => setOpenEditCategoryForm(false)}
        fetchCategories={() => fetchCategories()}
      />

      <CreateCategoryForm 
        open={openCreateCategoryForm}
        setOpen={setOpenCreateCategoryForm}
        loading={loadingCreateCategoryForm}
        setLoading={setLoadingCreateCategoryForm}
        fetchCategories={() => fetchCategories()}
        onCancel={() => setOpenCreateCategoryForm(false)}
      />

    </div>
  )
}

export default Categories