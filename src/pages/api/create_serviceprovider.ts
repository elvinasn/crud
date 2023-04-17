import { create } from "@/helpers/sql_helper";
import { validateEmail } from "@/helpers/validation";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const serviceProvider = req.body.serviceProvider;
    console.log(req.body);
    const address = req.body.address;
    const userInfo = req.body.userInfo;
    const newServices = req.body.newServices;
    if (!validateEmail(userInfo.email)) {
      res.status(400).json({ message: "El. paštas įvestas neteisingai" });
      return;
    }

    await create("address", address.id, address);
    await create("userinfo", userInfo.id, userInfo);
    await create("serviceprovider", serviceProvider.id, serviceProvider);
    newServices.forEach(async (e: any) => {
      await create("service", e.id, e);
    });
    res.status(200).json({ data: {} });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
