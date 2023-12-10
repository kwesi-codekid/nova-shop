import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ContainerIcon from "../../assets/pngs/icons8-container.png"

const Categories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
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

    fetchCategories()
    console.log(categories);
  }, [])
  
  return (
    <div >
      
    </div>
  )
}

export default Categories