import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Search } from "@mui/icons-material";
// eslint-disable-next-line react/prop-types
function ListOfAddresses({ closeModal, setSelectedAddress }) {
  const addressDetails = useSelector((state) => state.addressDetails);

  const defaultAddressData = addressDetails.defaultAddress;

  const handleModalItemClick = (e, index) => {
    e.stopPropagation();
    setSelectedAddress(addressDetails.userAddresses[index]);
    closeModal();
  };

  return (
    <div>
      <h2 className="font-bold text-defaultHeading px-6 py-3 bg-selectBackground border border-selectBorder">
        Choose your location
      </h2>
      <div className="px-6 py-3 grid gap-2">
        <p className="text-xs text-littleDarkGray">
          Select a delivery location to see product availability and delivery
          options
        </p>
        {addressDetails.userAddresses.length ? (
          <ul>
            {defaultAddressData.address && (
              <li
                data-id={defaultAddressData.id}
                key={defaultAddressData.id}
                onClick={(e) => handleModalItemClick(e, defaultAddressData.id)}
                className="px-3 py-2 text-sm border border-littleDarkGray text-defaultParagraph rounded-lg cursor-pointer hover:bg-slate-50"
              >
                <p className="">
                  <span className="font-medium">
                    {defaultAddressData.address.name}{" "}
                  </span>
                  {defaultAddressData.address.houseNumber}{" "}
                  {defaultAddressData.address.area}
                  {", "}
                  {defaultAddressData.address.city}{" "}
                  {defaultAddressData.address.state}{" "}
                  {defaultAddressData.address.pincode}
                </p>
                <p className="font-medium text-lightGray py-1">
                  Default address
                </p>
              </li>
            )}
            {addressDetails.userAddresses.map((address, index) => {
              if (index === addressDetails.defaultAddress?.id) {
                return;
              }

              return (
                <li
                  data-id={index}
                  key={index}
                  onClick={(e) => handleModalItemClick(e, index)}
                  className="px-3 py-2 text-sm border border-littleDarkGray text-defaultParagraph rounded-lg cursor-pointer hover:bg-slate-50"
                >
                  <p className="">
                    <span className="font-medium">{address.name} </span>
                    {address.houseNumber} {address.area}
                    {", "}
                    {address.city} {address.state} {address.pincode}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className=" text-sm text-[#bbb] mx-auto border border-amazonBorder pl-2 pr-3 py-1 rounded-2xl">
            <span className="pr-1">
              <Search />
            </span>
            Address not found
          </p>
        )}
        <NavLink
          onClick={closeModal}
          to="/youraccount/addresses/add_address"
          className="navigateButtonLinks text-sm"
        >
          Add an address or pick-up point
        </NavLink>
      </div>
    </div>
  );
}

export default ListOfAddresses;
