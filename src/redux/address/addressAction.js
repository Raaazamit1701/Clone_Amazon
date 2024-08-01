export const addAddress = (payload) => {
  return { type: "add_address", payload };
};
export const removeAddress = (payload) => {
  return { type: "remove_address", payload };
};
export const setAsDefault = (payload) => {
  return { type: "set_as_default", payload };
};
export const editAddress = (payload) => {
  return { type: "edit_address", payload };
};
