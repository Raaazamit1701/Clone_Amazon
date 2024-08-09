import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, updateQuantity } from "../../redux/cart/cartAction";
import { useEffect, useRef } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { emptyCart } from "../../assets/images";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartDetails = useSelector((state) => state.cartDetails);
  const userDetails = useSelector((state) => state.signinDetails.userDetails);
  const cartProductsDetails = cartDetails.products;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  //create a list of refs to store all input references that are currently present in the cart section
  const quantityInputRef = useRef([]);

  //every time when component mounted set all input fields with the quantity of each product
  useEffect(() => {
    cartProductsDetails.forEach((item, index) => {
      quantityInputRef.current[index].value = item.quantity;
    });
  }, []);

  const calculateTotalAmount = () => {
    const totalPrice = cartProductsDetails.reduce(
      (totalPrice, item) => totalPrice + item.product.price * item.quantity,
      0
    );
    return parseFloat(totalPrice.toFixed(2));
  };

  const getProductQuantity = (id) => {
    for (const item of cartProductsDetails) {
      if (item.product.id === Number(id)) {
        return item.quantity;
      }
    }
  };

  const isValidPositiveInteger = (input) => {
    const numericValue = parseInt(input, 10);
    return (
      Number.isInteger(numericValue) &&
      numericValue >= 0 &&
      !input.includes(".")
    );
  };

  const handleUpdateQuantityClick = (e) => {
    e.stopPropagation();
    const id = Number(e.target.id);

    //get the newQuantity from the corresponding product update_quantity_input_field
    let newQuantity;
    for (const inputRef of quantityInputRef.current) {
      if (Number(inputRef.id) === id) {
        newQuantity = inputRef.value;
        if (!isValidPositiveInteger(newQuantity)) {
          inputRef.focus();
          return;
        }
        break;
      }
    }
    newQuantity = Number(newQuantity);

    const productToUpdateQuantity = cartProductsDetails.find(
      (item) => item.product.id === id
    );

    const oldQuantity = productToUpdateQuantity.quantity;

    if (newQuantity === oldQuantity) return;

    if (newQuantity === 0) {
      dispatch(deleteProduct({ id }));
      return;
    }

    dispatch(updateQuantity({ id, quantity: newQuantity - oldQuantity }));
  };

  const handleDeleteProductClick = (e) => {
    e.stopPropagation();
    const id = Number(e.target.id);
    dispatch(deleteProduct({ id }));
  };

  return (
    <section
      name="shopping-cart"
      className="flex flex-col justify-between lg:flex-row  gap-5 bg-[#eaeded] py-8 px-6"
    >
      <div className="flex-1 bg-white py-6 px-4 border">
        <h1 className="text-3xl font-medium text-amazon_blue border-b pb-4">
          {cartProductsDetails.length
            ? "Shopping Cart"
            : "Your Amazon Cart is empty."}
        </h1>
        <div className="">
          {!cartProductsDetails.length ? (
            <img className="mx-auto" src={emptyCart} alt="empty-cart-image" />
          ) : (
            <ul className=" h-[50vh] overflow-y-auto">
              {cartProductsDetails.map((item, index) => {
                console.log(item);
                
                return (
                  <li
                    key={item.product.id}
                    className="flex flex-col gap-6 md:flex-row border-b py-4"
                  >
                    <div className="mx-auto md:mx-0  ">
                      <img
                        className="min-w-[150px] max-w-[150px] max-h-[200px]"
                        src={item.product.images[0]}
                        alt="item.product-image"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">
                        {item.product.title}
                      </h3>
                      <h2 className="text-lg font-bold">
                        ${item.product.price}
                      </h2>
                      <div className="grid  gap-1">
                        <p className="text-xs font-medium text-[#007600]">
                          In stock
                        </p>
                        <p className="text-xs font-medium text-lightGray">
                          Sold by{" "}
                          <span className="text-xs text-link">
                            {"InfiniaRetail"}
                          </span>
                        </p>
                        <p className="text-xs font-medium text-lightGray">
                          Gift options not available.{" "}
                          <span className="cartButtonLinks font-medium border-0 p-0">
                            Learn more
                          </span>
                        </p>
                        <p className="text-xs font-bold">
                          Style Name:{" "}
                          <span className=" font-normal text-gray">
                            {item.product.category}
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-4 items-center py-2">
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            placeholder="Qty:"
                            min={0}
                            id={item.product.id}
                            onBlur={(event) => {
                              if (event.target.value === "") {
                                event.target.value = getProductQuantity(
                                  event.target.id
                                );
                              }
                            }}
                            ref={(element) =>
                              (quantityInputRef.current[index] = element)
                            }
                            className="inputBox text-amazon_blue w-[70px]  border-lightGray rounded"
                          />
                          <button
                            id={item.product.id}
                            onClick={handleUpdateQuantityClick}
                            className="amazonButton w-max h-max text-[10px] px-2 py-[2px] transform scale-90 text-amazon_blue"
                          >
                            Update
                          </button>
                        </div>
                        <p
                          id={item.product.id}
                          onClick={handleDeleteProductClick}
                          className="cartButtonLinks"
                        >
                          Delete
                        </p>
                        <p
                          className="cartButtonLinks"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/youraccount/wishlist");
                          }}
                        >
                          Add to wishlist
                        </p>
                        <p
                          className="cartButtonLinks"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/filtered_products");
                          }}
                        >
                          See more like this
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <h2 className="text-xl text-end font-medium text-defaultHeading">
          Subtotal {`(${cartDetails.productsCount} items)`}:
          <span className="font-bold text-defaultParagraph">
            {" "}
            ${calculateTotalAmount() || "0.00"}
          </span>
        </h2>
      </div>
      {cartProductsDetails.length ? (
        <div className="mx-auto w-max h-max p-5 bg-white">
          <div className="flex text-xs">
            <span className="text-[#067d62]">
              <CheckCircleIcon style={{ fontSize: "22px" }} />
            </span>{" "}
            <div className="px-1">
              <p className="text-[#067d62]">
                Your order is eligible for FREE Delivery.
              </p>
              <div className=" text-xs text-defaultParagraph">
                <span>Select this option at checkout. </span>
                <a
                  href="https://www.amazon.in/gp/help/customer/display.html?nodeId=200904360&pop-up=1"
                  target="_blank"
                  rel="noreferrer"
                  className="inline cartButtonLinks hover:text-orange-700  px-0 border-l-0"
                >
                  Details
                </a>
              </div>
            </div>
          </div>
          <h2 className="py-5 text-xl font-medium text-defaultHeading">
            Subtotal {`(${cartDetails.productsCount} items)`}:
            <span className="font-bold text-defaultParagraph">
              {" "}
              ${calculateTotalAmount() || "0.00"}
            </span>
          </h2>

          <button
            className="amazonButton font-normal max-w-xs"
            onClick={() => {
              navigate(userDetails?.name ? "/checkout" : "/signin", {
                state: {
                  originPath: location.pathname,
                },
              });
            }}
          >
            Proceed to Buy
          </button>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default Cart;
