import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FetchingStatus,
  ServiceProvidersState,
  ServicesState,
  VerificationStatusesState,
} from "../types";
import { Service } from "@/models/service";
import { VerificationStatus } from "@/models/verification_status";

const initialState: VerificationStatusesState = {
  verificationStatuses: [],
};

const verificationStatusesSlice = createSlice({
  name: "verificationStatuses",
  initialState: initialState,
  reducers: {
    setVerificationStatuses(
      state,
      action: PayloadAction<VerificationStatus[]>
    ) {
      state.verificationStatuses = action.payload;
    },
  },
});

export default verificationStatusesSlice.reducer;
export const verificationStatusesActions = verificationStatusesSlice.actions;
