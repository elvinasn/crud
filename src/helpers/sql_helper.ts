import { Hemisphere, getHemisphereSql } from "@/models/hemisphere";
import mysql from "mysql2/promise";

export async function edit(
  tableName: string,
  id: number,
  fields: { [key: string]: any }
) {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      database: "pets_reservation",
      user: "root",
    });
    const fieldsArray = Object.keys(fields);
    const valuesArray = Object.values(fields);
    const valuesArrayWithId = [...valuesArray, id];
    const fieldsString = fieldsArray.join(" = ?, ") + " = ?";
    const sql = `UPDATE ${tableName} SET ${fieldsString} WHERE id = ?`;
    await connection.execute(sql, valuesArrayWithId);
    connection.end();
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function remove(tableName: string, id: number) {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      database: "pets_reservation",
      user: "root",
    });
    const sql = `DELETE FROM ${tableName} WHERE id = ?`;
    await connection.execute(sql, [id]);
    connection.end();
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
export async function create(
  tableName: string,
  id: number,
  fields: { [key: string]: any }
) {
  try {
    const sql = `INSERT INTO ${tableName} (${Object.keys(fields).join(
      ", "
    )}) VALUES (${Object.values(fields)
      .map((field) => `'${field}'`)
      .join(", ")})`;
    const connection = await mysql.createConnection({
      host: "localhost",
      database: "pets_reservation",
      user: "root",
    });
    await connection.execute(sql);
    connection.end();
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function getAll(tableName: string) {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      database: "pets_reservation",
      user: "root",
    });
    const [rows, fields] = await connection.execute(
      `SELECT * FROM ${tableName}`
    );
    connection.end();
    return rows;
  } catch (e) {
    console.log(e);
    return [];
  }
}
export async function deleteByFk(
  tableName: string,
  fkField: string,
  fkId: number
) {
  const connection = await mysql.createConnection({
    host: "localhost",
    database: "pets_reservation",
    user: "root",
  });
  const sql = `DELETE FROM ${tableName} WHERE ${fkField} = ?`;
  await connection.execute(sql, [fkId]);
}

export async function getReport(
  price: number,
  hemisphere: Hemisphere,
  year: number
) {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      database: "pets_reservation",
      user: "root",
    });
    const [rows, fields] = await connection.execute(
      `SELECT 
      CONCAT(UO.name, ' ', UO.email) AS pet_owner_details,
      COUNT(*) AS total_bookings,
      CAST(AVG(B.price) AS DECIMAL(10, 2)) AS average_booking_price,
      CAST(SUM(B.price) AS DECIMAL(10, 2)) AS total_revenue,
      AVG(SP.ratingAvg) as average_service_provider_rating
  FROM 
      booking B 
  INNER JOIN 
      petowner PO ON B.fk_PetOwner = PO.id
  INNER JOIN 
      userinfo UO ON PO.fk_UserInfo = UO.id
  INNER JOIN 
      serviceprovider SP ON B.fk_ServiceProvider = SP.id
  LEFT JOIN 
      address A ON B.fk_Address = A.id
  WHERE 
      B.price > ${price} AND 
      (A.${getHemisphereSql(hemisphere)} OR A.id IS NULL) AND
      YEAR(B.startDate) = ${year}
  GROUP BY 
      UO.name
  ORDER BY 
      total_bookings DESC;`
    );

    const [totalRow, totalFields] = await connection.execute(
      `SELECT
      COUNT(*) AS total_bookings,
      CAST(AVG(B.price) AS DECIMAL(10, 2)) AS average_booking_price,
      CAST(SUM(B.price) AS DECIMAL(10, 2)) AS total_revenue,
      AVG(SP.ratingAvg) as average_service_provider_rating
      FROM 
      booking B 
  INNER JOIN 
      petowner PO ON B.fk_PetOwner = PO.id
  INNER JOIN 
      userinfo UO ON PO.fk_UserInfo = UO.id
  INNER JOIN 
      serviceprovider SP ON B.fk_ServiceProvider = SP.id
  LEFT JOIN 
      address A ON B.fk_Address = A.id
  WHERE 
      B.price > ${price} AND 
      (A.${getHemisphereSql(hemisphere)} OR A.id IS NULL) AND
      YEAR(B.startDate) = ${year};`
    );
    connection.end();

    return { rows, totalRow };
  } catch (e) {
    console.log(e);
    return [];
  }
}
