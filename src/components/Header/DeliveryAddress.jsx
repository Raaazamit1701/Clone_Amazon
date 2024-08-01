import { useDisclosure } from "@mantine/hooks";
import { Modal, Group } from "@mantine/core";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ListOfAddresses from "../ListOfAddresses/ListOfAddresses";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DeliveryAddress = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const addressDetails = useSelector((state) => state.addressDetails);
  const [selectedAddress, setSelectedAddress] = useState({});
  useEffect(() => {
    setSelectedAddress(
      addressDetails.defaultAddress?.address ||
        addressDetails.userAddresses[0] ||
        {}
    );
  }, [addressDetails]);

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        size={360}
        withCloseButton={false}
        padding={0}
        radius={10}
      >
        <ListOfAddresses
          closeModal={close}
          setSelectedAddress={setSelectedAddress}
        />
      </Modal>

      <Group>
        <section onClick={open} className="headerHover">
          <span>
            <PlaceOutlinedIcon style={{ fontSize: "20px", marginTop: "8px" }} />
          </span>

          <div>
            <p className=" text-xs leading-3 text-lightText">
              {selectedAddress.name
                ? `Deliver to ${selectedAddress.name.split(" ")[0]}`
                : "Hello User"}
            </p>
            <p className=" text-sm font-bold">
              {selectedAddress.city
                ? `${
                    selectedAddress.city.charAt(0).toUpperCase() +
                    selectedAddress.city.slice(1).toLowerCase()
                  }, ${selectedAddress.pincode}`
                : "Select your address"}
            </p>
          </div>
        </section>
      </Group>
    </div>
  );
};

export default DeliveryAddress;
