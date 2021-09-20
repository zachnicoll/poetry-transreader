import app from "../../app";
import request from "supertest";

it("Fetches the correct amount of random poems", async () => {
  const res = await request(app).get("/random/20/");

  expect(res.status).toBe(200);
  expect(res.body.length).toBe(20);
});
