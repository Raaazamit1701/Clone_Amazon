/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useEffect, useState } from "react";

const ProductDataContext = createContext();
export const ProductDataContextProvider = ({ children }) => {
  const [listOfProducts, setListOfProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products?limit=100`);
        if (!response.ok) {
          throw new Error(`API failed status: ${response.status}`);
        }
        const data = await response.json();
        setListOfProducts(data);
      } catch (error) {
        console.log("Error is", error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <ProductDataContext.Provider value={{ listOfProducts, loading }}>
      {children}
    </ProductDataContext.Provider>
  );
};

export default ProductDataContext;
