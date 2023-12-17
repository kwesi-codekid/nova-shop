import React, { useState, useEffect } from "react"
import axios from "axios"
import { Table, Button } from "antd"
import {
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons"

import CreateProductForm from "../../includes/forms/CreateProductForm"
import TrashItemModal from "../../includes/modals/TrashItemModal"

const Inventory = () => {
  document.title = "Inventory | Nova Shop Pro"

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [openCreateProductForm, setOpenCreateProductForm] = useState(false)
  const [loadingCreateProductForm, setLoadingCreateProductForm] =
    useState(false)
  const [openTrashItemModal, setOpenTrashItemModal] = useState(false)
  const [loadingTrashItemModal, setLoadingTrashItemModal] = useState(false)
  const [productId, setProductId] = useState("")

  const columns = [
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
      sorter: (a, b) => a.product_name.localeCompare(b.product_name),
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Quantity At Home",
      dataIndex: "stock_at_home",
      key: "stock_",
    },
    {
      title: "Quantity At Shop",
      dataIndex: "stock_at_shop",
      key: "stock_at_shop",
    },
    {
      title: "Cost Price",
      dataIndex: "cost_price",
      key: "cost_price",
      render: (record) => <span>{`GHC ${record}`}</span>,
    },
    {
      title: "Selling Price",
      dataIndex: "unit_price",
      key: "unit_price",
      render: (record) => <span>{`GHC ${record}`}</span>,
    },
    {
      title: "Action",
      dataIndex: "product_id",
      key: "action",
      render: (record) => (
        <div className="flex gap-2">
          <Button
            className="bg-blue-500 hover:bg-blue-600 !rounded-xl text-white font-sen hover:!text-white hover:!border-transparent"
            icon={<EditOutlined />}
          >
            Edit
          </Button>

          <Button
            className="bg-red-500 hover:bg-red-600 !rounded-xl text-white font-sen hover:!text-white hover:!border-transparent"
            icon={<DeleteOutlined />}
            onClick={() => handleTrashItem(record)}
          >
            Trash
          </Button>
        </div>
      ),
    },
  ]

  const fetchInventory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost/akesseh/backend/api/products.php/fetch-all"
      )

      if (data.status === 200) {
        console.log(data.data)
        setProducts(data.data)
      }
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  const handleTrashItem = (product_id) => {
    setProductId(product_id)
    setOpenTrashItemModal(true)
  }

  const trashItem = async (product_id) => {
    setLoadingTrashItemModal(true)
    try {
      const { data } = await axios.post(
        "http://localhost/akesseh/backend/api/products.php/trash",
        {
          product_id: product_id,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )

      if (data.status === 200) {
        console.log(data)
        fetchInventory()
      }
    } catch (error) {
      console.log(error)
    }

    setLoadingTrashItemModal(false)
    setOpenTrashItemModal(false)
  }

  useEffect(() => {
    fetchInventory()
  }, [])

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between py-2">
        <Button
          type="primary"
          className="bg-blue-600 font-poppins !rounded-xl"
          icon={<PlusCircleOutlined />}
          size="large"
          onClick={() => setOpenCreateProductForm(true)}
        >
          Add Product
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        loading={loading}
        pagination={false}
        rowKey={(record) => record.product_id}
      />

      <CreateProductForm
        open={openCreateProductForm}
        setOpen={setOpenCreateProductForm}
        setLoading={setLoadingCreateProductForm}
        loading={loadingCreateProductForm}
        fetchProducts={fetchInventory}
        onCancel={() => {
          setOpenCreateProductForm(false)
        }}
      />

      <TrashItemModal
        title="Trash Product"
        text="Are you sure you want to trash this product?"
        open={openTrashItemModal}
        confirmLoading={loadingTrashItemModal}
        setOpen={setOpenTrashItemModal}
        onCancel={() => {setLoadingTrashItemModal(false);setOpenTrashItemModal(false)}}
        onOk={() => trashItem(productId)}
      />
    </div>
  )
}

export default Inventory
