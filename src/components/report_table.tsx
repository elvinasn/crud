import { useAppSelector } from "@/hooks/redux_hooks";
import Link from "next/link";
import Table, { Irow } from "react-tailwind-table";
import "react-tailwind-table/dist/index.css";
import PrimaryButton from "./primary_button";
import { Report } from "@/models/report";

type Props = {
  report: Report[];
};

const ReportTable = (props: Props) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full flex-col items-center justify-between text-sm lg:flex">
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
              field: "pet_owner_details",
              use: "Užsakovas",
            },
            {
              field: "total_bookings",
              use: "Užsakymų kiekis",
            },
            {
              field: "average_booking_price",
              use: "Vidutinė užsakymo kaina",
            },
            {
              field: "total_revenue",
              use: "Bendras pajamų kiekis",
            },
            {
              field: "average_service_provider_rating",
              use: "Vidutinis paslaugų teikėjo įvertinimas",
            },
          ]}
          rows={props.report}
          per_page={40}
        ></Table>
      </div>
    </main>
  );
};
export default ReportTable;
