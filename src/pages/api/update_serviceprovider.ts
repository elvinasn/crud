import { create, edit, remove } from "@/helpers/sql_helper";
import { validateEmail } from "@/helpers/validation";
import mysql from "mysql2/promise";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const serviceProvider = req.body.serviceProvider;
    const address = req.body.address;
    const userInfo = req.body.userInfo;
    const newServices = req.body.newServices;
    const oldServices = req.body.oldServices;
    if (!validateEmail(userInfo.email)) {
      res.status(400).json({ message: "El. paštas įvestas neteisingai" });
      return;
    }
    await edit("serviceprovider", serviceProvider.id, serviceProvider);
    await edit("address", address.id, address);
    await edit("userinfo", userInfo.id, userInfo);

    const rowsToEdit = newServices.filter((e: any) =>
      oldServices.map((old: any) => old.id).includes(e.id)
    );
    const rowsToDelete = oldServices.filter(
      (e: any) => !newServices.map((newS: any) => newS.id).includes(e.id)
    );
    const rowsToAdd = newServices.filter(
      (e: any) => !oldServices.map((old: any) => old.id).includes(e.id)
    );

    rowsToEdit.forEach(async (e: any) => {
      await edit("service", e.id, e);
    });

    rowsToDelete.forEach(async (e: any) => {
      await remove("service", e.id);
    });

    rowsToAdd.forEach(async (e: any) => {
      await create("service", e.id, e);
    });

    res.status(200).json({ data: {} });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
