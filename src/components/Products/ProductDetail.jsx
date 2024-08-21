import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // Added useDispatch
import { addProduct, updateQuantity } from "../../redux/cart/cartAction"; // Import your actions
import ProductDataContext from "../../context/ProductDataContextProvider";
import RatingStars from "./RatingStars";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch(); // Initialize dispatch
  const { listOfProducts } = useContext(ProductDataContext);
  const cartDetails = useSelector((state) => state.cartDetails);

  const [cartData, setCartData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [expandedReviewIndex, setExpandedReviewIndex] = useState(null);

  useEffect(() => {
    if (listOfProducts?.products) {
      setCartData(listOfProducts.products);
    }
  }, [listOfProducts]);

  const product = cartData.find((e) => e.id === parseInt(id));

  useEffect(() => {
    if (product && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  if (!product) {
    return <div className="text-red-500 font-bold">Product not found</div>;
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const toggleReview = (index) => {
    setExpandedReviewIndex(expandedReviewIndex === index ? null : index);
  };

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

  //   dispatch(addProduct({ product }));

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

    // If the product is not in the cart, add it
    dispatch(addProduct({ product }));

    // Disable the button and show "Added to Cart" after adding
    e.target.disabled = true;
    e.target.classList.add("disabledButton");
    e.target.textContent = "Added to Cart";
    setTimeout(() => {
      e.target.disabled = false;
      e.target.classList.remove("disabledButton");
      e.target.textContent = "Add to Cart";
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <div className="p-6 bg-gray-100 shadow-lg rounded-lg flex flex-col md:flex-row justify-between border border-gray-200 m-4 h-auto overflow-hidden">
        <div className="w-full md:w-[10%] flex items-center border border-gray-300 rounded-lg bg-white p-2">
          <div className="flex flex-col">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} ${index + 1}`}
                className="h-20 w-full rounded-md shadow-md cursor-pointer mb-2 border border-gray-300 hover:opacity-80 transition-opacity"
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        </div>

        <div className="w-full md:w-[40%] border border-gray-300 rounded-lg bg-white p-4 flex flex-col items-center overflow-hidden">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt={product.title}
              className="max-w-[80vh] max-h-[80vh] rounded-md shadow-lg transition-transform transform hover:scale-105 mb-4"
            />
          ) : (
            <p className="text-gray-600 mb-4">
              Click on an image to see details.
            </p>
          )}
        </div>

        <div className="w-full md:w-[48%] border border-gray-300 rounded-lg bg-white p-4 flex flex-col overflow-y-auto h-[90vh]">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {product.title}
          </h2>
          <div className="text-yellow-500 mb-2">
            <RatingStars rating={product.rating} />
          </div>

          <div className="flex items-center mb-4">
            <p className="text-xl font-semibold text-black mr-4">
              ${product.price}
            </p>
            {product.discountPercentage > 0 && (
              <span className="bg-red-500 text-white font-semibold text-xs rounded-full px-2 py-1">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>

          <div className="mb-4">
            <div className="grid gap-1">
              <p className="text-xs font-medium text-blue-300">FREE delivery</p>
              <p className="text-xs font-medium text-lightGray">
                Gift options not available.{" "}
                <span className="cartButtonLinks font-medium border-0 p-0">
                  Learn more
                </span>
              </p>
              <p className="text-xs font-bold">
                Style Name:{" "}
                <span className="font-normal text-gray">
                  {product.category}
                </span>
              </p>
              <p className="text-lg font-medium text-green-500">
                Available to{" "}
                <span className="text-lg text-green">
                  {product.shippingInformation}
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={handleAddToCartClick}
            id={product.id}
            className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500 transition-colors"
          >
            Add to Cart
          </button>

          <div className="bg-gray-50 p-4 rounded-md shadow-md mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Product Details
            </h3>
            <p className="text-gray-600 mb-2">
              <strong>Brand:</strong> {product.brand}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Stock:</strong> {product.stock}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Warranty:</strong> {product.warrantyInformation}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Minimum Order Quantity:</strong>{" "}
              {product.minimumOrderQuantity}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Return Policy:</strong> {product.returnPolicy}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-md shadow-md mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Product Description
            </h3>
            <p className="text-gray-700 mb-4">{product.description}</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b-2 text-center border-gray-300 pb-2">
          Customer Reviews
        </h3>
        <div className="flex flex-wrap justify-around">
          {product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-4 mb-6 w-full md:w-[45%] lg:w-[30%] border border-gray-300"
              >
                <div
                  className="cursor-pointer text-gray-900 hover:text-blue-500 transition-colors flex items-center justify-between"
                  onClick={() => toggleReview(index)}
                >
                  <span className="text-xl font-bold">
                    {review.reviewerName}
                  </span>
                  <div className="ml-2 text-yellow-500">
                    <RatingStars rating={review.rating} />
                  </div>
                </div>
                {expandedReviewIndex === index && (
                  <div className="mt-2 p-4 bg-gray-50 rounded-md shadow-md">
                    <p className="text-gray-900 mb-2">{review.comment}</p>
                    <p className="text-gray-500 text-sm">
                      Reviewed on {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
