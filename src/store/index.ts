import { configureStore } from "@reduxjs/toolkit";
import serviceProviderReducer from "./service_providers_slice/service_providers_slice";
import servicesReducer from "./services_slice/services_slice";
import serviceTypesReducer from "./service_types_slice/service_types_slice";
import verificationStatusesReducer from "./verification_statuses_slice/verification_statuses.slice";
import addressesReducer from "./addresses_slice/addresses_slice";
import userInfosReducer from "./user_infos_slice/user_infos_slice";

export const store = configureStore({
  reducer: {
    serviceProviders: serviceProviderReducer,
    services: servicesReducer,
    serviceTypes: serviceTypesReducer,
    verificationStatuses: verificationStatusesReducer,
    addresses: addressesReducer,
    userInfos: userInfosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
