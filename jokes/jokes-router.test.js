const request = require("supertest");

const jokesRouter = require("./jokes-router.js");

describe("jokes-router.js", function() {
  it("runs the tests", function() {
    return expect(true).toBe(true);
  });

  // describe("index route", () => {
  //   it("should return an OK status from the jokes", async () => {
  //     const response = await request(jokesRouter).get("/");
  //     expect(response.status).toEqual(200);
  //   });
  // });
});
