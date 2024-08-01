/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import ApiIcon from "@mui/icons-material/Api";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Oval } from "react-loader-spinner";
import { addProduct, updateQuantity } from "../../redux/cart/cartAction";
import { useDispatch, useSelector } from "react-redux";

import RatingStars from "./RatingStars";
import ProductDataContext from "../../context/ProductDataContextProvider";

const Product = ({ filteredProductsData = [] }) => {
  const { listOfProducts } = useContext(ProductDataContext);
  console.log("productdata ",listOfProducts);
  const dispatch = useDispatch();

  const cartDetails = useSelector((state) => state.cartDetails);

  const [productsData, setProductsData] = useState([]);

  useEffect(()=>{
    setProductsData(listOfProducts.products)
  },[])

  useEffect(() => {
    setProductsData(
      // filteredProductsData?.length ? filteredProductsData : listOfProducts
      listOfProducts.products
    );
  }, [filteredProductsData, listOfProducts]);

  console.log(productsData);

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    const id = Number(e.target.id);

    // Check if the product already exists in the cart or not
    const isExistsInCart = cartDetails.products.some(
      (item) => item.product.id === id
    );

    if (isExistsInCart) {
      dispatch(updateQuantity({ id, quantity: 1 }));
      return;
    }

    // Find which product we need to add in the cart from the productData
    const selectedProduct = productsData.find((product) => product.id === id);
    dispatch(addProduct({ product: selectedProduct }));

    // Button state management for feedback
    e.target.disabled = true;
    e.target.classList.add("disabledAmazonButton");
    e.target.textContent = "Product Added to the Cart";
    setTimeout(() => {
      e.target.disabled = false;
      e.target.classList.remove("disabledAmazonButton");
      e.target.textContent = "Add to Cart";
    }, 1000);
  };

  // if (!productsData.length)
  //   return (
  //     <Oval
  //       height={60}
  //       width={60}
  //       color="#febd69"
  //       visible={true}
  //       wrapperClass="justify-center"
  //       ariaLabel="oval-loading"
  //       secondaryColor="#febd69"
  //       strokeWidth={6}
  //       strokeWidthSecondary={6}
  //     />
  //   );

  return (
    <section
      name="products"
      className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-4 px-4"
    >

      { productsData && productsData.map((item) => (
        <div
          key={item.id}
          className="bg-white h-auto border-[1px] border-gray-200 py-6 z-30 hover:border-transparent shadow-none 
                     hover:shadow-textShadow duration-200 relative flex flex-col gap-4"
        >
          <span className="text-xs capitalize italic absolute top-2 right-2 text-gray-500">
            {item.category}
          </span>
          {/* ========== Product Image Start here ============== */}
          <div className="w-full h-auto flex items-center justify-center relative group">
            <img
              className="w-52 h-64 object-contain"
              src={item.images[0]}
              alt="ProductImg"
            />
            {/* ================== Product mini drop down Start here ============ */}
            <ul
              className="absolute p-2 w-full h-auto bg-gray-100 -bottom-[140px] group-hover:bottom-0 duration-700 
                          flex flex-col justify-center items-end gap-1"
            >
              <li className="productLi">
                Compare
                <span>
                  <ApiIcon />
                </span>
              </li>
              <li className="productLi">
                Add to Cart
                <span>
                  <ShoppingCartIcon />
                </span>
              </li>
              <li className="productLi">
                Add to Wish List{" "}
                <span>
                  <FavoriteIcon />
                </span>
              </li>
            </ul>
            {/* ================== Product mini drop down End here ============== */}
          </div>
          {/* ========== Product Image End here ================ */}
          {/* ========== Product Info Start here =============== */}
          <div className="px-4 bg-white flex flex-col gap-1 z-10">
            <div className="flex items-center justify-between">
              <h2 className="font-titleFont tracking-wide text-lg text-amazon_blue font-medium">
                {item.title.substring(0, 20)}
              </h2>
              <p className="text-sm text-gray-600 font-semibold">
                ${item.price}
              </p>
            </div>
            <div>
              <p className="text-sm ">{item.description.substring(0, 100)}</p>
              <div className="text-yellow-500 flex">
                {/* <RatingStars rating={item.rating.rate} /> */}
              </div>
            </div>
            <button
              onClick={handleAddToCartClick}
              id={item.id}
              className="amazonButton mt-1"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Product;
