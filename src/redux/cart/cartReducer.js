const cartInitialState = {
  products: [],
  productsCount: 0,
};

//data structure for add to cart product
// const cartInitialState = {
//   item: [
//     {
//         product:{
//             id: 1,
//             title: "",
//             price: 109.95,
//             description: "",
//             image: "",
//             rating: {
//                 rate: 3.9,
//                 count: 120,
//             },
//         },
//         quantity:1
//     },
//   ],
//   productsCount: 0,
// };

const cartReducer = (state = cartInitialState, action) => {
  switch (action.type) {
    case "add_product":
      return {
        products: [
          ...state.products,
          { product: action.payload.product, quantity: 1 },
        ],
        productsCount: state.productsCount + 1,
      };

    case "delete_product": {
      let quantityToBeSubtract;
      const filteredProducts = state.products.filter((item) => {
        if (item.product.id !== action.payload.id) return true;
        else {
          quantityToBeSubtract = item.quantity;
          return false;
        }
      });
      return {
        products: filteredProducts,
        productsCount: state.productsCount - quantityToBeSubtract,
      };
    }

    case "update_quantity": {
      const productIdToUpdate = action.payload.id;
      const updatedProducts = state.products.map((item) => {
        if (productIdToUpdate === item.product.id) {
          return {
            product: { ...item.product },
            quantity: Math.abs(item.quantity + action.payload.quantity),
          };
        }
        return item;
      });
      return {
        products: updatedProducts,
        productsCount: Math.abs(
          (state.productsCount += action.payload.quantity)
        ),
      };
    }

    case "reset_cart": {
      return { products: [], productsCount: 0 };
    }
    default:
      return state;
  }
};

export default cartReducer;
