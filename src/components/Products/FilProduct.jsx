import { useContext, useEffect, useState } from "react";
import ApiIcon from "@mui/icons-material/Api";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addProduct, updateQuantity } from "../../redux/cart/cartAction";
import { useDispatch, useSelector } from "react-redux";
import RatingStars from "./RatingStars";
import ProductDataContext from "../../context/ProductDataContextProvider";
import { Link } from "react-router-dom";

const FilProduct = ({ filteredProductsData = [] }) => {
  const { listOfProducts } = useContext(ProductDataContext);
  const dispatch = useDispatch();
  const cartDetails = useSelector((state) => state.cartDetails);

  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    setProductsData(
      filteredProductsData.length > 0 ? filteredProductsData : listOfProducts.products
    );
  }, [filteredProductsData, listOfProducts]);

  // const handleAddToCartClick = (e) => {
  //   e.stopPropagation();
  //   const id = Number(e.target.id);

  //   const isExistsInCart = cartDetails.products.some(
  //     (item) => item.product.id === id
  //   );

  //   if (isExistsInCart) {
  //     dispatch(updateQuantity({ id, quantity: 1 }));
  //     return;
  //   }

  //   const selectedProduct = productsData.find((product) => product.id === id);
  //   dispatch(addProduct({ product: selectedProduct }));

  //   e.target.disabled = true;
  //   e.target.classList.add("disabledButton");
  //   e.target.textContent = "Added to Cart";
  //   setTimeout(() => {
  //     e.target.disabled = false;
  //     e.target.classList.remove("disabledButton");
  //     e.target.textContent = "Add to Cart";
  //   }, 1000);
  // };
  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    const id = Number(e.target.id);
    
    // Check if the product is already in the cart
    const isExistsInCart = cartDetails.products.some(
      (item) => item.product.id === id
    );
    
    if (isExistsInCart) {
      // If the product is already in the cart, show a message or handle it as needed
      e.target.disabled = true;
      e.target.classList.add("disabledButton");
      e.target.textContent = "Already in Cart";
      setTimeout(() => {
        e.target.disabled = false;
        e.target.classList.remove("disabledButton");
        e.target.textContent = "Add to Cart";
      }, 1000);
      return; // Prevent further execution if the product is already in the cart
    }
  
    // Find the selected product in productsData
    const selectedProduct = productsData.find((product) => product.id === id);
  
    if (selectedProduct) {
      // If the product is not in the cart, add it
      dispatch(addProduct({ product: selectedProduct }));
    
      // Disable the button and show "Added to Cart" after adding
      e.target.disabled = true;
      e.target.classList.add("disabledButton");
      e.target.textContent = "Added to Cart";
      setTimeout(() => {
        e.target.disabled = false;
        e.target.classList.remove("disabledButton");
        e.target.textContent = "Add to Cart";
      }, 1000);
    } else {
      console.error("Product not found in productsData");
    }
  };

  return (
    <section
      name="products"
      className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 py-8 bg-gradient-to-b from-gray-100 to-gray-300"
    >
      {productsData &&
        productsData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative group"
          >
            {/* Category Label */}
            <span className="text-xs uppercase font-semibold text-gray-500 bg-gray-200 px-2 py-1 rounded-br-lg absolute top-2 left-2 z-10">
              {item.category}
            </span>
            
            <div className="relative w-full h-64 flex items-center justify-center bg-gray-50">
              <img
                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                src={item.images[0]}
                alt="ProductImg"
              />
              <ul
                className="absolute inset-x-0 bottom-0 bg-white bg-opacity-95 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex justify-around text-sm text-gray-700 opacity-0 group-hover:opacity-100"
              >
                <li className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                  <ApiIcon /> 
                </li>
                <li className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                  <ShoppingCartIcon /> 
                </li>
                <li className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                  <FavoriteIcon /> 
                </li>
              </ul>
            </div>
            <div className="p-4 flex flex-col gap-2">
            <Link to={`/product_details/${item.id}`}>
              <h2 className="font-semibold text-lg text-gray-800 group-hover:text-yellow-600 transition-colors duration-300">
                {item.title.length > 20
                  ? `${item.title.substring(0, 17)}...`
                  : item.title}
              </h2>
              </Link>
              <p className="text-gray-600 text-sm">
                {item.description.length > 40
                  ? `${item.description.substring(0,42)}...`
                  : item.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <p className="text-lg font-bold text-gray-900">
                  ${item.price.toFixed(2)}
                </p>
                <div className="text-yellow-500 flex">
                  <RatingStars rating={item.rating} />
                </div>
              </div>
              <button
                onClick={handleAddToCartClick}
                id={item.id}
                className="mt-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
    </section>
  );
};

export default FilProduct;
