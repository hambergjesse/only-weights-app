import request from "supertest";
import { app } from "./index";

describe("Server", () => {
	it("should turn on", async () => {
		const res = await request(app).get("/");

		expect(res.status).toEqual(404);
	});
});
