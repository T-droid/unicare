import { createSlice } from "@reduxjs/toolkit";

export interface MessageProps {
  message: string | undefined;
  type: "success" | "error" | "info" | "warning" | undefined;
}

const initialMessageState: MessageProps = {
  message: undefined,
  type: undefined,
};

const messageSlice = createSlice({
  name: "message",
  initialState: initialMessageState,
  reducers: {
    setMessage(state, action) {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearMessage(state) {
      state.message = undefined;
      state.type = undefined;
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;

export default messageSlice.reducer;
