import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Address_DocumentType_forFront } from "../../../server/src/model/address";

//typeDef

interface SelectedAddressInfoProps /*  extends Address_DocumentType_forFront */ {
  [key: string]: string | number | undefined | boolean;
}

export interface CheckoutListState {
  checkoutList: { processCheck: boolean[]; selectedAddressInfo: SelectedAddressInfoProps; userConfirm: boolean };
  loading: "ready" | "pending" | "finished" | "failed";
  error: {
    success: boolean;
    errorInfo: any;
  };
}

//async actions
export const getAllCategories = createAsyncThunk("category/getCategories", async () => {});

//structure
const checkout = createSlice({
  name: "checkout_list",

  initialState: {
    checkoutList: { processCheck: [false, false, false, false], userConfirm: false },
    loading: "ready",
    error: { success: false, errorInfo: undefined },
  } as CheckoutListState,

  reducers: {
    checkoutLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setProcessCheck: (state, { payload }: PayloadAction<boolean[]>) => {
      state.checkoutList.processCheck = payload;
    },
    setSelectedAddress: (state, { payload }) => {
      state.checkoutList.selectedAddressInfo = payload;
    },
    setUserConfirm: (state, { payload }) => {
      state.checkoutList.userConfirm = payload;
    },
  },

  extraReducers: (builder) => {},
});

export default checkout;

//export actions
export const { checkoutLoading, setProcessCheck, setSelectedAddress, setUserConfirm } = checkout.actions;
