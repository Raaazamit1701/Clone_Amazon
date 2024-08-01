import { Accordion } from "@mantine/core";
import SelectAddress from "./SelectAddress";
import { useState } from "react";
import { logoDark } from "../../assets/images";
import LockIcon from "@mui/icons-material/Lock";
import PaymentMethod from "./PaymentMethod";
import PlaceOrder from "./PlaceOrder";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const [openedItem, setOpenedItem] = useState("delivery-address");

  const [orderDetails, setOrderDetails] = useState({
    deliveryAddress: null,
    paymentDetails: null,
  });

  const handleOpenItem = (value) => {
    setOpenedItem(value);
  };

  return (
    <section name="checkout" className="p-4 font-500">
      <header className="flex justify-around  bg-zinc-100 bg-gradient-to-b from-white via-white to-zinc-100 border-b border-selectBorder">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img src={logoDark} alt="website-logo" className="w-32" />
        </div>
        <h1 className="text-3xl font-medium text-defaultHeading">Checkout</h1>
        <div className="pt-1">
          <LockIcon style={{ color: "#888" }} />
        </div>
      </header>
      <main className="max-w-5xl mx-auto">
        <Accordion
          defaultValue="delivery-address"
          value={openedItem}
          onChange={setOpenedItem}
        >
          <Accordion.Item value="delivery-address">
            <Accordion.Control>
              {openedItem === "delivery-address" ? (
                <div className="flex gap-3 items-start text-base leading-5 md:text-xl font-medium text-orange-700">
                  <h2>1</h2>
                  <h2>Select delivery address</h2>
                </div>
              ) : (
                <div className="grid grid-cols-2">
                  <div className="flex gap-3 items-start text-base leading-5 md:text-xl font-medium text-defaultHeading">
                    <h2>1</h2>
                    <h2 className="pr-4">Delivery address</h2>
                  </div>
                  {orderDetails.deliveryAddress?.address && (
                    <div className="text-sm md:text-base">
                      <p>{orderDetails.deliveryAddress.address.name}</p>
                      <p>{orderDetails.deliveryAddress.address.houseNumber}</p>
                      <p>{orderDetails.deliveryAddress.address.area}</p>
                      <p>
                        {`${orderDetails.deliveryAddress.address.city}, ${orderDetails.deliveryAddress.address.state}, ${orderDetails.deliveryAddress.address.pincode}`}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </Accordion.Control>

            <Accordion.Panel>
              <SelectAddress
                setOrderDetails={setOrderDetails}
                handleOpenItem={handleOpenItem}
                orderDetails={orderDetails}
              />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item
            value="payment-methods"
            opened={openedItem === "payment-methods"}
          >
            <Accordion.Control>
              {openedItem === "payment-methods" ? (
                <div className="flex gap-3 items-start text-base leading-5 md:text-xl font-medium text-orange-700">
                  <h2>2</h2>
                  <h2>Select a payment method</h2>
                </div>
              ) : (
                <div className="grid grid-cols-2 items-center">
                  <div className="flex gap-3 items-start text-base leading-5 md:text-xl font-medium text-defaultHeading">
                    <h2>2</h2>
                    <h2 className="pr-4">Payment method</h2>
                  </div>
                  {orderDetails.paymentDetails && (
                    <div className="text-sm md:text-base">
                      <p>{orderDetails.paymentDetails.method}</p>
                    </div>
                  )}
                </div>
              )}
            </Accordion.Control>
            <Accordion.Panel>
              <PaymentMethod
                setOrderDetails={setOrderDetails}
                handleOpenItem={handleOpenItem}
                orderDetails={orderDetails}
              />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item
            value="place-order"
            opened={openedItem === "place-order"}
          >
            <Accordion.Control>
              {openedItem === "place-order" ? (
                <div className="flex gap-3 items-start text-base leading-5 md:text-xl font-medium text-orange-700">
                  <h2>3</h2>
                  <h2>Place your order</h2>
                </div>
              ) : (
                <div className="flex gap-3 items-start text-base leading-5 md:text-xl font-medium text-defaultHeading">
                  <h2>2</h2>
                  <h2>Your order</h2>
                </div>
              )}
            </Accordion.Control>
            <Accordion.Panel>
              <PlaceOrder orderDetails={orderDetails} />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </main>
    </section>
  );
};
export default Checkout;
