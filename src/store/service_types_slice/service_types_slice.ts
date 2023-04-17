import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServiceTypesState } from "../types";
import { ServiceProvider } from "@/models/service_provider";
import { ServiceType } from "@/models/service_type";

const initialState: ServiceTypesState = {
  serviceTypes: [],
};

const serviceTypesSlice = createSlice({
  name: "serviceTypes",
  initialState: initialState,
  reducers: {
    setServiceTypes(state, action: PayloadAction<ServiceType[]>) {
      state.serviceTypes = action.payload;
    },
  },
});

export default serviceTypesSlice.reducer;
export const serviceTypesActions = serviceTypesSlice.actions;
