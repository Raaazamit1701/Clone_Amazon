import { useEffect, useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import ListOfCards from "./ListOfCards";
import CardDetails from "./CardDetails";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// eslint-disable-next-line react/prop-types
const PaymentMethod = ({ setOrderDetails, handleOpenItem, orderDetails }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const [isPaymentMethodDetailsAdded, setPaymentMethodDetailsAdded] =
    useState(false);

  const [paymentMethodDetails, setPaymentMethodDetails] = useState({
    method: "",
    details: "",
  });

  const [upiId, setUpiId] = useState("");
  const [upiError, setUpiError] = useState("");

  const handleUPIClick = () => {
    const upiPattern = /^[a-zA-Z0-9.\-_]{2,49}@[a-zA-Z._]{2,49}$/;

    if (upiId && upiPattern.test(upiId)) {
      setPaymentMethodDetailsAdded(true);
      setPaymentMethodDetails({ method: "UPI", details: upiId });
      setUpiError("");
    } else {
      setUpiError("error");
    }
  };

  useEffect(() => {
    setUpiError("");
    if (selectedPaymentMethod !== "cashOnDelivery")
      setPaymentMethodDetailsAdded(false);
  }, [selectedPaymentMethod]);

  const handleUseThisPaymentMethodClick = () => {
    setOrderDetails({
      ...orderDetails,
      paymentDetails: paymentMethodDetails,
    });
    handleOpenItem("place-order");
  };

  return (
    <div className="border border-selectBorder rounded-lg">
      <h3 className="text-xl font-medium text-defaultHeading m-3 mb-0 pb-1 border-b border-zinc-400">
        Payment methods
      </h3>
      <div className="px-6 py-4">
        <ul className="flex flex-col gap-2">
          {/* =================== debit credit card option ===================  */}
          <li className=" px-3 py-2 text-sm border text-defaultParagraph rounded-lg">
            <div className="flex gap-4 items-start">
              <input
                type="radio"
                className="mt-1 cursor-pointer"
                id="creditDebitCard"
                name="paymentOption"
                onChange={(e) => {
                  setSelectedPaymentMethod(e.target.id);
                }}
              />
              <div>
                <div className="flex">
                  <h3 className="pb-2 text-base font-medium text-defaultHeading">
                    Credit or Debit card
                  </h3>
                  {paymentMethodDetails?.method === "Credit or Debit card" && (
                    <span className="text-[#067d62] px-2">
                      <CheckCircleIcon
                        style={{ fontSize: "20px", marginTop: "2px" }}
                      />
                    </span>
                  )}
                </div>

                <div className="overflow-x-scroll">
                  <ListOfCards />
                </div>
              </div>
            </div>
            {/* =================== Card Details ===================  */}
            {selectedPaymentMethod === "creditDebitCard" &&
              !isPaymentMethodDetailsAdded && (
                <CardDetails
                  setPaymentMethodDetailsAdded={setPaymentMethodDetailsAdded}
                  setPaymentMethodDetails={setPaymentMethodDetails}
                  paymentMethodDetails={paymentMethodDetails}
                />
              )}
          </li>
          {/* =================== UPI option ===================  */}
          <li className="flex gap-4 items-start px-3 py-2 text-sm border text-defaultParagraph rounded-lg">
            <input
              type="radio"
              className="mt-1 cursor-pointer"
              id="UPI"
              name="paymentOption"
              onChange={(e) => {
                setSelectedPaymentMethod(e.target.id);
              }}
            />
            <div>
              <div className="flex">
                <h3 className="pb-2 text-base font-medium text-defaultHeading">
                  UPI ID
                </h3>
                {paymentMethodDetails?.method === "UPI" && (
                  <span className="text-[#067d62] px-2">
                    <CheckCircleIcon
                      style={{ fontSize: "20px", marginTop: "2px" }}
                    />
                  </span>
                )}
              </div>
              {selectedPaymentMethod === "UPI" &&
                !isPaymentMethodDetailsAdded && (
                  <div>
                    <label htmlFor="upiId">Please Enter your UPI ID</label>
                    <input
                      type="email"
                      className="block inputBox w-40"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                    {upiError === "error" && (
                      <div className="flex gap-1 pt-1 items-center text-xs text-error opacity-90 ">
                        <div>
                          <ErrorIcon style={{ fontSize: "22px" }} />
                        </div>
                        <p>Please enter a valid UPI ID</p>
                      </div>
                    )}
                    <button
                      onClick={handleUPIClick}
                      className="amazonButton w-max px-2 my-2 py-1"
                    >
                      Verify
                    </button>
                  </div>
                )}
            </div>
          </li>
          {/* =================== Cash on Delivery option ===================  */}
          <li className="flex gap-4 items-start px-3 py-2 text-sm border text-defaultParagraph rounded-lg">
            <input
              type="radio"
              className="mt-1 cursor-pointer"
              id="cashOnDelivery"
              name="paymentOption"
              onChange={(e) => {
                setPaymentMethodDetailsAdded(true);
                setSelectedPaymentMethod(e.target.id);
                setPaymentMethodDetails({
                  method: "Cash/Pay on Delivery",
                  details: "",
                });
              }}
            />
            <div>
              <div className="flex">
                <h3 className="pb-2 text-base font-medium text-defaultHeading">
                  Cash/Pay on Delivery
                </h3>
                {paymentMethodDetails?.method === "Cash/Pay on Delivery" && (
                  <span className="text-[#067d62] px-2">
                    <CheckCircleIcon
                      style={{ fontSize: "20px", marginTop: "2px" }}
                    />
                  </span>
                )}
              </div>
              <p>Cash, UPI and Cards accepted.</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="p-3 bg-gray-100 border-t border-selectBorder">
        <button
          disabled={!isPaymentMethodDetailsAdded}
          title="enter payment option details"
          onClick={handleUseThisPaymentMethodClick}
          className={`amazonButton ${
            isPaymentMethodDetailsAdded || "disabledAmazonButton"
          } w-max px-3`}
        >
          Use this payment method
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;
