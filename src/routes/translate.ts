import {
  LanguageResult,
  Translate,
} from "@google-cloud/translate/build/src/v2";
import express from "express";
import { TranslateBody, Request } from "../types";
import config from "../utils/config";

const API_ENDPOINT = "/translate";
const router = express.Router({ strict: true });
const translate = new Translate({ projectId: config.PROJECT_ID });

// Use this local variable as a 'cache' so we don't spam the API for the same information
let supportedLanguages: LanguageResult[] | null = null;

/**
 * @method GET
 * @description Fetches all the supported languages by the Google Translate API
 * @returns LanguageResult[] or 500 if something goes wrong
 */
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
      response.json({ error: (error as Error).message });
    }
  }
});

/**
 * @method POST
 *
 * @param text The text to be translated
 * @param targetLang The language to translate the text to
 *
 * @description Translate a given text string into another language, based on the supplied targetLang
 * @returns String (translated text) or 500 if something goes wrong
 */
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
      response.json({ error: (error as Error).message });
    }
  }
);

export default router;
