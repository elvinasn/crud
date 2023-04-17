import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddressesState,
  FetchingStatus,
  ServiceProvidersState,
} from "../types";
import { ServiceProvider } from "@/models/service_provider";
import { Address } from "@/models/address";

const initialState: AddressesState = {
  addresses: [],
};

const addressesSlice = createSlice({
  name: "addresses",
  initialState: initialState,
  reducers: {
    setAddresses(state, action: PayloadAction<Address[]>) {
      state.addresses = action.payload;
    },
  },
});

export default addressesSlice.reducer;
export const addressesActions = addressesSlice.actions;
