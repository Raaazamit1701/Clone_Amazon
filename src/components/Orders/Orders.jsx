import { useDispatch, useSelector } from "react-redux";
// import LoopIcon from "@mui/icons-material/Loop";
import CachedIcon from "@mui/icons-material/Cached";
import { useNavigate } from "react-router-dom";
import { updateQuantity, addProduct } from "../../redux/cart/cartAction";
import { useContext } from "react";
import ProductDataContext from "../../context/ProductDataContextProvider";

const Orders = () => {
  const orderDetails = useSelector((state) => state.orderDetails);
  const { listOfProducts } = useContext(ProductDataContext);
  const cartDetails = useSelector((state) => state.cartDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyItAgainClick = (e) => {
    e.stopPropagation();

    const id = Number(e.currentTarget.getAttribute("data-id"));

    //check if the product already exists in the cart or not
    const isExistsInCart = cartDetails.products.some(
      (item) => item.product.id === id
    );

    if (isExistsInCart) {
      dispatch(updateQuantity({ id, quantity: 1 }));
      navigate("/cart");
      return;
    }

    //find which product we need to add in the cart from the productData
    const selectedProduct = listOfProducts.find((product) => product.id === id);
    dispatch(addProduct({ product: selectedProduct }));
    navigate("/cart");
  };

  console.log(orderDetails);
  return (
    <section name="orders" className="max-w-5xl mx-auto text-defaultHeading">
      <h2 className="text-3xl my-3 border-b border-[#bbb]">Your Orders</h2>
      <div>
        <section>
          <span className=" font-medium">
            {orderDetails.orders.length} Orders{" "}
          </span>
          <span>placed</span>
        </section>

        <section>
          <ul className="my-2 grid gap-4">
            {orderDetails.orders.map((order, index) => {
              return (
                <li
                  key={index}
                  className="border border-amazonBorder rounded-lg overflow-hidden]"
                >
                  {/* order details */}

                  <div
                    name="order-details"
                    className="p-4 grid gap-4  grid-cols-2 mdl:grid-cols-4 items-center border-b border-amazonBorder bg-quantity_box"
                  >
                    {/* left */}

                    <div>
                      <p className="text-lightGray text-xs">ORDER PLACED</p>
                      <p className="text-sm text-littleDarkGray font-medium">
                        {order.date.day} {"November"} {order.date.year}
                      </p>
                    </div>

                    <div>
                      <p className="text-lightGray text-xs">TOTAL</p>
                      <p className="text-sm text-littleDarkGray font-medium">
                        ${order.orderSummary.grandtotal}
                      </p>
                    </div>

                    <div>
                      <p className="text-lightGray text-xs">SHIP TO</p>
                      <div className="w-max group relative">
                        <p className="navigateButtonLinks text-sm relative">
                          {order.deliveryAddress.address.name}
                        </p>

                        <div
                          className="w-max text-sm absolute hidden px-4 py-3 border border-[#ccc] rounded-lg bg-white shadow-xl
                                      opacity-0 group-hover:opacity-100 group-hover:block transition-opacity
                                      mdl:left-[50%] transform mdl:-translate-x-1/2  mdl:translate-y-2"
                        >
                          <h4 className="font-medium">
                            {order.deliveryAddress.address.name}
                          </h4>
                          <p>{order.deliveryAddress.address.houseNumber}</p>
                          <p>
                            {order.deliveryAddress.address.area}{" "}
                            {order.deliveryAddress.address.landmark &&
                              `(${order.deliveryAddress.address.landmark})`}
                          </p>
                          <p>
                            {order.deliveryAddress.address.city},{" "}
                            {order.deliveryAddress.address.state}{" "}
                          </p>
                          <p>{order.deliveryAddress.address.pincode}</p>
                          <p>{order.deliveryAddress.address.country}</p>
                          <p>
                            Phone number: {order.deliveryAddress.address.phone}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* right */}

                    <div>
                      <p className="text-lightGray text-xs">
                        ORDER # 2153-882{index}
                      </p>
                      <div className="w-max group relative">
                        <p className="navigateButtonLinks text-sm relative">
                          View order details
                        </p>

                        <div
                          className=" w-max text-sm absolute hidden px-4 py-3 border border-[#ccc] rounded-lg bg-white shadow-xl
                                      opacity-0 group-hover:opacity-100 group-hover:block transition-opacity
                                      right-0 mdl:left-[50%] transform mdl:-translate-x-1/2  mdl:translate-y-2"
                        >
                          <div className="pb-2">
                            <h4 className="font-medium">Payment Method</h4>
                            <p>{order.paymentDetails.method}</p>
                          </div>

                          <div className="">
                            <h4 className="font-medium">Order Summary</h4>
                            <div className="flex gap-10 justify-between">
                              <p>Item(s) Subtotal:</p>
                              <p>${order.orderSummary.subtotal}</p>
                            </div>
                            <div className="flex gap-10 justify-between">
                              <p>Shipping:</p>
                              <p>${order.orderSummary.shipping}</p>
                            </div>
                            <div className="flex gap-10 justify-between">
                              <p>Total:</p>
                              <p>${order.orderSummary.total} </p>
                            </div>
                            <div className="flex gap-10 justify-between">
                              <p>Promotion Applied:</p>
                              <p>-${order.orderSummary.discount}</p>
                            </div>
                            <div className="font-medium flex gap-10 justify-between ">
                              <h3>Grand Total:</h3>
                              <h3>${order.orderSummary.grandtotal}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* products details */}

                  <div name="product-details">
                    <ul>
                      {order.products.map((item, index) => {
                        console.log("item.product.id", item.product.id);
                        return (
                          <li key={index} className="flex px-4 py-5 gap-6">
                            <div>
                              <img
                                className=" min-w-[100px] max-w-[100px] max-h-[120px]"
                                src={item.product.image}
                                alt="product-image"
                              />
                            </div>
                            <div className="max-w-[350px]">
                              <p className="text-sm ">
                                {item.product.description.slice(0, 100)} . . .
                              </p>
                              <button
                                data-id={item.product.id}
                                onClick={handleBuyItAgainClick}
                                className="flex gap-1 items-center amazonButton w-max px-2 py-1 my-2"
                              >
                                <CachedIcon style={{ fontSize: "20px" }} />
                                <p>Buy it again</p>
                              </button>
                              <p className="text-sm text-littleDarkGray">
                                Quantity Purchased: {item.quantity}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </section>
  );
};

export default Orders;
