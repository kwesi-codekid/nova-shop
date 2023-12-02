import React, { useEffect } from "react"
import { useNavigate } from "react-router"

import AppLogo from "../assets/svgs/app-logo.svg"
import { LoadingOutlined } from "@ant-design/icons"

const Landing = () => {
  document.title = "Nova Shop Pro"

  // redirect to dashbaord after 3 seconds
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate("/admin/dashboard")
    }, 3000)
  })
  return (
    <div className="h-full pb-20 flex flex-col items-center gap-4 justify-center">
      <img src={AppLogo} alt="app-logo" className="w-[80%] lg:w-[25%] dark:rounded-full" />
      <div className="flex flex-col gap-4">
        <h1 className="font-poppins text-3xl lg:text-5xl text-center text-blue-600 dark:text-white font-bold">
          Nova Shop Pro 
        </h1>
        <h2 className="font-semibold font-poppins text-xl text-center lg:text-3xl text-slate-600 dark:text-slate-300">LinaKess Furniture</h2>
      </div>

      <LoadingOutlined className="text-5xl text-blue-600 dark:text-white " />
    </div>
  )
}

export default Landing
