const app = require("../../server/server");
const supertest = require("supertest");
const request = supertest(app);

describe("Test server endpoint", () => {
  it("get test endpoint", function (done) {
    request
      .get("/testingServer")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(JSON.stringify({ test: "test is succesful" }))
      .expect(200, done);
  });
});
