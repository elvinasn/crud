import mysql from "mysql2/promise";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = await mysql.createConnection({
    host: "localhost",
    database: "pets_reservation",
    user: "root",
  });

  try {
    const [rows, fields] = await connection.execute(
      `SELECT * FROM serviceprovider WHERE id=${req.query.id} `
    );
    connection.end();
    res.status(200).json({ data: rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
