/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
// eslint-disable-next-line react/prop-types
const CardDetails = ({
  setPaymentMethodDetailsAdded,
  setPaymentMethodDetails,
  paymentMethodDetails,
}) => {
  const years = new Array(20).fill(0);
  const months = new Array(12).fill(0);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  console.log(currentMonth);

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiryMonth: currentMonth,
    expiryYear: currentYear,
  });

  const [cardDetailsErrors, setCardDetailsErrors] = useState({
    cardNumberError: "",
    nameOnCardError: "",
    cardExpiryError: "",
  });

  useEffect(() => {
    setCardDetails({
      cardNumber: paymentMethodDetails.details.cardNumber || "",
      nameOnCard: paymentMethodDetails.details.nameOnCard || "",
      expiryMonth: paymentMethodDetails.details.expiryMonth || currentMonth,
      expiryYear: paymentMethodDetails.details.expiryYear || currentYear,
    });
  }, []);

  const handleCardDetailsChange = (e) => {
    const { id, value } = e.target;
    if (id === "cardNumber" && !/^(?!0)[0-9]*$/.test(value)) return;
    setCardDetails({ ...cardDetails, [id]: value });
  };

  const handleCardDetailsClick = (e) => {
    e.preventDefault();

    const errors = {
      cardNumberError: cardDetails.cardNumber
        ? cardDetails.cardNumber.length > 11
          ? ""
          : "Enter a valid card number"
        : "Enter your card number",
      nameOnCardError: cardDetails.nameOnCard ? "" : "Enter name on card",
      cardExpiryError:
        Number(cardDetails.expiryMonth) < currentMonth &&
        Number(cardDetails.expiryYear) <= currentYear
          ? "Your card has expired"
          : "",
    };

    if (
      errors.cardNumberError ||
      errors.nameOnCardError ||
      errors.cardExpiryError
    ) {
      setCardDetailsErrors({ ...errors });
      return;
    }

    setCardDetailsErrors({ ...errors });
    setPaymentMethodDetailsAdded(true);
    setPaymentMethodDetails({
      method: "Credit or Debit card",
      details: cardDetails,
    });
  };

  return (
    <div className="mx-6 my-4 p-4 border border-selectBorder rounded-lg">
      <label
        htmlFor="cardDetails"
        className="font-medium text-base text-defaultParagraph"
      >
        Enter card details
      </label>
      <form
        action=""
        id="cardDetails"
        className="px-2 flex flex-col gap-2 py-2 font-medium"
      >
        <label htmlFor="cardNumber">Card number</label>
        <input
          type="text"
          id="cardNumber"
          className=" inputBox w-40"
          onChange={handleCardDetailsChange}
          maxLength={20}
          value={cardDetails.cardNumber}
        />
        {cardDetailsErrors.cardNumberError && (
          <div className="flex gap-1 pt-1 items-center text-xs text-error opacity-90 ">
            <div>
              <ErrorIcon style={{ fontSize: "22px" }} />
            </div>
            <p>{cardDetailsErrors.cardNumberError}</p>
          </div>
        )}

        <label htmlFor="cardNumber" className="">
          Name on card
        </label>
        <input
          type="text"
          className="inputBox w-40"
          id="nameOnCard"
          onChange={handleCardDetailsChange}
          value={cardDetails.nameOnCard}
        />
        {cardDetailsErrors.nameOnCardError && (
          <div className="flex gap-1 pt-1 items-center text-xs text-error opacity-90 ">
            <div>
              <ErrorIcon style={{ fontSize: "22px" }} />
            </div>
            <p>{cardDetailsErrors.nameOnCardError}</p>
          </div>
        )}

        <label htmlFor="expiryDate">Expiry date</label>
        <div>
          <select
            name=""
            id="expiryMonth"
            className="selectItem mr-2"
            onChange={handleCardDetailsChange}
            value={cardDetails.expiryMonth}
          >
            {months.map((month, index) => (
              <option key={index + 1} value={index + 1}>
                {index < 9 ? `0${index + 1}` : index + 1}
              </option>
            ))}
          </select>
          <select
            name=""
            id="expiryYear"
            className="selectItem "
            onChange={handleCardDetailsChange}
            value={cardDetails.expiryYear}
          >
            {years.map((year, index) => (
              <option key={currentYear + index} value={currentYear + index}>
                {currentYear + index}
              </option>
            ))}
          </select>
          {cardDetailsErrors.cardExpiryError && (
            <div className="flex gap-1 pt-1 items-center text-xs text-error opacity-90 ">
              <div>
                <ErrorIcon style={{ fontSize: "22px" }} />
              </div>
              <p>{cardDetailsErrors.cardExpiryError}</p>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="amazonButton w-max px-3 py-1 my-2"
          onClick={handleCardDetailsClick}
        >
          Enter card details
        </button>
      </form>
    </div>
  );
};

export default CardDetails;
