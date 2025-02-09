import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialValue,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setLogout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setToken } = authSlice.actions;

export default authSlice.reducer;
