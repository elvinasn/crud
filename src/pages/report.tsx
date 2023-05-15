import Dropdown from "@/components/dropdown";
import Header from "@/components/header";
import Heading from "@/components/heading";
import PrimaryButton from "@/components/primary_button";
import TextInput from "@/components/text_input";
import { getReport } from "@/repositories/fetching_repository";
import { Hemisphere, getTranslation } from "@/models/hemisphere";
import { Report } from "@/models/report";
import { useState } from "react";
import ReportTable from "@/components/report_table";
import toast from "react-hot-toast";

const ReportPage = () => {
  const [price, setPrice] = useState(0);
  const [hemisphere, setHemisphere] = useState(Hemisphere.Northern);
  const [year, setYear] = useState(2023);
  const [report, setReport] = useState<Report[]>([]);

  const yearOptions = [];
  for (let i = 2021; i < 2025; i++) {
    yearOptions.push({
      value: i.toString(),
      label: i.toString(),
    });
  }
  const onClickHandler = async () => {
    const result = await getReport(price, hemisphere, year);
    toast.dismiss();
    if (result.length === 0) {
      toast.error("Nėra duomenų ataskaitai sudaryti");
    } else {
      toast.success("Ataskaita sudaryta");
    }
    setReport(result);
  };
  console.log(report);

  return (
    <div>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full flex-col items-center justify-between text-sm lg:flex">
          <div className="bg-gray-800 flex flex-col p-5 rounded-3xl w-1/2 gap-2">
            <TextInput
              id="price"
              label="Užsakymų kaina (nuo)"
              onChange={(val) => {
                setPrice(+val);
              }}
              value={price.toString()}
              type="number"
            />
            <Dropdown
              label="Pusrutulis"
              id="hemisphere"
              onChange={(val) => {
                setHemisphere(val as Hemisphere);
              }}
              value={hemisphere}
              options={Object.keys(Hemisphere).map((key) => ({
                value: key,
                label: getTranslation(key as Hemisphere),
              }))}
            />
            <Dropdown
              id="year"
              label="Metai"
              onChange={(val) => {
                setYear(+val);
              }}
              value={year.toString()}
              options={yearOptions}
            />
            <PrimaryButton
              label="Sudaryti ataskaitą"
              onClick={onClickHandler}
            />
          </div>
        </div>
        {report.length > 0 && <ReportTable report={report} />}
      </main>
    </div>
  );
};

export default ReportPage;
