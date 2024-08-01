import { useSelector } from "react-redux";
import { Search } from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorIcon from "@mui/icons-material/Error";
// eslint-disable-next-line react/prop-types
const SelectAddress = ({ setOrderDetails, handleOpenItem, orderDetails }) => {
  const [selectedAddress, setSelectedAddress] = useState({});
  const addressDetails = useSelector((state) => state.addressDetails);
  const location = useLocation();
  const defaultAddressData = addressDetails.defaultAddress;

  const [isAddressSelectedError, setAddressSelectedError] = useState(false);

  useEffect(() => {
    setSelectedAddress(
      addressDetails.defaultAddress?.id
        ? {
            address: addressDetails.defaultAddress?.address,
            index: addressDetails.defaultAddress?.id,
          }
        : addressDetails.userAddresses.length
        ? { address: addressDetails.userAddresses[0], index: 0 }
        : {}
    );
  }, [addressDetails]);

  const handleSelectAddressChange = (e, index) => {
    e.stopPropagation();

    setSelectedAddress({ index, address: addressDetails.userAddresses[index] });
  };

  const handleUseThisAddressClick = () => {
    if (!selectedAddress?.address) {
      setAddressSelectedError(true);
      return;
    }
    setAddressSelectedError(false);
    setOrderDetails({ ...orderDetails, deliveryAddress: selectedAddress });
    handleOpenItem("payment-methods");
  };

  return (
    <div className="border border-selectBorder rounded-lg">
      <h3 className="text-xl font-medium text-defaultHeading m-3 mb-0 pb-1 border-b border-zinc-400">
        Your addresses
      </h3>
      <div className="px-6 py-4">
        {addressDetails.userAddresses.length ? (
          <ul className="flex flex-col gap-2">
            {defaultAddressData.address && (
              <li className="flex gap-1 items-start px-3 py-2 text-sm border text-defaultParagraph rounded-lg">
                <input
                  name="selectAddressBtn"
                  type="radio"
                  id={defaultAddressData.id}
                  className="mt-1 cursor-pointer"
                  onChange={(e) => {
                    handleSelectAddressChange(e, defaultAddressData.id);
                  }}
                  checked={selectedAddress?.index === defaultAddressData?.id}
                />
                <p className="">
                  <span className="font-medium">
                    {defaultAddressData.address.name}{" "}
                  </span>

                  {`${defaultAddressData.address.houseNumber}, ${
                    defaultAddressData.address.area
                  }, ${defaultAddressData.address.city.toUpperCase()}, ${defaultAddressData.address.state.toUpperCase()}, ${
                    defaultAddressData.address.pincode
                  }, ${defaultAddressData.address.country}, Phone number: ${
                    defaultAddressData.address.phone
                  }`}
                </p>
              </li>
            )}
            {addressDetails.userAddresses.map((address, index) => {
              if (index === defaultAddressData.id) return;

              return (
                <li
                  key={index}
                  className="flex gap-1 items-start px-3 py-2 text-sm border text-defaultParagraph rounded-lg"
                >
                  <input
                    name="selectAddressBtn"
                    type="radio"
                    id={index}
                    onChange={(e) => handleSelectAddressChange(e, index)}
                    className="mt-1 cursor-pointer"
                    checked={selectedAddress?.index === index}
                  />
                  <p className="">
                    <span className="font-medium">{address.name} </span>
                    {`${address.houseNumber}, ${
                      address.area
                    }, ${address.city.toUpperCase()}, ${address.state.toUpperCase()}, ${
                      address.pincode
                    }, ${address.country}, Phone number: ${address.phone}`}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="my-4 text-sm text-[#bbb] mx-auto border border-amazonBorder pl-2 pr-3 py-1 rounded-2xl">
            <span className="pr-1">
              <Search />
            </span>
            Address not found
          </p>
        )}
        <div className="flex items-end gap-1 py-4">
          <span className=" text-3xl text-lightText leading-6">+</span>
          <NavLink
            to="/youraccount/addresses/add_address"
            state={{ originPath: location.pathname }}
          >
            <p className="navigateButtonLinks text-sm leading-4 font-medium">
              Add a new address
            </p>
          </NavLink>
        </div>
      </div>

      <div className="p-3 bg-gray-100 border-t border-selectBorder">
        <button
          onClick={handleUseThisAddressClick}
          className="amazonButton w-max px-3"
        >
          Use this address
        </button>
        {isAddressSelectedError && (
          <div className="flex gap-1 pt-1 items-center text-xs text-error opacity-90 ">
            <div>
              <ErrorIcon style={{ fontSize: "20px" }} />
            </div>
            <p>Please add a delivery address</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default SelectAddress;
