import React, { useState, useEffect } from "react"
import axios from "axios"
import { Modal, Form, Input, Select, message } from "antd"

const CreateUserForm = ({ open, fetchProducts, onCancel, loading, setLoading, setOpen }) => {
  const [form] = Form.useForm()

  const [categories, setCategories] = useState([])
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost/akesseh/backend/api/product-category.php/fetch-all`
      )
      setCategories(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <Modal
      open={open}
      title="Add New Product"
      okText="Submit"
      cancelText="Cancel"
      confirmLoading={loading}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            setLoading(true)
            axios.post(
              `http://localhost/akesseh/backend/api/products.php/create`,
              {
                product_name: values.product_name,
                stock_at_home: values.stock_at_home,
                stock_at_shop: values.stock_at_shop,
                cost_price: values.cost_price,
                unit_price: values.unit_price,
                category_id: values.category_id,
              },
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            )
              .then((response) => {
                const data = response.data;
    
                if (data.status === 200) {
                  console.log(data);
                  message.success(data.message);
                  form.resetFields(); // Reset the form only when status is 200
                  setLoading(false);
                  setOpen(false);
                  fetchProducts();
                } else {
                  message.error(data.message);
                  setLoading(false);
                }
              })
              .catch((error) => {
                console.error("Error submitting form:", error);
                setLoading(false);
              });
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      okButtonProps={{ className: "bg-blue-600 font-poppins !rounded-xl" }}
      classNames={{
        header:
          "font-poppins font-semibold text-lg lg:text-2xl text-gray-800 dark:text-gray-300",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="create_product_form"
        requiredMark={false}
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name={"product_name"}
          label="Product Name"
          rules={[
            { required: true, message: "Please enter product name!" }
          ]}
          hasFeedback
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          name={"stock_at_home"}
          label="Quantity at Home"
          rules={[
            { pattern: /^[0-9]+$/, message: "Please enter a valid quantity!" },
          ]}
          hasFeedback
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name={"stock_at_shop"}
          label="Quantity at Shop"
          rules={[
            { pattern: /^[0-9]+$/, message: "Please enter a valid quantity!" },
          ]}
          hasFeedback
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name={"cost_price"}
          label="Cost Price"
          rules={[
            // pattern for float numbers
            { pattern: /^\d+(\.\d{1,2})?$/, message: "Please enter a valid price!" },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"unit_price"}
          label="Selling Price"
          rules={[
            // pattern for float numbers
            { pattern: /^\d+(\.\d{1,2})?$/, message: "Please enter a valid price!" },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name={"category_id"}
          label="Category"
          rules={[{ required: true, message: "Please select a category!" }]}
          hasFeedback
        >
          <Select
            showSearch
            allowClear
            placeholder="Select a category"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={(value) => {
              form.setFieldsValue({ category_id: value })

            }
            }
          >
            {
              categories?.map((category) => (
                <Select.Option key={category.category_id} value={category.category_id}>{category.category_name}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateUserForm
