import { useAppSelector } from "@/hooks/redux_hooks";
import { Service } from "@/models/service";
import { ServiceProvider } from "@/models/service_provider";
import Link from "next/link";
import { useState } from "react";
import Checkbox from "./checkbox";
import DeleteButton from "./delete_button";
import Dropdown from "./dropdown";
import Header from "./header";
import PrimaryButton from "./primary_button";
import TextInput from "./text_input";
import { Address } from "@/models/address";
import { UserInfo } from "@/models/user_info";

type Props = {
  serviceProvider: ServiceProvider;
  errorMsg: string | null;
  onSave: (
    serviceProvider: ServiceProvider,
    address: Address,
    userInfo: UserInfo,
    newServices: Service[]
  ) => Promise<void>;
  onDelete?: (serviceProvider: ServiceProvider) => Promise<void>;
};
export default function ServiceProviderContent(props: Props) {
  const verificationStatusesState = useAppSelector(
    (state) => state.verificationStatuses
  );
  const addressesState = useAppSelector((state) => state.addresses);
  const userInfosState = useAppSelector((state) => state.userInfos);
  const servicesState = useAppSelector((state) => state.services);
  const serviceTypesState = useAppSelector((state) => state.serviceTypes);

  const [address, setAddress] = useState<Address>(
    addressesState.addresses.find(
      (a) => a.id === props.serviceProvider.fk_Address
    ) ?? {
      id: Math.max(...addressesState.addresses.map((a) => a.id)) + 1,
      addressName: "",
      latitude: 0,
      longitude: 0,
      description: "",
    }
  );

  const [userInfo, setUserInfo] = useState<UserInfo>(
    userInfosState.userInfos.find(
      (ui) => ui.id === props.serviceProvider.fk_UserInfo
    ) ?? {
      id: Math.max(...userInfosState.userInfos.map((ui) => ui.id)) + 1,
      name: "",
      email: "",
      imageUrl: "",
    }
  );

  const [services, setServices] = useState<Service[]>(
    servicesState.services.filter(
      (service) => service.fk_ServiceProvider === props.serviceProvider.id
    )
  );

  const [provider, setProvider] = useState(props.serviceProvider);

  const phoneNumberHandler = (value: string) => {
    setProvider({ ...provider, phoneNumber: value });
  };
  const ratingAvgHandler = (value: string) => {
    setProvider({ ...provider, ratingAvg: parseFloat(value) });
  };
  const ratingCountHandler = (value: string) => {
    setProvider({ ...provider, ratingCount: parseInt(value) });
  };
  const isActiveHandler = (value: boolean) => {
    setProvider({ ...provider, isActive: value });
  };
  const verificationStatusHandler = (value: string) => {
    setProvider({ ...provider, verificationStatus: parseInt(value) });
  };

  const addressHandler = (value: string) => {
    setAddress((prev) => ({ ...prev, addressName: value }));
  };
  const lonHandler = (value: string) => {
    setAddress((prev) => ({ ...prev, longitude: parseFloat(value) }));
  };
  const latHandler = (value: string) => {
    setAddress((prev) => ({ ...prev, latitude: parseFloat(value) }));
  };
  const descriptionHandler = (value: string) => {
    setAddress((prev) => ({ ...prev, description: value }));
  };

  const nameHandler = (value: string) => {
    setUserInfo((prev) => ({ ...prev, name: value }));
  };
  const emailHandler = (value: string) => {
    setUserInfo((prev) => ({ ...prev, email: value }));
  };
  const imageUrlHandler = (value: string) => {
    setUserInfo((prev) => ({ ...prev, imageUrl: value }));
  };
  const deleteHandler = (id: number) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const servicePriceHandler = (value: string, id: number) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return { ...s, price: parseFloat(value) };
        }
        return s;
      })
    );
  };
  const serviceDurationHandler = (value: string, id: number) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return { ...s, duration: parseInt(value) };
        }
        return s;
      })
    );
  };
  const serviceTypeHandler = (value: string, id: number) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return { ...s, serviceType: parseInt(value) };
        }
        return s;
      })
    );
  };

  const addHandler = () => {
    setServices((prev) => [
      ...prev,
      {
        fk_ServiceProvider: props.serviceProvider.id,
        serviceType: 1,
        id:
          Math.max(
            ...prev.map((s) => s.id),
            ...servicesState.services.map((s) => s.id),
            0
          ) + 1,
        duration: 0,
        price: 0,
      },
    ]);
  };

  const validate = () => {
    return (
      provider.phoneNumber.length > 0 &&
      provider.ratingAvg >= 0 &&
      provider.ratingCount >= 0 &&
      address.addressName.length > 0 &&
      address.latitude >= -90 &&
      address.latitude <= 90 &&
      address.longitude >= -180 &&
      address.longitude <= 180 &&
      userInfo.name.length > 0 &&
      // userInfo.email.length > 0 &&
      userInfo.imageUrl.length > 0 &&
      services.every((s) => s.price >= 0 && s.duration >= 0)
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full justify-between font-mono text-sm flex flex-col gap-3">
        <Link href=".." className="w-min">
          <PrimaryButton label="Grįžti" onClick={() => {}} />
        </Link>
        <Header>Paslaugų tiekėjo informacija</Header>
        <TextInput
          id="id"
          label="Nr."
          disabled
          value={props.serviceProvider.id.toString()}
          onChange={() => {}}
        />

        <TextInput
          id="phoneNumber"
          label="Telefono numeris"
          onChange={phoneNumberHandler}
          type="text"
          value={provider.phoneNumber}
        />
        <TextInput
          id="ratingAvg"
          label="Įvertinimo vidurkis"
          onChange={ratingAvgHandler}
          type="number"
          value={provider.ratingAvg.toString()}
        />
        <TextInput
          id="ratingCount"
          label="Įvertinimų kiekis"
          onChange={ratingCountHandler}
          type="number"
          value={provider.ratingCount.toString()}
        />

        <Checkbox
          id="isActive"
          label="Ar aktyvus?"
          onChange={isActiveHandler}
          value={provider.isActive}
        />
        <Dropdown
          id={"verification"}
          label="Verifikacijos statusas"
          value={provider.verificationStatus.toString()}
          onChange={verificationStatusHandler}
          options={verificationStatusesState.verificationStatuses.map(
            (status) => {
              return {
                label: status.name,
                value: status.id.toString(),
              };
            }
          )}
        />
        <Header>Paslaugų tiekėjo adresas</Header>

        <TextInput
          id="address"
          label="Adresas"
          onChange={addressHandler}
          value={address.addressName}
        />
        <TextInput
          id="lon"
          label="Ilguma"
          type="number"
          onChange={lonHandler}
          value={address.longitude.toString()}
        />
        <TextInput
          id="lat"
          label="Platuma"
          type="number"
          onChange={latHandler}
          value={address.latitude.toString()}
        />
        <TextInput
          id="description"
          label="Aprašymas"
          onChange={descriptionHandler}
          value={address.description ?? ""}
        />

        <Header>Paslaugų tiekėjo asmeninė informacija</Header>
        <TextInput
          id="name"
          label="Vardas, pavardė"
          onChange={nameHandler}
          value={userInfo.name}
        />
        <TextInput
          id="email"
          label="El. paštas"
          type="email"
          onChange={emailHandler}
          value={userInfo.email}
        />
        <TextInput
          id="imageUrl"
          label="Nuotraukos URL"
          type="url"
          onChange={imageUrlHandler}
          value={userInfo.imageUrl}
        />
        <Header>Teikiamos paslaugos</Header>
        {services.map((service) => {
          return (
            <div
              key={service.id}
              className="flex flex-row justify-around items-end w-full gap-12"
            >
              <TextInput
                id="price"
                label="Kaina"
                type="number"
                onChange={(price) => {
                  servicePriceHandler(price, service.id);
                }}
                value={service.price.toString()}
              />
              <TextInput
                id="duration"
                label="Trukmė (sekundėmis)"
                type="number"
                onChange={(duration) => {
                  serviceDurationHandler(duration, service.id);
                }}
                value={service.duration.toString()}
              />
              <Dropdown
                id="serviceType"
                label="Paslaugos tipas"
                onChange={(serviceType) => {
                  serviceTypeHandler(serviceType, service.id);
                }}
                value={service.serviceType.toString()}
                options={serviceTypesState.serviceTypes.map((serviceType) => {
                  return {
                    label: serviceType.name,
                    value: serviceType.id.toString(),
                  };
                })}
              />
              <DeleteButton
                label="Ištrinti"
                onClick={() => {
                  deleteHandler(service.id);
                }}
              />
            </div>
          );
        })}
        <div className="self-start mb-4">
          <PrimaryButton onClick={addHandler} label="Pridėti" />
        </div>
        <div className="flex flex-col gap-2 items-center">
          {props.errorMsg && <p className="text-red-500">{props.errorMsg}</p>}
          <div className="flex w-1/4 self-center justify-center gap-4">
            <div className="flex-1">
              <PrimaryButton
                onClick={async () => {
                  await props.onSave(provider, address, userInfo, services);
                }}
                disabled={!validate()}
                label="Išsaugoti"
              ></PrimaryButton>
            </div>
            {props.onDelete && (
              <div className="flex-1">
                <DeleteButton
                  full
                  label="Ištrinti"
                  onClick={() => {
                    props.onDelete
                      ? props.onDelete(props.serviceProvider)
                      : () => {};
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
