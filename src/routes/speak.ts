import express from "express";
import { Request, SpeakBody, VoiceList } from "../types";
import TextToSpeech from "@google-cloud/text-to-speech";
import config from "../utils/config";

const API_ENDPOINT = "/speak";
const router = express.Router({ strict: true });
const client = new TextToSpeech.TextToSpeechClient({
  projectId: config.PROJECT_ID,
});

// Quick 'caching' solution so the voice list from GCP is fetched once per server run
let voiceListCache: VoiceList | null = null;

/**
 * Retrieves all the available voice language codes from Google Text-to-Speech API and
 * stores them in the voiceListCache variable. Uses voiceListCache instead if voices have
 * been stored previously.
 * @returns List of supported voice langauge codes for use with Googe Text-to-Speech
 */
const fetchAndFlattenVoiceList = async (): Promise<VoiceList | null> => {
  if (!voiceListCache) {
    // Get all available voices if we haven't already
    const [voices] = await client.listVoices();

    // Convert the nested array structure to a flat array of language codes,
    // and remove any null/undefined values
    voiceListCache =
      (voices.voices
        ?.map((voice) => voice.languageCodes)
        .flatMap((lang) => lang)
        .filter((lang) => !!lang) as VoiceList) ?? null;
  }

  return voiceListCache;
};

/**
 * @method POST
 *
 * @param text The text to synthesize to audio
 * @param languageCode The language code to be used to synthesize the audio, necessary for languages other than English
 *
 * @description Takes a given string of text and converts it to a byte array before being sent back to the client
 * @returns Byte array in the format of audio/wav, or 500 error response if something goes wrong
 */
router.post(
  `${API_ENDPOINT}/`,
  async (request: Request<SpeakBody>, response) => {
    try {
      // Validate input here because the errors that GCP API returns are not nice to look at
      if (!request.body.languageCode)
        throw new Error("Body 'langaugeCode' property not supplied");

      if (!request.body.text)
        throw new Error("Body 'text' property not supplied");

      const voiceList = await fetchAndFlattenVoiceList();

      // Quick and dirty way of figuring out what language code should be used in text-to-speech,
      // just by using a language code in a different format from the Translate API
      const nearestLanguageCode =
        voiceList?.find((lang) => lang.includes(request.body.languageCode)) ??
        "en-US";

      const [speech] = await client.synthesizeSpeech({
        input: { text: request.body.text },
        voice: {
          languageCode: nearestLanguageCode,
          ssmlGender: "NEUTRAL",
        },

        // Use .wav file format
        audioConfig: { audioEncoding: "LINEAR16" },
      });

      if (!speech.audioContent) {
        throw new Error("Failed to synthesize audio");
      }

      response.writeHead(200, {
        "Content-Type": "audio/wav",
        "Content-Length": speech.audioContent.length,
      });
      response.end(speech.audioContent);
    } catch (error) {
      console.error(error);

      response.status(500);
      response.json({ error: (error as Error).message });
    }
  }
);

export default router;
