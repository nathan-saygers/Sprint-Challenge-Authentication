const request = require("supertest");

// const jokesRouter = require("./jokes-router.js");

const server = require("../api/server.js");

describe("jokes-router.js", function() {
  it("runs the tests", function() {
    return expect(true).toBe(true);
  });

  describe("joke route auth", () => {
    it("Jokes route returns 401 without auth token", async () => {
      const response = await request(server).get("/api/jokes");
      expect(response.status).toEqual(401);
    });
  });
  it("should return JSON", function() {
    return request(server)
      .get("/api/jokes")
      .then(res => {
        expect(res.type).toMatch(/json/i);
      });
  });
});
