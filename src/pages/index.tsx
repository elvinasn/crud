import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import {
  fetchAddresses,
  fetchServiceProviders,
  fetchServiceTypes,
  fetchServices,
  fetchUserInfos,
  fetchVerificationStatuses,
} from "@/repositories/fetching_repository";
import { serviceProvidersActions } from "@/store/service_providers_slice/service_providers_slice";
import { servicesActions } from "@/store/services_slice/services_slice";
import { serviceTypesActions } from "@/store/service_types_slice/service_types_slice";
import { verificationStatusesActions } from "@/store/verification_statuses_slice/verification_statuses.slice";

import { addressesActions } from "@/store/addresses_slice/addresses_slice";
import { userInfosActions } from "@/store/user_infos_slice/user_infos_slice";
import ServiceProviderTable from "@/components/service_providers_table";

export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const _fetchProviders = async () => {
      const serviceProviders = await fetchServiceProviders();
      dispatch(serviceProvidersActions.setServiceProviders(serviceProviders));
    };
    const _fetchServices = async () => {
      const services = await fetchServices();
      dispatch(servicesActions.setServices(services));
    };
    const _fetchServiceTypes = async () => {
      const serviceTypes = await fetchServiceTypes();
      dispatch(serviceTypesActions.setServiceTypes(serviceTypes));
    };
    const _fetchVerificationStatuses = async () => {
      const verificationStatuses = await fetchVerificationStatuses();
      dispatch(
        verificationStatusesActions.setVerificationStatuses(
          verificationStatuses
        )
      );
    };
    const _fetchAddresses = async () => {
      const addresses = await fetchAddresses();
      dispatch(addressesActions.setAddresses(addresses));
    };
    const _fetchUserInfos = async () => {
      const userInfos = await fetchUserInfos();
      dispatch(userInfosActions.setUserInfos(userInfos));
    };
    _fetchServices();
    _fetchProviders();
    _fetchServiceTypes();
    _fetchVerificationStatuses();
    _fetchAddresses();
    _fetchUserInfos();
  }, [dispatch]);
  return <ServiceProviderTable />;
}
