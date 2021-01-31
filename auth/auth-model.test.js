const Auths = require("./auth-model.js");
const db = require("../database/dbConfig.js");

describe("Auth Model", function() {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("insert auth db helper", function() {
    it("adds a new user to the database", async function() {
      await Auths.addUser({ username: "tod", password: "thegod" });
      const users = await db("users");

      expect(users.length).toBe(1);
    });
  });
  describe("insert auth db helper", function() {
    it("newly added user has username and password", async function() {
      await Auths.addUser({ username: "alice", password: "thegoddess" });
      const users = await db("users");

      expect(users[0].password).toEqual("thegoddess");
      expect(users[0].username).toEqual("alice");
    });
  });
  describe("getById helper", function() {
    it("returns the correct user by ID", async function() {
      await Auths.addUser({ username: "alice", password: "thegoddess" });
      const userById = await Auths.findById(1);

      expect(userById.username).toEqual("alice");
    });
  });
  describe("get by ID helper", function() {
    it("find by id returns a user with a valid password", async function() {
      await Auths.addUser({ username: "alice", password: "thegoddess" });
      const userById = await Auths.findById(1);

      expect(userById.password).not.toBe("anythin");
    });
  });
});
