const request = require("supertest");
const server = require("../server");

describe("GET /buy ENDPOINT", () => {
  it("respond with json containing a list of all buy request devices", () => {
    request(server)
      .get("/buy")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
