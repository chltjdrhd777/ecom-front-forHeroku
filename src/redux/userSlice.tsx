import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios/axios";
import { UserBaseDocumentType } from "../../../server/src/model/UserModel";

//typeDef

export interface UserState {
  error: {
    success: boolean;
    errorInfo: any;
  };
  userData: /* UserBaseDocumentType */ any | undefined;
  loadingState: "ready" | "pending" | "finished" | "failed";
}

//async actions
export const loginFunc = createAsyncThunk("user/login", async (payload: { email: string; password: string }) => {
  try {
    const response = await axios.post("/auth/login", payload, { withCredentials: true });
    return response;
  } catch (err) {
    return err.response;
  }
});

export const userLogouts = createAsyncThunk("/users/logoutReqeust", async () => {
  try {
    const response = await axios.post("auth/logout", undefined, { withCredentials: true });
    return response;
  } catch (err) {
    return err.response;
  }
});

export const userRegisters = createAsyncThunk("users/registerRequest", async (payload: any) => {
  try {
    const response = await axios.post("/auth/register", { ...payload });
    return response;
  } catch (err) {
    return err.response;
  }
});

//structure
const user = createSlice({
  name: "user",

  initialState: { error: { success: false, errorInfo: undefined }, userData: undefined, loadingState: "ready" } as UserState,

  reducers: {
    loading: (state, { payload }) => {
      state.loadingState = payload;
    },
    login: (state, { payload }) => {
      state.userData = payload;
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(loginFunc.fulfilled, (state, { payload }) => {
      if (payload && payload.status === 400) {
        state.error = { success: false, errorInfo: payload };
      } else if (payload && payload.status === 200) {
        const { targetUser } = payload.data;
        state.error = { success: true, errorInfo: undefined };
        state.userData = targetUser;
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            role: targetUser.role,
            _id: targetUser._id,
            email: targetUser.email,
            token: targetUser.token,
          })
        );
      }
    });

    //logout
    builder.addCase(userLogouts.fulfilled, (state, { payload }) => {
      if (payload.status === 400) {
        console.log(payload);
      } else {
        state.userData = undefined;
        localStorage.removeItem("userInfo");
      }
    });
  },
});

export default user;

//export actions
export const { loading, login } = user.actions;
