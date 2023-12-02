import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 
import inventorySVG from '../assets/svgs/inventory.svg';

const Login = () => {
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const { setAuth } = useAuth(); // Use the useAuth hook

  const onLoginFinish = async (values) => {
    setLoading(true);
    const { email, password } = values;
    try {
      const response = await axios.post(
        `http://localhost/akesseh/backend/api/auth.php/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.data.status === 200) {
        setLoading(false);
        message.success(response.data.message);
        setAuth(response.data); // Set authentication state
        navigate('/admin/dashboard');
      } else {
        setLoading(false);
        message.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  
  return (
    <div className="flex h-full flex-col lg:flex-row gap-4 bg-white dark:bg-gray-950">
      <div className="lg:w-1/2 h-max lg:h-[80%] flex lg:flex-col items-center justify-between lg:justify-center bg-blue-500 lg:bg-transparent gap-4 px-3">
        <img src={inventorySVG} alt="inventory" className="w-20 lg:w-[70%]" />
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl lg:text-6xl font-bold font-poppins text-white dark:text-white">
            Nova Shop Pro
          </h1>
        </div>
      </div>

      {/* Login form */}
      <div className="flex-1 h-full flex flex-col items-center justify-center px-6 -mt-12 lg:mt-0">
        {/* Login form */}
        <h1 className="font-poppins text-3xl lg:text-5xl text-gray-800 dark:text-white mb-4 font-semibold lg:w-[55%]">
          Sign In to Your Account
        </h1>
        <Form
          layout="vertical"
          onFinish={onLoginFinish}
          autoComplete="off"
          initialValues={{
            remember: true,
          }}
          requiredMark={false}
          className="w-full lg:w-[55%]"
        >
          <Form.Item
            label={
              <p className="font-sen text-lg lg:text-2xl text-gray-800 dark:text-gray-300">
                Email
              </p>
            }
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
            hasFeedback
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              className="h-12 rounded-xl"
            />
          </Form.Item>

          <Form.Item
            label={
              <p className="font-sen text-lg lg:text-2xl text-gray-800 dark:text-gray-300">
                Password
              </p>
            }
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              className="h-12 rounded-xl"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              size="large"
              className="bg-blue-600 hover:!bg-blue-700 !w-full !h-12 !rounded-xl font-poppins font-semibold !text-xl"
              block
              htmlType="submit"
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
