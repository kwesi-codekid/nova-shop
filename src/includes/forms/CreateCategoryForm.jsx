import axios from "axios"
import { Modal, Form, Input, Select, message } from "antd"

const CreateCategoryForm = ({ open, fetchCategories, onCancel, loading, setLoading, setOpen }) => {
  const [form] = Form.useForm()

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
              `http://localhost/akesseh/backend/api/product-category.php/create`,
              {
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
                  console.log(data);
                  message.success(data.message);
                  form.resetFields(); // Reset the form only when status is 200
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
      cancelButtonProps={{ className: "font-poppins font-semibold text-gray-800 dark:text-gray-300" }}
    >
      <Form
        form={form}
        layout="vertical"
        name="create_category_form"
        requiredMark={false}
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name={"category_name"}
          label="Category Name"
          rules={[
            { required: true, message: "Please enter category name!" }
          ]}
          hasFeedback
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          name={"description"}
          label="Description"
        >
          <Input type="text" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateCategoryForm
