const request = require("supertest");
const server = require("../server");

describe("GET /sell ENDPOINT", () => {
  it("respond with json containing a list of all devices", () => {
    request(server)
      .get("/sell")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
