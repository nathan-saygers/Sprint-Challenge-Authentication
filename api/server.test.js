const request = require("supertest");

const server = require("./server.js");

describe("server.js", () => {
  describe("index route", () => {
    it("should return an OK status from the index route", async () => {
      const response = await request(server).get("/");
      expect(response.status).toEqual(200);
    });
    it("should return a JSON object from index", async () => {
      const response = await request(server).get("/");
      expect(response.type).toEqual("application/json");
    });
    it("should run in the testing environment", function() {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });
});
