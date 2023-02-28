import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ToastState {
  show: boolean;
  title: string;
  indicator: number; // this change when a showToast() is dispatched
}

const initialState: ToastState = {
  show: false,
  title: "",
  indicator: 0,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<string>) => {
      state.show = true;
      state.title = action.payload;
      ++state.indicator;
      state.indicator %= 10;
    },
    clearToast: (state) => {
      state.show = false;
      state.title = "";
    },
  },
});

export const { showToast, clearToast } = toastSlice.actions;
export const selectToast = (state: RootState) => state.toast;

export default toastSlice.reducer;
