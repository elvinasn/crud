import { Address, addressSchema } from "@/models/address";
import { Hemisphere } from "@/models/hemisphere";
import { Report, reportSchema } from "@/models/report";
import { Service, serviceSchema } from "@/models/service";
import {
  ServiceProvider,
  serviceProviderSchema,
} from "@/models/service_provider";
import { ServiceType, serviceTypeSchema } from "@/models/service_type";
import { UserInfo, userInfoSchema } from "@/models/user_info";
import {
  VerificationStatus,
  verificationStatusSchema,
} from "@/models/verification_status";

export const fetchServiceProviders = async () => {
  try {
    const apiEndpoint = "http://localhost:3000/api/get_serviceproviders";

    const response = await fetch(apiEndpoint);
    const data = await response.json();
    const serviceProviders = data.data.map((item: any) => {
      return serviceProviderSchema.cast(item);
    });
    return serviceProviders as ServiceProvider[];
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const fetchServices = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/get_services");
    const data = await response.json();
    const services = data.data.map((item: any) => {
      return serviceSchema.cast(item);
    });
    return services as Service[];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchServiceTypes = async () => {
  try {
    const apiEndpoint = "http://localhost:3000/api/get_servicetypes";

    const response = await fetch(apiEndpoint);
    const data = await response.json();
    const serviceProviders = data.data.map((item: any) => {
      return serviceTypeSchema.cast(item);
    });
    return serviceProviders as ServiceType[];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchVerificationStatuses = async () => {
  try {
    const apiEndpoint = "http://localhost:3000/api/get_verifications";

    const response = await fetch(apiEndpoint);
    const data = await response.json();
    const serviceProviders = data.data.map((item: any) => {
      return verificationStatusSchema.cast(item);
    });
    return serviceProviders as VerificationStatus[];
  } catch (e) {
    console.log(e);
    return [];
  }
};
export const fetchAddresses = async () => {
  try {
    const apiEndpoint = "http://localhost:3000/api/get_addresses";

    const response = await fetch(apiEndpoint);
    const data = await response.json();
    const serviceProviders = data.data.map((item: any) => {
      return addressSchema.cast(item);
    });
    return serviceProviders as Address[];
  } catch (e) {
    console.log(e);
    return [];
  }
};
export const fetchUserInfos = async () => {
  try {
    const apiEndpoint = "http://localhost:3000/api/get_userinfos";

    const response = await fetch(apiEndpoint);
    const data = await response.json();
    const serviceProviders = data.data.map((item: any) => {
      return userInfoSchema.cast(item);
    });
    return serviceProviders as UserInfo[];
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const fetchServiceProviderById = async (id: number) => {
  try {
    const apiEndpoint = `http://localhost:3000/api/get_serviceprovider?id=${id}`;
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    const serviceProvider = serviceProviderSchema.cast(data.data[0]);
    return serviceProvider as ServiceProvider;
  } catch (e) {
    console.log(e);
    return {} as ServiceProvider;
  }
};

export const updateServiceProvider = async (
  serviceProvider: ServiceProvider,
  address: Address,
  userInfo: UserInfo,
  newServices: Service[],
  oldServices: Service[]
) => {
  try {
    const apiEndpoint = `http://localhost:3000/api/update_serviceprovider`;
    const response = await fetch(apiEndpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serviceProvider,
        address,
        userInfo,
        newServices,
        oldServices,
      }),
    });
    const status = response.status;
    if (status !== 200) {
      const data = await response.json();
      return data.message;
    }
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const createServiceProvider = async (
  serviceProvider: ServiceProvider,
  address: Address,
  userInfo: UserInfo,
  newServices: Service[]
) => {
  try {
    const apiEndpoint = `http://localhost:3000/api/create_serviceprovider`;
    await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serviceProvider,
        address,
        userInfo,
        newServices,
      }),
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteServiceProviders = async (
  serviceProviders: ServiceProvider[]
) => {
  try {
    const apiEndpoint = `http://localhost:3000/api/delete_serviceproviders`;
    await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ serviceProviders }),
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getReport = async (
  price: number,
  hemisphere: Hemisphere,
  year: number
) => {
  try {
    const apiEndpoint = `http://localhost:3000/api/get_report?price=${price}&hemisphere=${hemisphere}&year=${year}`;
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    console.log("labas");
    const report: Report[] = data.data.rows.map((item: any) => {
      return reportSchema.cast(item);
    });
    const total = data.data.totalRow[0];
    report.push({
      ...total,
      pet_owner_details: "Viso",
    });
    return report as Report[];
  } catch (e) {
    console.log(e);
    return [];
  }
};
