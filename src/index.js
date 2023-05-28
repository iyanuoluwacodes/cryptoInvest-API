"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var fastify_1 = require("fastify");
var dotenv = require("dotenv");
var client_1 = require("@prisma/client");
var sensible_1 = require("@fastify/sensible");
var cors_1 = require("@fastify/cors");
var swagger_1 = require("@fastify/swagger");
var moralis_1 = require("moralis");
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
var prisma = new client_1.PrismaClient();
dotenv.config();
// Registering our middlewares
exports.app.register(sensible_1.default);
exports.app.register(cors_1.default, {
  origin: "https://localhost:5174",
  credentials: true,
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
  return __awaiter(this, void 0, void 0, function () {
    var _a, error, data;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          return [4 /*yield*/, exports.app.to(promise)];
        case 1:
          (_a = _b.sent()), (error = _a[0]), (data = _a[1]);
          if (error) {
            return [
              2 /*return*/,
              exports.app.httpErrors.internalServerError(error.message),
            ];
          }
          return [2 /*return*/, data];
      }
    });
  });
}
var PORT = process.env.PORT || 3000;
exports.app.listen(
  {
    port: PORT,
    host: "0.0.0.0",
  },
  function (err, address) {
    if (err) {
      console.log(err);
    }
    console.log("listenin address:", address);
    console.log(process.env.PORT);
  }
);
exports.app.get("/", function () {
  return " api is active ";
});
exports.app.get("/users/all", function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, commitToDB(prisma.user.findMany())];
        case 1:
          return [2 /*return*/, _a.sent()];
      }
    });
  });
});
exports.app.get("/checkTokenApprovals/:address", function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (!!moralis_1.default.Core.isStarted) return [3 /*break*/, 2];
          return [
            4 /*yield*/,
            moralis_1.default.start({
              apiKey:
                "5M2C1HGJJnTiyMnp96IpaIlZ6CPVRA7yxysQY38AI1fDse7p3K6EcIRSOWwpSKCd",
            }),
          ];
        case 1:
          _a.sent();
          _a.label = 2;
        case 2:
          return [
            4 /*yield*/,
            moralis_1.default.EvmApi.token.getErc20Approvals({
              chain: "0x1",
              contractAddresses: [
                "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                "0xdAC17F958D2ee523a2206206994597C13D831ec7",
                "0x6B175474E89094C44Da98b954EedeAC495271d0F",
              ],
              walletAddresses: [req.params.address],
            }),
          ];
        case 3:
          response = _a.sent();
          return [2 /*return*/, response];
      }
    });
  });
});
exports.app.get("/users/:id", function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            commitToDB(
              prisma.user.findUnique({
                where: {
                  id: req.params.id,
                },
              })
            ),
          ];
        case 1:
          return [2 /*return*/, _a.sent()];
      }
    });
  });
});
exports.app.post("/users/add", function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            commitToDB(
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
            ),
          ];
        case 1:
          return [2 /*return*/, _a.sent()];
      }
    });
  });
});
exports.app.patch("/updateUser", function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            commitToDB(
              prisma.user.update({
                where: { id: req.body.id },
                data: {
                  balance: req.body.balance,
                  totalRevenue: req.body.totalRevenue,
                  dailyEarning: req.body.dailyEarning,
                },
              })
            ),
          ];
        case 1:
          return [2 /*return*/, _a.sent()];
      }
    });
  });
});
exports.app.get("/fetchPrices/ETHUSDC", function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            commitToDB(
              prisma.ethUSDCPair.findFirst({
                where: { id: "ETHUSDC" },
              })
            ),
          ];
        case 1:
          return [2 /*return*/, _a.sent()];
      }
    });
  });
});
exports.app.patch("/updatePrices/ETHUSDC", function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            commitToDB(
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
            ),
          ];
        case 1:
          return [2 /*return*/, _a.sent()];
      }
    });
  });
});
