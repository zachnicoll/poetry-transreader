import express from "express";
import { Request, SpeakBody } from "../types";
import TextToSpeech from "@google-cloud/text-to-speech";
import config from "../utils/config";

const API_ENDPOINT = "/speak";
const router = express.Router({ strict: true });
const client = new TextToSpeech.TextToSpeechClient({
  projectId: config.PROJECT_ID,
});

router.post(
  `${API_ENDPOINT}/`,
  async (request: Request<SpeakBody>, response) => {
    try {
      const [speech] = await client.synthesizeSpeech({
        input: { text: request.body.text },
        voice: {
          languageCode: request.body.languageCode,
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
      response.json({ error: error.message });
    }
  }
);

export default router;
