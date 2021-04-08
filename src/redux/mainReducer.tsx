import cart from "./cartSlice";
import category from "./categorySlice";
import modal from "./modalSlice";
import product from "./productslice";
import address from "./addressSlice";
import { RootState } from "./store";
import user from "./userSlice";
import checkout from "./checkoutList";
export const mainReducer = {
  category: category.reducer,
  product: product.reducer,
  modal: modal.reducer,
  user: user.reducer,
  cart: cart.reducer,
  address: address.reducer,
  checkList: checkout.reducer,
};

export const selectCategory = (state: RootState) => {
  return state.category;
};

export const selectProduct = (state: RootState) => {
  return state.product;
};

export const selectModalInfo = (state: RootState) => {
  return state.modal;
};

export const selectUser = (state: RootState) => {
  return state.user;
};

export const selectCart = (state: RootState) => {
  return state.cart;
};

export const selectAddress = (state: RootState) => {
  return state.address;
};

export const selectCheckout = (state: RootState) => {
  return state.checkList;
};
