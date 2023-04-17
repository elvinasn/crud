import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServicesState } from "../types";
import { Service } from "@/models/service";

const initialState: ServicesState = {
  services: [],
};

const servicesSlice = createSlice({
  name: "services",
  initialState: initialState,
  reducers: {
    setServices(state, action: PayloadAction<Service[]>) {
      state.services = action.payload;
    },
  },
});

export default servicesSlice.reducer;
export const servicesActions = servicesSlice.actions;
