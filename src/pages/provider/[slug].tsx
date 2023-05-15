import ServiceProviderContent from "@/components/service_provider.page";
import { useAppSelector } from "@/hooks/redux_hooks";
import { useRouter } from "next/router";

import { ServiceProvider } from "@/models/service_provider";
import {
  deleteServiceProviders,
  fetchServiceProviderById,
  updateServiceProvider,
} from "@/repositories/fetching_repository";
import { useState } from "react";
import Header from "@/components/header";

export default function ServiceProviderPage(props: {
  serviceProvider: ServiceProvider;
}) {
  const servicesState = useAppSelector((state) => state.services);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const oldServices = servicesState.services.filter(
    (service) => service.fk_ServiceProvider === props.serviceProvider.id
  );
  const router = useRouter();
  return (
    <div>
      <Header />
      <ServiceProviderContent
        serviceProvider={props.serviceProvider}
        errorMsg={errorMsg}
        onSave={async (serviceProvider, address, userInfo, newServices) => {
          const response = await updateServiceProvider(
            serviceProvider,
            address,
            userInfo,
            newServices,
            oldServices
          );
          if (typeof response === "string") {
            setErrorMsg(response);
            return;
          }
          setErrorMsg(null);
          router.push("/");
        }}
        onDelete={async (serviceProvider) => {
          console.log("start");
          await deleteServiceProviders([serviceProvider]);
          console.log("end");
          router.push("/");
        }}
      />
    </div>
  );
}
// export async function getStaticPaths() {
//   const providers = await fetchServiceProviders();

//   return {
//     paths: providers.map((provider) => ({
//       params: { slug: provider.id.toString() },
//     })),
//     fallback: false,
//   };
// }

export async function getServerSideProps({ params }: any) {
  const serviceProvider = await fetchServiceProviderById(params.slug);
  if (!serviceProvider) {
    return {
      notFound: true, //redirects to 404 page
    };
  }
  return {
    props: {
      serviceProvider,
    },
  };
}
