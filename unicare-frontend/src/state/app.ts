import { createSlice } from "@reduxjs/toolkit";

export interface MessageProps {
  message: string | undefined;
  type: "success" | "error" | "info" | "warning" | undefined;
}

interface AppStateProps {
  colorMode: "light" | "dark";
  alert: MessageProps | undefined;
}

const colorMode: "light" | "dark" = (localStorage.getItem('colorMode') as "light" | "dark") || "light";

const initialAppState: AppStateProps = {
  colorMode: colorMode,
  alert: undefined,
};

const appSlice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
    setColorMode(state, action) {
      state.colorMode = action.payload;
	  localStorage.setItem('colorMode', action.payload);
    },
    setAlert(state, action) {
      state.alert = action.payload;
    },
    clearMessage(state) {
      state.alert = undefined;
    },
  },
});

export const { setColorMode, setAlert, clearMessage } = appSlice.actions;

export const appReducer = appSlice.reducer;
