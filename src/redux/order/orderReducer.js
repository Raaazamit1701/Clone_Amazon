const initialOrdersState = {
  orders: [],
};

const orderReducer = (state = initialOrdersState, action) => {
  switch (action.type) {
    case "place_order":
      return { orders: [action.payload, ...state.orders] };
    default:
      return state;
  }
};
export default orderReducer;
