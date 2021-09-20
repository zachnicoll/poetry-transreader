import app from "../../app";
import request from "supertest";

it("Fetches the correct amount of random poems", async () => {
  const res = await request(app).get("/random/20/");

  expect(res.status).toBe(200);
  expect(res.body.length).toBe(20);
});

it("Responds with status code 500 when an invalid number is supplied", async () => {
  const res = await request(app).get("/random/not_a_number/");

  expect(res.status).toBe(500);
});
