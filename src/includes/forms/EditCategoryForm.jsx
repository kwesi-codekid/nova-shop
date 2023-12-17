import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, Form, Input, Select, message } from 'antd'

// ... (imports remain the same)

const EditCategoryForm = ({ open, setOpen, fetchCategories, onCancel, loading, setLoading, category_id }) => {
  const [category, setCategory] = useState({});

  const fetchCategory = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost/akesseh/backend/api/product-category.php/fetch-by?category_id=${id}`);
      setCategory(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetFormAndCloseModal = () => {
    setCategory({});
    setLoading(false);
    setOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    if (open) {
      // If the modal is open, fetch the category data
      fetchCategory(category_id);
    } else {
      // If the modal is closed, reset the form and category data
      resetFormAndCloseModal();
    }
  }, [open, category_id]);

  const [form] = Form.useForm();
  const { Item } = Form;

  // Set initial values for the form fields
  useEffect(() => {
    form.setFieldsValue({
      category_name: category.category_name,
      description: category.description,
      category_id: category.category_id,
    });
  }, [category, form]);

  return (
    <Modal
      open={open} // Use "visible" instead of "open"
      title="Edit Category"
      okText="Submit"
      cancelText="Cancel"
      okButtonProps={{ className: "bg-blue-600 !rounded-xl !text-white hover:!text-white hover:bg-blue-500 font-sen" }}
      cancelButtonProps={{ className: "!border-red-500 font-sen !rounded-xl !text-red-500 hover:!text-white hover:!bg-red-500" }}
      confirmLoading={loading}
      onCancel={() => {
        resetFormAndCloseModal();
        onCancel()
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            setLoading(true);

            axios.post(
              `http://localhost/akesseh/backend/api/product-category.php/update`,
              {
                category_id: category_id,
                category_name: values.category_name,
                description: values.description,
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
                message.success(data.message);
                form.resetFields();
                setLoading(false);
                setOpen(false);
                fetchCategories();
              } else {
                message.error(data.message);
                setLoading(false);
              }
            })
            .catch((error) => {
              console.error("Error submitting form:", error);
              setLoading(false);
            })
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="edit_category_form"
        requiredMark={false}
      >
        <Item 
          label="Category ID"
          name="category_id"
          className='!hidden'
        >
          <Input />
        </Item>
        <Item
          label="Category Name"
          name="category_name"
          rules={[
            {
              required: true,
              message: "Please input the category name!",
            },
          ]}
        >
          <Input />
        </Item>

        <Item label="Description" name="description">
          <Input />
        </Item>
      </Form>
    </Modal>
  );
};

export default EditCategoryForm;
