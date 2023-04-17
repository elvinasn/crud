import { Address } from "@/models/address";
import { Service } from "@/models/service";
import { ServiceProvider } from "@/models/service_provider";
import { ServiceType } from "@/models/service_type";
import { UserInfo } from "@/models/user_info";
import { VerificationStatus } from "@/models/verification_status";

export enum FetchingStatus {
  initial = "initial",
  loading = "loading",
  success = "success",
  error = "error",
}
export interface ServiceProvidersState {
  serviceProviders: ServiceProvider[];
}
export interface ServicesState {
  services: Service[];
}
export interface ServiceTypesState {
  serviceTypes: ServiceType[];
}
export interface VerificationStatusesState {
  verificationStatuses: VerificationStatus[];
}
export interface AddressesState {
  addresses: Address[];
}
export interface UserInfosState {
  userInfos: UserInfo[];
}
