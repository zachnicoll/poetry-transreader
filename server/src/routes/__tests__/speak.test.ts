import app from "../../app";
import request from "supertest";

const englishText = "English text to speak";
const japaneseText = "これは翻訳されるいくつかのテストテキストです！";

it("Successfully converts English text to audio", async () => {
  const res = await request(app).post("/speak/").send({
    text: englishText,
    languageCode: "en",
  });

  expect(res.status).toBe(200);
});

it("Successfully converts non-English text to audio", async () => {
  const res = await request(app).post("/speak/").send({
    text: japaneseText,
    languageCode: "ja",
  });

  expect(res.status).toBe(200);
});

it("Responds with status code 500 when no languageCode is supplied", async () => {
  const res = await request(app).post("/speak/").send({
    text: englishText,
  });

  expect(res.status).toBe(500);
});

it("Responds with status code 500 when no text is supplied", async () => {
  const res = await request(app).post("/speak/").send({
    languageCode: "en",
  });

  expect(res.status).toBe(500);
});
