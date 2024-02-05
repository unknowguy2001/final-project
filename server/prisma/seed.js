const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const argon2 = require("argon2");
const csv = require("csv-parser");

const { prisma } = require("../utils/prisma");
const { roles } = require("./seeds/roles");
const { hashtags } = require("./seeds/hashtags");

dotenv.config({ path: path.join(__dirname, "../.env") });

async function getCompaniesFromCsv() {
  return new Promise((resolve, reject) => {
    const companies = [];
    fs.createReadStream(path.join(__dirname, "/seeds/companies.csv"))
      .pipe(csv())
      .on("data", (row) => {
        companies.push(row);
      })
      .on("end", () => {
        resolve(companies);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

async function main() {
  const companies = await getCompaniesFromCsv();
  for (let i = 0; i < companies.length; i++) {
    const row = companies[i];
    await prisma.company.upsert({
      where: { id: i + 1 },
      create: {
        id: i + 1,
        name: row.CompanyName,
        address: row.Address === "NULL" ? "" : row.Address,
        road: row.Road === "NULL" ? "" : row.Road,
        village: row.Village === "NULL" ? "" : row.Village,
        district: row.District === "NULL" ? "" : row.District,
        province: row.Province === "NULL" ? "" : row.Province,
        zipcode: row.Zipcode === "NULL" ? "" : row.Zipcode,
        telephone: row.Telephone === "NULL" ? "" : row.Telephone,
      },
      update: {
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
  for (const row of hashtags) {
    await prisma.hashtag.upsert({
      where: { id: row.id },
      update: {
        name: row.name,
      },
      create: {
        id: row.id,
        name: row.name,
      },
    });
  }
  for (const row of roles) {
    await prisma.role.upsert({
      where: { id: row.id },
      update: {
        name: row.name,
        sequence: row.sequence,
      },
      create: {
        id: row.id,
        name: row.name,
        sequence: row.sequence,
      },
    });
  }
  const username = process.env.ADMIN_USERNAME || "admin";
  const hashedPassword = await argon2.hash(
    process.env.ADMIN_PASSWORD || "admin"
  );
  const adminRoleId = 2;
  const fullname = "admin";
  await prisma.user.upsert({
    where: { id: 1 },
    update: {
      username,
      password: hashedPassword,
      roleId: adminRoleId,
      fullname,
    },
    create: {
      id: 1,
      username,
      password: hashedPassword,
      roleId: adminRoleId,
      fullname,
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
