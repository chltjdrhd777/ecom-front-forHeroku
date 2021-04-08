import { createSlice, createAsyncThunk, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import axios from "../axios/axios";
import { NativeError } from "mongoose";
import { AxiosResponse } from "axios";

//typeDef

export interface AddressState {
  loading: "ready" | "pending" | "finished" | "failed";
  error: {
    success: boolean;
    errorInfo: NativeError | undefined;
  };
  userAddress: any /* UserAddress_DocumentType */;
}

export interface Received_addressInfo {
  userAddress: any /* UserAddress_DocumentType */;
}

//async actions
export const getAddressFunc = createAsyncThunk<AxiosResponse<NativeError | Received_addressInfo>>("addres/getAddress", async () => {
  try {
    const response = await axios.get("/address/getAddress", { withCredentials: true });
    return response;
  } catch (err) {
    return err.response;
  }
});

export const addAddressFunc = createAsyncThunk<
  AxiosResponse<NativeError | Received_addressInfo>,
  { addressInfoToServer: Partial<any /* Address_DocumentType */> }
>("addres/addAddress", async (body) => {
  try {
    const response = await axios.post("/address/addAddress", body, { withCredentials: true });
    return response;
  } catch (err) {
    return err.response;
  }
});

export const deleteAddressFunc = createAsyncThunk("address/deleteAddress", async (payload: number) => {
  try {
    const response = await axios.post("/address/deleteAddreess", { _id: payload }, { withCredentials: true });
    console.log(response);
  } catch (err) {
    return err.response;
  }
});

//structure
const address = createSlice({
  name: "address",

  initialState: { loading: "ready", error: { success: false, errorInfo: undefined }, userAddress: {} } as AddressState,

  reducers: {
    loading: (state, { payload }: PayloadAction<AddressState["loading"]>) => {
      state.loading = payload;
    },
  },
  extraReducers: (builder) => {
    //! get Address
    builder.addCase(getAddressFunc.fulfilled, (state, { payload }) => {
      if (payload && payload.status === 400) {
        state.error = { success: false, errorInfo: payload.data as NativeError };
      } else if (payload && payload.status === 200) {
        const { userAddress } = payload.data as Received_addressInfo;

        state.userAddress = userAddress;
      }
    });

    //! add Address
    builder.addCase(addAddressFunc.fulfilled, (state, { payload }) => {
      if (payload && payload.status === 400) {
        state.error = { success: false, errorInfo: payload.data as NativeError };
      } else if (payload && payload.status === 201) {
        const { userAddress } = payload.data as Received_addressInfo;
        state.userAddress = userAddress;
      }
    });
  },
});

export default address;

//export actions
export const {} = address.actions;
