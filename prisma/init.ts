import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function init() {
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      id: "0xA08a5810Dc98258f35a35918CeD3f99E893154Ef",
      nickname: "loll",
    },
  });
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
  await prisma.ethUSDCPair.deleteMany();
  await prisma.ethUSDCPair.create({
    data: {},
  });
}

init();
