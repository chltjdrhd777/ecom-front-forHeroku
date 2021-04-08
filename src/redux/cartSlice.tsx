import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//typeDef
export interface CartItemData {
  _id: string;
  name: string;
  img: string;
  price: string;
  quantity: number;
}

export interface CartState {
  cartItems: {
    [key: string]: CartItemData;
  };
  loading: "ready" | "pending" | "finished" | "failed";
}

//async actions

//structure
const cart = createSlice({
  name: "cart",

  initialState: { loading: "ready", cartItems: {} } as CartState,

  reducers: {
    loading: (state, { payload }: PayloadAction<CartState["loading"]>) => {
      state.loading = payload;
    },

    addToCart: (state, { payload }: PayloadAction<CartItemData>) => {
      const { cartItems } = state;

      if (cartItems[payload._id]) {
        cartItems[payload._id].quantity += 1;
      } else {
        state.cartItems[payload._id] = payload;
      }

      const getLocalCart = JSON.parse(localStorage.getItem("cart")!);

      if (getLocalCart && getLocalCart[payload._id]) {
        const update = JSON.stringify({
          ...getLocalCart,
          [payload._id]: { ...getLocalCart[payload._id], quantity: getLocalCart[payload._id].quantity + 1 },
        });
        localStorage.setItem("cart", update);
      } else {
        const addCartData = JSON.stringify({ ...getLocalCart, [payload._id]: payload });
        localStorage.setItem("cart", addCartData);
      }
    },

    refreshCart: (state, { payload }) => {
      state.cartItems = payload;
    },

    incQuantity: (state, { payload }: PayloadAction<{ _id: string }>) => {
      let cartData = JSON.parse(localStorage.getItem("cart")!);

      cartData[payload._id].quantity += 1;

      /*       const updateTargetQuantityOnly = {...cartData,[payload._id]:{...cartData[payload._id],quantity:cartData[payload._id].quantity + 1}}; */
      localStorage.setItem("cart", JSON.stringify(cartData));
    },
    decQuantity: (state, { payload }: PayloadAction<{ _id: string }>) => {
      let cartData = JSON.parse(localStorage.getItem("cart")!);

      if (cartData && cartData[payload._id].quantity > 1) {
        cartData[payload._id].quantity -= 1;
      }

      localStorage.setItem("cart", JSON.stringify(cartData));
    },
  },
  extraReducers: (builder) => {},
});

export default cart;

//export actions
export const { loading, addToCart, refreshCart, incQuantity, decQuantity } = cart.actions;
