import request from "supertest";
import app from "../../app";
import { shakespeareAuthorData } from "./data/author.data";

it("Fetches the correct poems when searching by author", async () => {
  const res = await request(app).get("/author/Shakespeare/");

  expect(res.status).toBe(200);
  expect(res.body).toStrictEqual(shakespeareAuthorData);
});

it("Responds with a 404 when no poems with the given author could be found", async () => {
  const res = await request(app).get("/title/AuthorMatchingNoPoems/");

  expect(res.status).toBe(404);
});
