import app from "../../app";
import request from "supertest";
import { johnTitleData } from "./data/title.data";

it("Fetches the correct poems when searching by title", async () => {
  const res = await request(app).get("/title/John/");

  expect(res.status).toBe(200);
  expect(res.body).toStrictEqual(johnTitleData);
});

it("Responds with a 404 when no poems with the given title could be found", async () => {
  const res = await request(app).get("/title/TitleMatchingNoPoems/");

  expect(res.status).toBe(404);
});
