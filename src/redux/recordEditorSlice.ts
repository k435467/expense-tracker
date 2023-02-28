import { Record } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface RecordEditorState {
  og?: Record;
}

const initialState: RecordEditorState = {};

export const recordEditorSlice = createSlice({
  name: "recordEditor",
  initialState,
  reducers: {
    edit: (state, action: PayloadAction<Record>) => {
      state.og = action.payload;
    },
    clearEdit: (state) => {
      state.og = undefined;
    },
  },
});

export const { edit, clearEdit } = recordEditorSlice.actions;
export const selectRecordEditor = (state: RootState) => state.recordEditor;

export default recordEditorSlice.reducer;
