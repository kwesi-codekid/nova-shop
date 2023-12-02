import React from "react"
import axios from "axios"
import { Modal, Form, Input, Select, message } from "antd"

const CreateUserForm = ({ open, fetchUsers, onCancel, loading, setLoadingCreateUserForm, setOpenCreateUserForm }) => {
  const [form] = Form.useForm()

  return (
    <Modal
      open={open}
      title="Add New User"
      okText="Submit"
      cancelText="Cancel"
      confirmLoading={loading}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            setLoadingCreateUserForm(true)
            axios.post(
              `http://localhost/akesseh/backend/api/user-account.php/create`,
              {
                fullname: values.fullname,
                email: values.email,
                phone: values.phone,
                user_role: values.user_role,
                password: values.password,
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
                  setLoadingCreateUserForm(false);
                  setOpenCreateUserForm(false);
                  fetchUsers();
                } else {
                  message.error(data.message);
                  setLoadingCreateUserForm(false);
                }
              })
              .catch((error) => {
                console.error("Error submitting form:", error);
                setLoadingCreateUserForm(false);
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
        name="create_user_form"
        requiredMark={false}
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name={"fullname"}
          label="Full Name"
          rules={[
            { required: true, message: "Please input the user's full name!" },
            {pattern: /^[A-Za-z]+(?: [A-Za-z]+)+$/, message: "Must have both first and last names!"}
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"email"}
          label="Email"
          rules={[
            { required: true, message: "Please input the user's email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"phone"}
          label="Phone"
          rules={[
            {
              required: true,
              message: "Please input the user's phone number!",
            },
            {
              pattern: /^(\+233|0)[2-9]\d{8}$/,
              message: "Please enter a valid phone number!",
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"password"}
          label="Password"
          rules={[{ required: true, message: "Please input your password!" }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name={"confirm_password"}
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value)
                  return Promise.resolve()
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                )
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name={"user_role"}
          label="User Role"
          rules={[{ required: true, message: "Please select user's role!" }]}
          hasFeedback
        >
          <Select>
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="staff">Staff</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateUserForm
