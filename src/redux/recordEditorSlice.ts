import { Record } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface RecordEditorState {
  og?: Record;
  reset: boolean;
}

const initialState: RecordEditorState = {
  reset: false,
};

export const recordEditorSlice = createSlice({
  name: "recordEditor",
  initialState,
  reducers: {
    edit: (state, action: PayloadAction<Record>) => {
      state.og = action.payload;
    },
    // clean up when leaving edit page
    clearEdit: (state) => {
      state.og = undefined;
    },
    // use for resetting cat when a record is created or updated
    markReset: (state) => {
      state.reset = true;
    },
    markOutReset: (state) => {
      state.reset = false;
    },
  },
});

export const { edit, clearEdit, markReset, markOutReset } = recordEditorSlice.actions;
export const selectRecordEditor = (state: RootState) => state.recordEditor;

export default recordEditorSlice.reducer;
