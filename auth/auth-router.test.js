const request = require("supertest");

const server = require("../api/server.js");

const db = require("../database/dbConfig.js");

describe("auth-router.js", function() {
  it("runs the tests", function() {
    return expect(true).toBe(true);
  });

  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("register Endpoint", () => {
    it("register endpoint returns 201 CREATED", async () => {
      const response = await request(server)
        .post("/api/auth/register")
        .send({ username: "bob", password: "bobbo" })
        .expect(201);
    });
    it("adds a new user to the database", async () => {
      await request(server)
        .post("/api/auth/register")
        .send({ username: "bill", password: "billo" });

      const users = await db("users");
      expect(users.length).toBe(1);
    });
  });

  describe("login Endpoint", () => {
    it("login endpoint returns 200", async () => {
      await request(server)
        .post("/api/auth/register")
        .send({ username: "bill", password: "billo" });

      await request(server)
        .post("/api/auth/login")
        .send({ username: "bill", password: "billo" })
        .expect(200);
    });
    it("login endpoint to return user with specified details", async () => {
      await request(server)
        .post("/api/auth/register")
        .send({ username: "bill", password: "billo" });

      let authToken = await request(server)
        .post("/api/auth/login")
        .send({ username: "bill", password: "billo" });

      expect(authToken).not.toBeNull();
    });
  });
});
