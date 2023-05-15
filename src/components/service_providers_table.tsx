import { useAppSelector } from "@/hooks/redux_hooks";
import Link from "next/link";
import Table, { Irow } from "react-tailwind-table";
import "react-tailwind-table/dist/index.css";
import PrimaryButton from "./primary_button";

const ServiceProviderTable = () => {
  const serviceProvidersState = useAppSelector(
    (state) => state.serviceProviders
  );
  const verificationStatusesState = useAppSelector(
    (state) => state.verificationStatuses
  );
  const addressesState = useAppSelector((state) => state.addresses);
  const userInfosState = useAppSelector((state) => state.userInfos);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full flex-col items-center justify-between text-sm lg:flex">
        <Link href="/provider" className="self-end">
          <PrimaryButton label="Pridėti" onClick={() => {}} />
        </Link>
        <Table
          styling={{
            main: "bg-gray-700 border-gray-600 text-white m-0 pb-0 table",
            table_head: {
              table_data: "p-2.5 bg-gray-700 border-gray-600 text-white",
              table_row: "border-b border-gray-600",
            },
            table_body: {
              table_data:
                "p-2.5 border-b border-gray-600 bg-gray-800 text-white",
              table_row: "",
            },
            footer: {
              main: "bg-gray-700 border-gray-600 footer",
            },
            base_bg_color: "bg-gray-800",
            base_text_color: "text-white",
          }}
          show_search={false}
          should_export={false}
          columns={[
            {
              field: "id",
              use: "Nr.",
            },
            {
              field: "phoneNumber",
              use: "Tel. nr.",
            },
            {
              field: "ratingAvg",
              use: "Įvertinimas",
            },
            {
              field: "ratingCount",
              use: "Įvertinimų kiekis",
            },
            {
              field: "isActive",
              use: "Aktyvus",
            },
            {
              field: "verificationStatus",
              use: "Verifikacijos statusas",
            },
            {
              field: "fk_Address",
              use: "Adresas",
            },
            {
              field: "fk_UserInfo",
              use: "Vart. informacija",
            },
            {
              field: "action",
              use: "Peržiūrėti",
            },
          ]}
          rows={serviceProvidersState.serviceProviders}
          per_page={40}
          row_render={(row: Irow, column, display_value) => {
            if (column.field === "action") {
              return (
                <Link href={`/provider/${row.id}`} className="text-blue-500">
                  Peržiūrėti
                </Link>
              );
            }
            if (column.field === "verificationStatus") {
              const verificationStatus =
                verificationStatusesState.verificationStatuses.find(
                  (verificationStatus) =>
                    verificationStatus.id === +display_value
                );
              return verificationStatus?.name ?? "Nėra";
            }
            if (column.field === "fk_Address") {
              const address = addressesState.addresses.find(
                (address) => address.id === +display_value
              );
              return address?.addressName ?? "Nėra";
            }
            if (column.field === "fk_UserInfo") {
              const userInfo = userInfosState.userInfos.find(
                (userInfo) => userInfo.id === +display_value
              );
              return userInfo?.name ?? "Nėra";
            }
            if (column.field === "isActive") {
              return display_value ? "Taip" : "Ne";
            }
            return display_value;
          }}
        ></Table>
      </div>
    </main>
  );
};
export default ServiceProviderTable;
