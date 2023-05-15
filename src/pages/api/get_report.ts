import { getAll, getReport } from "@/helpers/sql_helper";
import { Hemisphere } from "@/models/hemisphere";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const rows = await getReport(
      req.query.price ? +req.query.price : 0,
      req.query.hemisphere
        ? (req.query.hemisphere as Hemisphere)
        : Hemisphere.Northern,
      req.query.year ? +req.query.year : 0
    );
    res.status(200).json({ data: rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
