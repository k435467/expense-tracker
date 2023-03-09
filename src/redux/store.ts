import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import toastReducer from "./toastSlice";
import recordEditorReducer from "./recordEditorSlice";
import themeSlice from "./themeSlice";

const store = configureStore({
  reducer: {
    toast: toastReducer,
    recordEditor: recordEditorReducer,
    theme: themeSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain 'useDispatch' and 'useSelector'
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
