/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../../redux/order/orderAction";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDisclosure } from "@mantine/hooks";
import { Modal, useMantineTheme } from "@mantine/core";

const PlaceOrder = ({ orderDetails }) => {
  const cartDetails = useSelector((state) => state.cartDetails);
  const userDetails = useSelector((state) => state.signinDetails.userDetails);

  // const [isOrderSuccess, setOrderSuccess] = useState(true);

  const [isValidOrderDetails, setValidOrderDetails] = useState(false);

  const [opened, { open, close }] = useDisclosure(false);

  const [orderSummary, setOrderSummary] = useState({});

  const cartProductsDetails = cartDetails.products;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useMantineTheme();

  useEffect(() => {
    const subtotal = parseFloat(
      cartProductsDetails
        .reduce(
          (totalPrice, item) => totalPrice + item.product.price * item.quantity,
          0
        )
        .toFixed(2)
    );

    const shipping = parseFloat((cartDetails.productsCount * 40).toFixed(2));

    const total = parseFloat((subtotal + shipping).toFixed(2));
    const discount = shipping;
    const grandtotal = parseFloat((total - discount).toFixed(2));

    console.log(subtotal, shipping, total, discount, grandtotal);
    setOrderSummary({
      subtotal,
      shipping,
      total,
      discount,
      grandtotal,
    });
  }, [cartDetails, cartProductsDetails]);

  useEffect(() => {
    if (
      !orderDetails.deliveryAddress?.address ||
      !orderDetails.paymentDetails?.method ||
      !userDetails?.name
    ) {
      setValidOrderDetails(false);
    } else {
      setValidOrderDetails(true);
    }
  }, [orderDetails, userDetails]);

  const handlePlaceOrderClick = (e) => {
    e.stopPropagation();

    const currentDate = new Date();

    const currentDay = currentDate.getDate(); // Gets the day of the month (1-31)
    const currentMonth = currentDate.toLocaleString("en-US", { month: "long" }); // Gets the month (0-11), so adding 1 to make it 1-12
    const currentYear = currentDate.getFullYear(); // Gets the full year (e.g., 2023)

    const order = {
      ...orderDetails,
      ...cartDetails,
      orderSummary,
      date: { day: currentDay, month: currentMonth, year: currentYear },
    };

    dispatch(placeOrder(order));

    open(true);

    setTimeout(() => {
      navigate("/");
      dispatch({ type: "reset_cart" });
    }, 1000);
  };
  return (
    <div className="w-[300px] mx-auto p-5 bg-white border border-amazonBorder rounded-lg">
      {
        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={false}
          centered
          size="auto"
          padding="0"
          overlayProps={{
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[9]
                : theme.colors.gray[2],
            opacity: 0.55,
            blur: 3,
          }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={`relative p-4 bg-green-500 font-medium text-white rounded shadow-lg`}
          >
            Order Placed Successfully!
          </motion.div>
        </Modal>
      }
      <div className="border-b border-[#aaa] pb-1">
        <button
          disabled={!isValidOrderDetails}
          className={`amazonButton font-normal ${
            !isValidOrderDetails && "disabledAmazonButton"
          }`}
          onClick={handlePlaceOrderClick}
        >
          Place your order
        </button>
        <p className="text-xs text-littleDarkGray font-medium m-1 text-center">
          By placing your order, you agree to Amazon&apos;s privacy notice and
          conditions of use.
        </p>
      </div>
      <div>
        <h2 className="font-medium text-xl py-2">Order Summary</h2>
        <div className="border-b border-[#aaa]">
          <div className="flex py-1 text-xs justify-between">
            <p>Items:</p>
            <p>${orderSummary.subtotal}</p>
          </div>
          <div className="flex py-1 text-xs justify-between ">
            <p>Delivery:</p>
            <p>${orderSummary.shipping}</p>
          </div>
          <div className="flex py-1 text-xs justify-between ">
            <p>Total:</p>
            <p>${orderSummary.total}</p>
          </div>
          <div className="flex py-1 text-xs justify-between ">
            <p>Promotion Applied:</p>
            <p>-${orderSummary.discount}</p>
          </div>
        </div>
      </div>
      <div className="flex py-2 border-b border-[#aaa] justify-between text-xl font-bold text-red-800">
        <h2>Order Total:</h2>
        <h2>${orderSummary.grandtotal}</h2>
      </div>
    </div>
  );
};

export default PlaceOrder;
