import { deleteByFk, remove } from "@/helpers/sql_helper";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const serviceProviders = req.body.serviceProviders;
    serviceProviders.forEach(async (serviceProvider: any) => {
      await deleteByFk("service", "fk_ServiceProvider", serviceProvider.id);
      await deleteByFk("booking", "fk_ServiceProvider", serviceProvider.id);
      await deleteByFk("question", "fk_ServiceProvider", serviceProvider.id);
      await deleteByFk("channel", "fk_ServiceProvider", serviceProvider.id);
      await deleteByFk("feedback", "fk_ServiceProvider", serviceProvider.id);
      await remove("serviceprovider", serviceProvider.id);
      await remove("address", serviceProvider.fk_Address);
      await remove("userinfo", serviceProvider.fk_UserInfo);
    });
    res.status(200).json({ data: {} });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
