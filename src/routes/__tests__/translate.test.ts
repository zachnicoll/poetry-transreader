import app from "../../app";
import request from "supertest";
import {
  japaneseTranslation,
  supportedLanguagesData,
} from "./data/translate.data";

const translateText = "This is some test text to be translated!";
const targetLang = "ja";

it("Successfully translates English text to another language", async () => {
  const res = await request(app).post("/translate/").send({
    text: translateText,
    targetLang,
  });

  expect(res.status).toBe(200);
  expect(res.body).toBe(japaneseTranslation);
});

it("Successfully responds with all languages supported by Google Translate API", async () => {
  const res = await request(app).get("/translate/");

  expect(res.status).toBe(200);
  expect(res.body).toStrictEqual(supportedLanguagesData);
});

it("Uses cached supported languages when fetched a second time", async () => {
  const res = await request(app).get("/translate/");

  expect(res.status).toBe(200);
  expect(res.body).toStrictEqual(supportedLanguagesData);
});

it("Responds with status code 500 when no targetLang is supplied", async () => {
  const res = await request(app).post("/translate/").send({
    text: translateText,
  });

  expect(res.status).toBe(500);
});

it("Responds with status code 500 when no text is supplied", async () => {
  const res = await request(app).post("/translate/").send({
    targetLang,
  });

  expect(res.status).toBe(500);
});
