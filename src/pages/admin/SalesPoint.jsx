import React, { useState, useEffect } from "react"
import { Table, Button, message } from "antd"
import { PlusCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons"

import ConfirmModal from "../../includes/modals/ConfirmModal"

import { fetchProducts } from "../../data/products"

const SalesPoint = () => {
  document.title = "Sales Point - Nova Shop Pro"
  const [products, setProducts] = useState([])
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [loadingConfirmModal, setLoadingConfirmModal] = useState(false)
  const [saleItem, setSaleItem] = useState({
    product_id: "",
    product_name: "",
    quantity: 0,
    unit_price: 0.00,
    total_price: 0.00
  })


  const columns = [
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Unit Selling Price",
      dataIndex: "unit_price",
      key: "unit_price",
    },
    {
      title: "Quantity at Home",
      dataIndex: "stock_at_home",
      key: "stock_at_home",
    },
    {
      title: "Quantity at Shop",
      dataIndex: "stock_at_shop",
      key: "stock_at_shop",
    },
    {
      title: "Action",
      dataIndex: "product_id",
      key: "action",
      render: (record, product) => (
        <div className="flex gap-2">
          <Button 
            className='bg-blue-500 hover:bg-blue-400 !rounded-xl font-sen text-white hover:!text-white'
            onClick={() => confirmAddToCart(product)}
            icon={<PlusCircleOutlined />}
          >
            Add to Cart
          </Button>
        </div>
      ),
    }

  ]

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchProducts()
      setProducts(data.data)
    }
    initSale()
    fetch()
  }, [])

  // add to cart
  const confirmAddToCart = async (record) => {
    const { product_id, unit_price, product_name } = record
    setSaleItem({
      product_id: product_id,
      product_name: product_name,
      quantity: 1,
      unit_price: parseFloat(unit_price),
      total_price: parseFloat(unit_price)
    })
    setOpenConfirmModal(true)
  }

  const handleAddToSaleItem = async () => {
    const result = addItemToSaleItems(saleItem)
    if (result) {
      message.success("Product added to cart")
    }
    else {
      message.error("Product already exists in cart")
    }
    setLoadingConfirmModal(false)
    setOpenConfirmModal(false)
  }

  const addItemToSaleItems = (newItem) => {
    try {
      // Retrieve the existing sale object from local storage
      const existingSale = JSON.parse(localStorage.getItem("sale")) || {};
  
      // Check if an item with the same product_id already exists
      const existingItemIndex = existingSale.sale_items.findIndex(item => item.product_id === newItem.product_id);
  
      if (existingItemIndex !== -1) {
        // Item with the same product_id already exists
        return false
        // Display a message or take other actions if needed
      } else {
        // Item does not exist, add the new item to the sale_items array
        const updatedSaleItems = [...existingSale.sale_items, newItem];
  
        // Update the sale object with the updated sale_items array
        const updatedSale = {
          ...existingSale,
          sale_items: updatedSaleItems,
        };
  
        // Update the local storage with the updated sale object
        localStorage.setItem("sale", JSON.stringify(updatedSale));
  
        return true
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  
  // return sale item from local storage
  const returnSaleItems = () => {
    const sale_items = localStorage.getItem("sale")
    return sale_items ? JSON.parse(sale_items) : null
  }

  const initSale = () => {
    // check if sale is already initialized
    const sale = JSON.parse(localStorage.getItem("sale"))
    if (sale) return

    localStorage.setItem("sale", JSON.stringify({
      invoice_code: "",
      customer_id: "",
      sale_total: 0.00,
      discount: 0.00,
      amount_payable: 0.00,
      amount_paid: 0.00,
      change: 0.00,
      sale_items: []
    }))
  }


  return (
    <div className="flex flex-col lg:flex-row gap-5 h-full">
      <div className="w-3/4 h-full">
        <Table 
          dataSource={products} 
          columns={columns} 
          pagination={false} 
          rowKey={(record) => record.product_id}
        />
      </div>
      <div className="flex-1 h-full flex flex-col gap-3">
        <div className="w-full flex items-center justify-between">
          <h3 className="text-xl font-sen font-semibold text-slate-800"><ShoppingCartOutlined /> Cart Items</h3>
        </div>

        <div className="h-4/6 overflow-y-auto flex flex-col gap-1 bg-slate-50 rounded-2xl px-2">
          {
            returnSaleItems() && returnSaleItems().sale_items.map((item, index) => (
              <div className="flex items-center justify-between px-3 py-2 bg-white rounded-2xl" key={index}>
                <div className="flex flex-col gap-1">
                  <p className="font-sen text-sm font-semibold text-slate-800">{item.product_name}</p>
                  <p className="font-sen text-sm text-slate-800">{item.quantity} x {item.unit_price}</p>
                </div>
                <p className="font-sen text-sm font-semibold text-slate-800">{item.total_price}</p>
              </div>
            ))
          }
        </div>
      </div>

      <ConfirmModal
        title="Add to Cart"
        text="Are you sure you want to add this item to cart?"
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        handleOk={() => {handleAddToSaleItem()}}
        handleCancel={() => {setOpenConfirmModal(false)}}
        loading={loadingConfirmModal}
        setLoading={setLoadingConfirmModal}
      />
    </div>
  )
}

export default SalesPoint