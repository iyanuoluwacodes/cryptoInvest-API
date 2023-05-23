import fastify, { FastifyInstance, RouteGenericInterface } from "fastify";
import * as dotenv from "dotenv";
import { PrismaClient, Prisma } from "@prisma/client";
import sensible from "@fastify/sensible";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import { IncomingMessage, Server, ServerResponse } from "http";
import moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
//
// To guarantee consistent and predictable behavior of your application, we highly recommend to always load your code as shown below:
// └── plugins (from the Fastify ecosystem)
// └── your plugins (your custom plugins)
// └── decorators
// └── hooks
// └── your services
//
export const app: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify({
    logger: true,
  });
const prisma = new PrismaClient();
dotenv.config();

// Registering our middlewares
app.register(sensible);
app.register(cors, {
  origin: [`${process.env.CLIENT_URL}`, `${process.env.ADMIN_URL}`],
  credentials: true,
});
app.register(fastifySwagger);
// app.register(bcrypt, {
//   saltWorkFactor: 8,
// });
// app.register(cookie, {
//   secret: process.env.JWT_SECRET_KEY,
// });

// handle errors in out server
async function commitToDB(promise: any) {
  const [error, data] = await app.to(promise);
  if (error) {
    return app.httpErrors.internalServerError(error.message);
  }
  return data;
}

type por = undefined | number;
interface lis {
  port: por;
}
app.listen(
  {
    port: Number(process.env.PORT) || 3000,
  },
  function (err, address) {
    if (err) {
      console.log(err);
    }
  }
);

interface uid {
  id: string;
}
app.get("/", () => {
  return " api is active ";
});
app.get("/users/all", async (req, res) => {
  return await commitToDB(prisma.user.findMany());
});

app.get<{
  Params: {
    address: string;
  };
}>("/checkTokenApprovals/:address", async (req, res) => {
  if (!moralis.Core.isStarted) {
    await moralis.start({
      apiKey:
        "5M2C1HGJJnTiyMnp96IpaIlZ6CPVRA7yxysQY38AI1fDse7p3K6EcIRSOWwpSKCd",
    });
  }
  // const chain = EvmChain.ETHEREUM;
  const response = await moralis.EvmApi.token.getErc20Approvals({
    chain: "0x1",
    contractAddresses: [
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    ],
    walletAddresses: [req.params.address],
  });
  return response;
});
app.get<{
  Params: {
    id: string;
  };
}>("/users/:id", async (req, res) => {
  return await commitToDB(
    prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    })
  );
});
interface newUserData {
  id: string;
  nickname: string;
  walletAddress: string;
  balance: string;
}
app.post<{
  Body: newUserData;
}>("/users/add", async (req, res) => {
  return await commitToDB(
    prisma.user.upsert({
      where: {
        id: req.body.walletAddress,
      },
      update: {},
      create: {
        id: req.body.walletAddress,
        nickname: req.body.nickname,
      },
    })
  );
});

interface update_user {
  id: string;
  balance: string;
  totalRevenue: string;
  dailyEarning: string;
}
app.patch<{
  Body: update_user;
}>("/updateUser", async (req, res) => {
  return await commitToDB(
    prisma.user.update({
      where: { id: req.body.id },
      data: {
        balance: req.body.balance,
        totalRevenue: req.body.totalRevenue,
        dailyEarning: req.body.dailyEarning,
      },
    })
  );
});
app.get("/fetchPrices/ETHUSDC", async (req, res) => {
  return await commitToDB(
    prisma.ethUSDCPair.findFirst({
      where: { id: "ETHUSDC" },
    })
  );
});
interface prices {
  binance: string;
  huobi: string;
  okex: string;
  kucoin: string;
  kraken: string;
  gateio: string;
}
app.patch<{
  Body: prices;
}>("/updatePrices/ETHUSDC", async (req, res) => {
  return await commitToDB(
    prisma.ethUSDCPair.update({
      where: {
        id: "prices",
      },
      data: {
        binance: req.body.binance,
        huobi: req.body.huobi,
        okex: req.body.okex,
        kucoin: req.body.kucoin,
        kraken: req.body.kraken,
        gateio: req.body.gateio,
      },
    })
  );
});
