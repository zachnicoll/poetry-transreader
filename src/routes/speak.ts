import express from "express";
import { Request, SpeakBody, VoiceList } from "../types";
import TextToSpeech from "@google-cloud/text-to-speech";
import config from "../utils/config";

const API_ENDPOINT = "/speak";
const router = express.Router({ strict: true });
const client = new TextToSpeech.TextToSpeechClient({
  projectId: config.PROJECT_ID,
});

let voiceList: VoiceList | null = null;

router.post(
  `${API_ENDPOINT}/`,
  async (request: Request<SpeakBody>, response) => {
    try {
      if (!voiceList) {
        const [voices] = await client.listVoices();
        voiceList =
          (voices.voices
            ?.map((voice) => voice.languageCodes)
            .flatMap((lang) => lang)
            .filter((lang) => !!lang) as VoiceList) ?? null;
      }

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
