import express from "express";
import { Request, SpeakBody } from "../types";
import TextToSpeech from "@google-cloud/text-to-speech";

const API_ENDPOINT = "/speak";
const router = express.Router({ strict: true });
const client = new TextToSpeech.TextToSpeechClient();

router.post(
  `${API_ENDPOINT}/`,
  async (request: Request<SpeakBody>, response) => {
    const [speech] = await client.synthesizeSpeech({
      input: { text: request.body.text },
      // Select the language and SSML voice gender (optional)
      voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
      // select the type of audio encoding
      audioConfig: { audioEncoding: "MP3" },
    });

    response.writeHead(200, {
      "Content-Type": "audio/mp3",
      "Content-Length": speech.audioContent?.length ?? 0,
    });
    response.write(speech.audioContent, () => response.end());
  }
);

export default router;
