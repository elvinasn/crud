import Header from "@/components/header";
import ServiceProviderContent from "@/components/service_provider.page";
import { useAppSelector } from "@/hooks/redux_hooks";

import { ServiceProvider } from "@/models/service_provider";
import {
  createServiceProvider,
  updateServiceProvider,
} from "@/repositories/fetching_repository";
import { useRouter } from "next/router";

export default function ServiceProviderIndex() {
  const serviceProvidersState = useAppSelector(
    (state) => state.serviceProviders
  );
  const addressesState = useAppSelector((state) => state.addresses);
  const router = useRouter();
  const userInfosState = useAppSelector((state) => state.userInfos);
  return (
    <div>
      <Header />
      <ServiceProviderContent
        errorMsg={null}
        serviceProvider={{
          id:
            Math.max(
              ...serviceProvidersState.serviceProviders.map(
                (provider) => provider.id
              )
            ) + 1,
          fk_Address:
            Math.max(...addressesState.addresses.map((address) => address.id)) +
            1,
          fk_UserInfo:
            Math.max(
              ...userInfosState.userInfos.map((userInfo) => userInfo.id)
            ) + 1,
          isActive: false,
          verificationStatus: 1,
          phoneNumber: "",
          ratingAvg: 0,
          ratingCount: 0,
        }}
        onSave={async (serviceProvider, address, userInfo, newServices) => {
          await createServiceProvider(
            {
              ...serviceProvider,
              fk_Address: address.id,
              fk_UserInfo: userInfo.id,
            },
            address,
            userInfo,
            newServices
          );
          router.push("/");
        }}
      />
    </div>
  );
}
