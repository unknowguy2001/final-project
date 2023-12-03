const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const data = [];

  fs.createReadStream(path.join(__dirname, "/seeds/companies.csv"))
    .pipe(csv())
    .on("data", (row) => {
      data.push(row);
    })
    .on("end", async () => {
      await prisma.company.deleteMany();
      for (const row of data) {
        await prisma.company.create({
          data: {
            name: row.CompanyName,
            typeId: parseInt(row.CompanyTypeID),
            workModelId: parseInt(row.CompanyTypeID),
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
