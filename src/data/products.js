import axios from "axios"

export const fetchProducts = async () => {
  const response = await axios.get("http://localhost/akesseh/backend/api/products.php/fetch-all")
  return response.data
}