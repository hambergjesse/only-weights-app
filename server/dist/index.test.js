"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("./index");
describe("Server", () => {
    it("should turn on", async () => {
        const res = await (0, supertest_1.default)(index_1.app).get("/");
        expect(res.status).toEqual(404);
    });
});
