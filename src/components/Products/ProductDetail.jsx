import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductDataContext from "../../context/ProductDataContextProvider";
import RatingStars from "./RatingStars";

const ProductDetail = () => {
  const { id } = useParams();
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

  // Set the default selected image as the first image if available
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

  return (
    <div className="p-6 bg-gray-100 shadow-lg rounded-lg flex flex-col md:flex-row justify-between border border-gray-200 m-4 h-auto overflow-hidden">
      {/* Column for all images */}
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

      {/* Column for selected image */}
      <div className="w-full md:w-[40%] border border-gray-300 rounded-lg bg-white p-4 flex flex-col items-center overflow-hidden">
        {selectedImage ? (
          <img
            src={selectedImage}
            alt={product.title}
            className="max-w-[80vh] max-h-[80vh] rounded-md shadow-lg transition-transform transform hover:scale-105 mb-4"
          />
        ) : (
          <p className="text-gray-600 mb-4">Click on an image to see details.</p>
        )}
      </div>

      {/* Column for product details */}
      <div className="w-full md:w-[48%] border border-gray-300 rounded-lg bg-white p-4 flex flex-col overflow-y-auto h-[90vh]">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h2>
        <div className="text-yellow-500 mb-2">
          <RatingStars rating={product.rating} />
        </div>
        <p className="text-xl font-semibold text-green-600 mb-4">
          Price: <span className="line-through text-gray-500">${product.originalPrice}</span> ${product.price}
        </p>

        {/* Attractive Description Section */}
        <div className="bg-gray-50 p-4 rounded-md shadow-md mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Product Description</h3>
          <p className="text-gray-700 mb-4">{product.description}</p>
        </div>

        {/* Product Details */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Product Details</h3>
          <ul className="list-disc pl-5 text-gray-800">
            <li>Brand: <span className="font-medium">{product.brand}</span></li>
            <li>SKU: <span className="font-medium">{product.sku}</span></li>
            <li>Weight: <span className="font-medium">{product.weight} g</span></li>
            <li>Dimensions: <span className="font-medium">{product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm</span></li>
            <li>Warranty: <span className="font-medium">{product.warrantyInformation}</span></li>
            <li>Shipping: <span className="font-medium">{product.shippingInformation}</span></li>
            <li>Return Policy: <span className="font-medium">{product.returnPolicy}</span></li>
            <li>Minimum Order Quantity: <span className="font-medium">{product.minimumOrderQuantity}</span></li>
          </ul>
        </div>

        {/* Pricing and Availability */}
        <div className="mb-4">
          <h2 className="text-lg font-bold">${product.price}</h2>
          <div className="grid gap-1">
            <p className="text-xs font-medium text-[#007600]">In stock</p>
            <p className="text-xs font-medium text-lightGray">
              Sold by <span className="text-xs text-link">InfiniaRetail</span>
            </p>
            <p className="text-xs font-medium text-lightGray">
              Gift options not available. <span className="cartButtonLinks font-medium border-0 p-0">Learn more</span>
            </p>
            <p className="text-xs font-bold">
              Style Name: <span className="font-normal text-gray">{product.category}</span>
            </p>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Customer Reviews</h3>
          {product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className="border-b py-4">
                <div
                  className="cursor-pointer text-gray-900 hover:text-blue-500 transition-colors flex items-center"
                  onClick={() => toggleReview(index)}
                >
                  <span className="text-xl font-bold">{review.reviewerName}</span>
                  <div className="ml-2 text-yellow-500">
                    <RatingStars rating={review.rating} />
                  </div>
                </div>
                {expandedReviewIndex === index && (
                  <div className="mt-2 p-4 bg-gray-50 rounded-md shadow-md">
                    <p className="text-gray-900">{review.comment}</p>
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
