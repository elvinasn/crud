import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchingStatus, ServiceProvidersState } from "../types";
import { ServiceProvider } from "@/models/service_provider";

const initialState: ServiceProvidersState = {
  serviceProviders: [],
};

const serviceProvidersSlice = createSlice({
  name: "serviceProviders",
  initialState: initialState,
  reducers: {
    setServiceProviders(state, action: PayloadAction<ServiceProvider[]>) {
      state.serviceProviders = action.payload;
    },
  },
});

export default serviceProvidersSlice.reducer;
export const serviceProvidersActions = serviceProvidersSlice.actions;
