import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user"); // Get raw string from localStorage
const parsedUser = storedUser ? JSON.parse(storedUser) : null;

const initialValue = {
  user: parsedUser,
  role: null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialValue,
  reducers: {
    setCurrentUser(state, action) {
      state.user = action.payload;
      // state.role = action.payload.role;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setLogout(state) {
      state.user = null;
      state.token = null;
      localStorage.clear();
      window.location.href = "/auth/login";
    },
  },
});

export const { setCurrentUser, setToken, setLogout } = authSlice.actions;

export const authReducer = authSlice.reducer;
