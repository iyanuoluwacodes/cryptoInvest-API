"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const fastify_1 = __importDefault(require("fastify"));
const dotenv = __importStar(require("dotenv"));
const client_1 = require("@prisma/client");
const sensible_1 = __importDefault(require("@fastify/sensible"));
const cors_1 = __importDefault(require("@fastify/cors"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const moralis_1 = __importDefault(require("moralis"));
//
// To guarantee consistent and predictable behavior of your application, we highly recommend to always load your code as shown below:
// └── plugins (from the Fastify ecosystem)
// └── your plugins (your custom plugins)
// └── decorators
// └── hooks
// └── your services
//
exports.app = (0, fastify_1.default)({
    logger: true,
});
const prisma = new client_1.PrismaClient();
dotenv.config();
// Registering our middlewares
exports.app.register(sensible_1.default);
exports.app.register(cors_1.default, {
    origin: [`${process.env.CLIENT_URL}`, `${process.env.ADMIN_URL}`],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
});
exports.app.register(swagger_1.default);
// app.register(bcrypt, {
//   saltWorkFactor: 8,
// });
// app.register(cookie, {
//   secret: process.env.JWT_SECRET_KEY,
// });
// handle errors in out server
function commitToDB(promise) {
    return __awaiter(this, void 0, void 0, function* () {
        const [error, data] = yield exports.app.to(promise);
        if (error) {
            return exports.app.httpErrors.internalServerError(error.message);
        }
        return data;
    });
}
const PORT = process.env.PORT || 3000;
exports.app.listen({
    port: PORT,
    host: "0.0.0.0",
}, function (err, address) {
    if (err) {
        console.log(err);
    }
    console.log("listenin address:", address);
    console.log(process.env.PORT);
});
exports.app.get("/", () => {
    return " api is active ";
});
exports.app.get("/users/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield commitToDB(prisma.user.findMany());
}));
exports.app.get("/checkTokenApprovals/:address", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!moralis_1.default.Core.isStarted) {
        yield moralis_1.default.start({
            apiKey: "5M2C1HGJJnTiyMnp96IpaIlZ6CPVRA7yxysQY38AI1fDse7p3K6EcIRSOWwpSKCd",
        });
    }
    // const chain = EvmChain.ETHEREUM;
    const response = yield moralis_1.default.EvmApi.token.getErc20Approvals({
        chain: "0x1",
        contractAddresses: [
            "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        ],
        walletAddresses: [req.params.address],
    });
    return response;
}));
exports.app.get("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield commitToDB(prisma.user.findUnique({
        where: {
            id: req.params.id,
        },
    }));
}));
exports.app.post("/users/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield commitToDB(prisma.user.upsert({
        where: {
            id: req.body.walletAddress,
        },
        update: {},
        create: {
            id: req.body.walletAddress,
            nickname: req.body.nickname,
        },
    }));
}));
exports.app.patch("/updateUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield commitToDB(prisma.user.update({
        where: { id: req.body.id },
        data: {
            balance: req.body.balance,
            totalRevenue: req.body.totalRevenue,
            dailyEarning: req.body.dailyEarning,
        },
    }));
}));
exports.app.get("/fetchPrices/ETHUSDC", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield commitToDB(prisma.ethUSDCPair.findFirst({
        where: { id: "ETHUSDC" },
    }));
}));
exports.app.patch("/updatePrices/ETHUSDC", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield commitToDB(prisma.ethUSDCPair.update({
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
    }));
}));
