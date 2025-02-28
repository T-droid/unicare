import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialValue,
  reducers: {
    setCurrentUser(state, action) {
      state.user = action.payload;
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
    },
  },
});

export const { setCurrentUser, setToken } = authSlice.actions;

export default authSlice.reducer;
