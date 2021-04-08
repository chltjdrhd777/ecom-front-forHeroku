import { createSlice } from "@reduxjs/toolkit";

//typeDef

export interface ModalState {
  clicked: boolean;
  registerClicked: boolean;
  loading: "ready" | "pending" | "finished" | "failed";
}

//async actions

//structure
const modal = createSlice({
  name: "modal",

  initialState: { clicked: false, registerClicked: false, loading: "ready" } as ModalState,

  reducers: {
    loading: (state, { payload }) => {
      state.loading = payload;
    },
    onClicked: (state) => {
      state.clicked = !state.clicked;
    },
    onRegisterClicked: (state) => {
      state.registerClicked = !state.registerClicked;
    },
  },
  extraReducers: (builder) => {},
});

export default modal;

//export actions
export const { loading, onClicked, onRegisterClicked } = modal.actions;
