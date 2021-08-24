import express from "express";
import { Request, SpeakBody } from "../types";
import TextToSpeech from "@google-cloud/text-to-speech";

const API_ENDPOINT = "/speak";
const router = express.Router({ strict: true });
const client = new TextToSpeech.TextToSpeechClient();

router.post(
  `${API_ENDPOINT}/`,
  async (request: Request<SpeakBody>, response) => {
    try {
      const [speech] = await client.synthesizeSpeech({
        input: { text: request.body.text },
        // Select the language and SSML voice gender (optional)
        voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
        // select the type of audio encoding
        audioConfig: { audioEncoding: "MP3" },
      });

      if (!speech.audioContent) {
        throw new Error("Failed to synthesize audio");
      }

      response.writeHead(200, {
        "Content-Type": "audio/mp3",
        "Content-Length": speech.audioContent.length,
      });
      response.write(speech.audioContent, () => response.end());
    } catch (error) {
      response.status(500);
      response.json({ error: error.message });
    }
  }
);

export default router;
