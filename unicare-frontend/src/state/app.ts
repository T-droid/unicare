import { createSlice } from "@reduxjs/toolkit";

export interface MessageProps {
  message: string | undefined;
  type: "success" | "error" | "info" | "warning" | undefined;
}

interface AppStateProps {
  colorMode: "light" | "dark";
  alert: MessageProps | undefined;
  sidebarOpen: boolean;
}

const colorMode: "light" | "dark" =
  (localStorage.getItem("colorMode") as "light" | "dark") || "light";

const initialAppState: AppStateProps = {
  colorMode: colorMode,
  alert: undefined,
  sidebarOpen: false,
};

const appSlice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
    setColorMode(state, action) {
      state.colorMode = action.payload;
      localStorage.setItem("colorMode", action.payload);
    },
    setSidebarOpen(state, action) {
      state.sidebarOpen = action.payload;
      localStorage.setItem("sidebarOpen", state.sidebarOpen.toString());
    },
    setAlert(state, action) {
      state.alert = action.payload;
    },
    clearMessage(state) {
      state.alert = undefined;
    },
  },
});

export const { setColorMode, setAlert, setSidebarOpen, clearMessage } =
  appSlice.actions;

export const appReducer = appSlice.reducer;
