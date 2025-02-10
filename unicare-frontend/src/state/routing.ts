import { createSlice } from "@reduxjs/toolkit";

export interface RoutingState {
  location: Location | null;
}

const initialRoutingState: RoutingState = {
  location: null,
};

const routingSlice = createSlice({
  name: "routing",
  initialState: initialRoutingState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
  },
});

export const { setLocation } = routingSlice.actions;

export default routingSlice.reducer;
