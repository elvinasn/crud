import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfosState } from "../types";
import { UserInfo } from "@/models/user_info";

const initialState: UserInfosState = {
  userInfos: [],
};

const useInfosSlice = createSlice({
  name: "userInfos",
  initialState: initialState,
  reducers: {
    setUserInfos(state, action: PayloadAction<UserInfo[]>) {
      state.userInfos = action.payload;
    },
  },
});

export default useInfosSlice.reducer;
export const userInfosActions = useInfosSlice.actions;
