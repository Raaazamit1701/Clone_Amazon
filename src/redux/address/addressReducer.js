const userInitialAddress = {
  userAddresses: [],
  defaultAddress: {},
};

const addressReducer = (state = userInitialAddress, action) => {
  switch (action.type) {
    case "add_address":
      return {
        userAddresses: [...state.userAddresses, action.payload.address],
        defaultAddress: action.payload.isDefaultAddress
          ? {
              id: state.userAddresses.length,
              address: action.payload.address,
            }
          : state.defaultAddress,
      };
    case "remove_address": {
      const filteredAddresses = state.userAddresses.filter(
        (address, index) => action.payload.addressIndex !== index
      );
      const defaultAddress =
        state.defaultAddress?.id === action.payload.addressIndex
          ? {}
          : state.defaultAddress?.id > action.payload.addressIndex // we should decrease the defaultAddress index by one because if we remove anything from addresses array that has addressIndex < defaultAddress index than all addresses index decrease by one
          ? {
              id: state.defaultAddress?.id - 1,
              address: { ...state.defaultAddress?.address },
            }
          : state.defaultAddress;
      return { userAddresses: [...filteredAddresses], defaultAddress };
    }
    case "set_as_default": {
      const defaultAddressData = state.userAddresses.find(
        (address, index) => index === action.payload.addressIndex
      );
      return {
        userAddresses: [...state.userAddresses],
        defaultAddress: {
          id: action.payload.addressIndex,
          address: defaultAddressData,
        },
      };
    }
    case "edit_address": {
      return state;
    }
    case "reset_addresses": {
      return (state = userInitialAddress);
    }
    default:
      return state;
  }
};

export default addressReducer;
