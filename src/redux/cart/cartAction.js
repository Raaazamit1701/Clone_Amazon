export const addProduct = (payload) => {
  return {
    type: "add_product",
    payload,
  };
};

export const deleteProduct = (payload) => {
  return {
    type: "delete_product",
    payload,
  };
};

export const updateQuantity = (payload) => {
  return {
    type: "update_quantity",
    payload,
  };
};
