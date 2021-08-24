import { Translate } from "@google-cloud/translate/build/src/v2";
import express from "express";
import { TranslateBody, Request, SupportedLanguage } from "../types";
import config from "../utils/config";

const API_ENDPOINT = "/translate";
const router = express.Router({ strict: true });
const translate = new Translate({ projectId: config.PROJECT_ID });

// Use this local variable as a 'cache' so we don't spam the API for the same information
let supportedLanguages: SupportedLanguage[] | null = null;

router.get(`${API_ENDPOINT}/`, async (request, response) => {
  // Use 'cache' if this request has been made before
  if (supportedLanguages) {
    response.json(supportedLanguages);
  } else {
    try {
      const [languages] = await translate.getLanguages();
      supportedLanguages = languages;
      response.json(languages);
    } catch (error) {
      response.status(500);
      response.json({ error: error.message });
    }
  }
});

router.post(
  `${API_ENDPOINT}/`,
  async (request: Request<TranslateBody>, response) => {
    const text = request.body.text;
    const targetLang = request.body.targetLang;

    try {
      const [translation] = await translate.translate(text, targetLang);
      response.json(translation);
    } catch (error) {
      response.status(500);
      response.json({ error: error.message });
    }
  }
);

export default router;
