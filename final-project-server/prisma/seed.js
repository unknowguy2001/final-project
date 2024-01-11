const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { PrismaClient } = require("@prisma/client");
const argon2 = require("argon2");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const prisma = new PrismaClient();

async function main() {
  const data = [];

  fs.createReadStream(path.join(__dirname, "/seeds/companies.csv"))
    .pipe(csv())
    .on("data", (row) => {
      data.push(row);
    })
    .on("end", async () => {
      await prisma.review.deleteMany({});
      await prisma.company.deleteMany({});
      await prisma.user.deleteMany({});
      await prisma.role.deleteMany({});
      for (const row of data) {
        await prisma.company.create({
          data: {
            name: row.CompanyName,
            address: row.Address === "NULL" ? "" : row.Address,
            road: row.Road === "NULL" ? "" : row.Road,
            village: row.Village === "NULL" ? "" : row.Village,
            district: row.District === "NULL" ? "" : row.District,
            province: row.Province === "NULL" ? "" : row.Province,
            zipcode: row.Zipcode === "NULL" ? "" : row.Zipcode,
            telephone: row.Telephone === "NULL" ? "" : row.Telephone,
          },
        });
      }
      await prisma.role.create({
        data: {
          id: 1,
          name: "user",
        },
      });
      await prisma.role.create({
        data: {
          id: 2,
          name: "admin",
        },
      });
      const hashedPassword = await argon2.hash(
        process.env.ADMIN_PASSWORD || "admin"
      );
      await prisma.user.create({
        data: {
          username: process.env.ADMIN_USERNAME || "admin",
          password: hashedPassword,
          roleId: 2,
          fullname: "Administrator",
        },
      });
      await prisma.$disconnect();
    });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
