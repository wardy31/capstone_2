const { PrismaClient } = require("@prisma/client");
const userSeeder = require("./userSeeder");
const userLocationSeeder = require("./userLocationSeeder");
const prisma = new PrismaClient();

async function main() {
  await userSeeder();
  await userLocationSeeder();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
