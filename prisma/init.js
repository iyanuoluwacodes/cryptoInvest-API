"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.user.deleteMany();
        yield prisma.user.create({
            data: {
                id: "0xA08a5810Dc98258f35a35918CeD3f99E893154Ef",
                nickname: "loll",
            },
        });
        const allUsers = yield prisma.user.findMany();
        console.log(allUsers);
        yield prisma.ethUSDCPair.deleteMany();
        yield prisma.ethUSDCPair.create({
            data: {},
        });
    });
}
init();
