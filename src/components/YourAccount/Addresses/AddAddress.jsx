import { useEffect, useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import indianStates from "../../../constants/IndianAllStates";
import { addAddress } from "../../../redux/address/addressAction";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
const AddAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [userAddress, setUserAddress] = useState({
    country: "India",
    name: "",
    phone: "",
    pincode: "",
    houseNumber: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
  });
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  const [isAddressAdded, setAddressAdded] = useState(false);

  const [userAddressError, setUserAddressError] = useState({
    nameError: "",
    phoneError: "",
    pincodeError: "",
    houseNumberError: "",
    cityError: "",
    stateError: "",
  });

  const {
    country,
    name,
    phone,
    pincode,
    houseNumber,
    area,
    landmark,
    city,
    state,
  } = userAddress;

  useEffect(() => {
    if (pincode) {
      (async () => {
        try {
          const response = await fetch(
            `https://api.postalpincode.in/pincode/${pincode}`
          );
          const data = await response.json();

          if (data[0].Status === "Error") {
            throw new Error(data[0].Message);
          }
          setUserAddressError({
            ...userAddressError,
            pincodeError: "",
          });
          setUserAddress({
            ...userAddress,
            city: data[0].PostOffice[0].Block.toUpperCase(),
            state: data[0].PostOffice[0].Circle.toUpperCase(),
          });
        } catch (errorMessage) {
          setUserAddressError({
            ...userAddressError,
            pincodeError: "Please enter a valid ZIP or postal code.",
          });
          console.log(errorMessage);
        }
      })();
    }
  }, [pincode]);

  useEffect(() => {
    if (isAddressAdded) {
      setTimeout(() => {
        setAddressAdded(false);
        navigate(location.state?.originPath || "/youraccount/addresses");
      }, 1000);
    }
  }, [isAddressAdded]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "phone" && !/^(?!0)[0-9]*$/.test(value)) return;

    if (id === "pincode" && !/^(?!0)[0-9]*$/.test(value)) return;

    setUserAddress({ ...userAddress, [id]: value });
  };

  const handleAddAddressClick = () => {
    const errors = {
      nameError: name ? "" : "Please enter a name",
      phoneError: phone
        ? phone.length === 10
          ? ""
          : "Phone number should be of 10 digits"
        : "Please enter a phone number so we can call if there are any issues with delivery.",
      pincodeError: pincode ? "" : "Please enter a ZIP or postal code.",
      houseNumberError: houseNumber ? "" : "Please enter an address.",
      cityError: city ? "" : "Please enter a city name.",
      stateError: state ? "" : "Please enter a state, region or province.",
    };

    if (
      errors.nameError ||
      errors.phoneError ||
      errors.pincodeError ||
      errors.houseNumberError ||
      errors.cityError ||
      errors.stateError
    ) {
      setUserAddressError(errors);
      return;
    }
    setUserAddressError(errors);

    dispatch(addAddress({ address: userAddress, isDefaultAddress }));

    setAddressAdded(true);
  };

  return (
    <div
      name="add-new-address"
      className="w-full text-defaultParagraph flex flex-col items-center"
    >
      {isAddressAdded && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`fixed bottom-4 right-4 p-4 bg-green-500 rounded shadow-lg`}
        >
          Address saved!
        </motion.div>
      )}
      <div className="">
        <h2 className="text-2xl font-bold text-defaultHeading py-4">
          Add a new address
        </h2>

        <form
          action=""
          onSubmit={(e) => e.preventDefault()}
          onChange={handleInputChange}
          className="flex flex-col gap-4 text-sm leading-6 font-medium"
        >
          <div className="flex-1">
            <label htmlFor="country">Country/Region</label>
            <select
              name="country"
              id="country"
              className="block selectItem w-full"
              value={country}
            >
              <option value="india">India</option>
            </select>
          </div>

          <div>
            <label htmlFor="name">Full name (First and Last name)</label>
            <input id="name" type="text" value={name} className="inputBox" />
            {userAddressError.nameError && (
              <div className="flex gap-1 pt-1 items-center text-xs text-error opacity-90 ">
                <div>
                  <ErrorIcon style={{ fontSize: "22px" }} />
                </div>
                <p>{userAddressError.nameError}</p>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="phone">Mobile number</label>
            <input
              id="phone"
              type="tle"
              value={phone}
              maxLength={10}
              placeholder="Enter 10 digits mobile number"
              className="inputBox"
            />
            <label htmlFor="phone" className="text-xs font-normal">
              May be used to assist delivery
            </label>
            {userAddressError.phoneError && (
              <div className="flex gap-1 items-center text-xs text-error opacity-90 ">
                <div>
                  <ErrorIcon style={{ fontSize: "22px" }} />
                </div>
                <p>{userAddressError.phoneError}</p>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="pincode">Pincode</label>
            <input
              type="text"
              id="pincode"
              maxLength={6}
              value={pincode}
              placeholder="6 digits [0-9] PIN code"
              className="inputBox"
            />
            {userAddressError.pincodeError && (
              <div className="flex gap-1 pt-1 items-center text-xs text-error opacity-90 ">
                <div>
                  <ErrorIcon style={{ fontSize: "22px" }} />
                </div>
                <p>{userAddressError.pincodeError}</p>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="houseNumber">
              Flat, House no., Building, Company, Apartment
            </label>
            <input
              id="houseNumber"
              type="text"
              value={houseNumber}
              className="inputBox"
            />
            {userAddressError.houseNumberError && (
              <div className="flex gap-1 pt-1 items-center text-xs text-error opacity-90">
                <div>
                  <ErrorIcon style={{ fontSize: "22px" }} />
                </div>
                <p>{userAddressError.houseNumberError}</p>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="area">Area, Street, Sector, Village</label>
            <input id="area" type="text" value={area} className="inputBox" />
          </div>

          <div>
            <label htmlFor="landmark">Landmark</label>
            <input
              id="landmark"
              placeholder="E.g. near apollo hospital"
              type="text"
              value={landmark}
              className="inputBox"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label htmlFor="city">Town/City</label>
              <input id="city" type="text" value={city} className="inputBox" />
              {userAddressError.cityError && (
                <div className="flex gap-1 pt-1 items-center text-xs text-error opacity-90 ">
                  <div>
                    <ErrorIcon style={{ fontSize: "22px" }} />
                  </div>
                  <p>{userAddressError.cityError}</p>
                </div>
              )}
            </div>

            <div className="flex-1">
              <label htmlFor="state">State</label>
              <select
                name="state"
                id="state"
                className="block selectItem w-full"
                value={state}
              >
                {!state && (
                  <option value="choose a state">Choose a state</option>
                )}
                {indianStates.map((state) => (
                  <option
                    key={state.code}
                    value={state.name}
                    className="bg-white hover:bg-hover_blue hover:text-white text-sm"
                  >
                    {state.name}
                  </option>
                ))}
              </select>
              {userAddressError.stateError && (
                <div className="flex gap-1 pt-1 items-center text-xs text-error opacity-90 ">
                  <div>
                    <ErrorIcon style={{ fontSize: "22px" }} />
                  </div>
                  <p>{userAddressError.stateError}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="defaultAddress"
              type="checkbox"
              checked={isDefaultAddress}
              onChange={(e) => {
                e.stopPropagation();
                setIsDefaultAddress(!isDefaultAddress);
              }}
            />
            <label htmlFor="defaultAddress">Make this my default address</label>
          </div>

          <div>
            <button
              id="addAddress"
              type="submit"
              onClick={handleAddAddressClick}
              className="amazonButton w-max px-3 py-1"
            >
              Add address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
