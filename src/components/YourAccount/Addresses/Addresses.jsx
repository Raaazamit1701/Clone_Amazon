import AddIcon from "@mui/icons-material/Add";
import { logoDark } from "../../../assets/images";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  removeAddress,
  setAsDefault,
  // editAddress,
} from "../../../redux/address/addressAction";

import { motion } from "framer-motion";

const Addresses = () => {
  const addressDetails = useSelector((state) => state.addressDetails);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [addressOperationSuccessMessage, setAddressOperationSuccessMessage] =
    useState("");
  useState(false);

  const defaultAddressDetails = addressDetails.defaultAddress;

  useEffect(() => {
    if (addressOperationSuccessMessage) {
      setTimeout(() => {
        setAddressOperationSuccessMessage("");
      }, 1000);
    }
  }, [addressOperationSuccessMessage]);

  const handleAddressClick = (e) => {
    e.stopPropagation();
    const { id } = e.target;
    const addressIndex = e.currentTarget.id;

    if (id === "removeAddress") {
      dispatch(removeAddress({ addressIndex: Number(addressIndex) }));
      setAddressOperationSuccessMessage("Address removed!");
      return;
    }
    if (id === "setAsDefault") {
      dispatch(setAsDefault({ addressIndex: Number(addressIndex) }));
      setAddressOperationSuccessMessage("Default address changed!");
      return;
    }
  };

  return (
    <div name="your-addresses">
      {addressOperationSuccessMessage && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`fixed bottom-4 right-4 p-4 bg-green-500 rounded shadow-lg`}
        >
          {addressOperationSuccessMessage}
        </motion.div>
      )}
      <h2 className="text-3xl font-medium  text-defaultHeading py-4">
        Your Addresses
      </h2>
      <div className="grid md:grid-cols-2 mdl:grid-cols-3 gap-4 auto-rows-[250px]">
        <div
          name="add_new_address"
          ////////////////////////////////////////////////////////////////
          onClick={() =>
            navigate("add_address", {
              state: { originPath: location.pathname },
            })
          }
          className="flex flex-col items-center justify-center border-2 border-dashed border-[#ccc] rounded-xl cursor-pointer"
        >
          <AddIcon
            style={{ fontSize: "64px", color: "#ccc", marginRight: "16px" }}
          />
          <h2 className="text-2xl mb-4 leading-6 font-bold text-lightGray">
            Add address
          </h2>
        </div>
        {defaultAddressDetails?.address && (
          <div
            id={defaultAddressDetails.id}
            onClick={handleAddressClick}
            className="text-sm border border-lightText rounded-lg shadow-md"
          >
            <div className="flex px-4 py-2 border-lightText border-b-[1px]">
              <h4 className="font-medium  text-lightGray">Default: </h4>
              <img src={logoDark} alt="website-logo" className="w-14" />
            </div>
            <div className="px-5 py-[10px]">
              <h4 className="font-medium">
                {defaultAddressDetails.address.name}
              </h4>
              <p>{defaultAddressDetails.address.houseNumber}</p>
              <p>
                {defaultAddressDetails.address.area}{" "}
                {defaultAddressDetails.address.landmark &&
                  `(${defaultAddressDetails.address.landmark})`}
              </p>
              <p>
                {defaultAddressDetails.address.city},{" "}
                {defaultAddressDetails.address.state}{" "}
                {defaultAddressDetails.address.pincode}
              </p>
              <p>{defaultAddressDetails.address.country}</p>
              <p>Phone number: {defaultAddressDetails.address.phone}</p>
            </div>
            <div className="mt-8 pl-5">
              <button
                id="editAddress"
                className="text-link text-sm font-medium tracking-wide cursor-pointer hover:underline duration-150 pr-4  border-lightGray hover:text-orange-700"
              >
                Edit
              </button>
              <button
                id="removeAddress"
                className="text-link text-sm font-medium tracking-wide cursor-pointer hover:underline duration-150 px-4 border-l border-lightGray hover:text-orange-700"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        {addressDetails.userAddresses?.map((address, index) => {
          if (index === Number(defaultAddressDetails?.id)) return;
          return (
            <div
              key={index}
              id={index}
              onClick={handleAddressClick}
              className="text-sm border border-lightText rounded-lg shadow-md"
            >
              <div className="px-5 pt-5 pb-10">
                <h4 className="font-medium">{address.name}</h4>
                <p>{address.houseNumber}</p>
                <p>
                  {address.area} {address.landmark && `(${address.landmark})`}
                </p>
                <p>
                  {address.city}, {address.state} {address.pincode}
                </p>
                <p>{address.country}</p>
                <p>Phone number: {address.phone}</p>
              </div>
              <div className="mt-8 pl-5">
                <button
                  id="editAddress"
                  className="text-link text-sm font-medium tracking-wide cursor-pointer hover:underline duration-150 pr-4  border-lightGray hover:text-orange-700"
                >
                  Edit
                </button>
                <button
                  id="removeAddress"
                  className="text-link text-sm font-medium tracking-wide cursor-pointer hover:underline duration-150 px-4 border-l border-lightGray hover:text-orange-700"
                >
                  Remove
                </button>
                <button
                  id="setAsDefault"
                  className="text-link text-sm font-medium tracking-wide cursor-pointer hover:underline duration-150 px-4 border-l border-lightGray hover:text-orange-700"
                >
                  Set as Default
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Addresses;
