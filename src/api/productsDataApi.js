import axios from "axios";

// const getProductsData = async () => {
//   // const response = await fetch("https://dummyjson.com/products?limit=100");
//   // const data = await response.json();
//   // console.log(data);
//   // return data;
//   try {
//     const response = await axios.get("https://dummyjson.com/products?limit=100");
//     console.log(response.data.products);
    
//     return response.data.products;
//   } catch (error) {
//     console.error("Error fetching products data:", error);
//     throw error;
//   }
// };
// export default getProductsData;


export async function getProductsData() {
  try {
    const response = await axios.get("https://dummyjson.com/products?limit=100");
    console.log(response.data.products);
    
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products data:", error);
    throw error;
  }
}
