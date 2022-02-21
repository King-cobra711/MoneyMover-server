const supertest = require("supertest");
const app = require("../index");
const request = supertest(app);

// Good Inputs

describe("Successful tranfer from account A to account B", () => {
  test("Should respond with a 200 status code", async () => {
    const res = await request.post("/moneyToB").send({
      money: 1
    });
    expect(res.statusCode).toBe(200);
  });
});
describe("Successful tranfer from account B to account A", () => {
  test("Should respond with a 200 status code", async () => {
    const res = await request.post("/moneyToB").send({
      money: 5
    });
    expect(res.statusCode).toBe(200);
  });
});

// Bad Inputs

describe("Unsuccessful tranfer from account A to account B. Too many decimals", () => {
  test("Should respond with a 406 status code", async () => {
    const res = await request.post("/moneyToB").send({
      money: 6.2443
    });
    expect(res.statusCode).toBe(406);
  });
});
describe("Unsuccessful tranfer from account A to account B. NAN.", () => {
  test("Should respond with a 406 status code", async () => {
    const res = await request.post("/moneyToB").send({
      money: "Hello World"
    });
    expect(res.statusCode).toBe(406);
  });
});
describe("Unsuccessful tranfer from account B to account A. Must be $1 or higher.", () => {
  test("Should respond with a 406 status code", async () => {
    const res = await request.post("/moneyToB").send({
      money: -49
    });
    expect(res.statusCode).toBe(406);
  });
});
