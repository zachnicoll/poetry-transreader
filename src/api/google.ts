import { axiosInstance } from "./config";
import { LanguageResult, TranslateResponse } from "./types";

const TRANSLATE_ENDPOINT = "/translate";
const SPEAK_ENDPOINT = "/speak";

export const translate = async (
  text: string,
  targetLang: string
): Promise<TranslateResponse> => {
  const translatedText = await axiosInstance.post<TranslateResponse>(
    `${TRANSLATE_ENDPOINT}/`,
    {
      text,
      targetLang,
    }
  );

  return translatedText.data;
};

export const supportedLanguages = async (): Promise<LanguageResult[]> => {
  const languages = await axiosInstance.get<LanguageResult[]>(
    `${TRANSLATE_ENDPOINT}/`
  );
  return languages.data;
};

export const textToSpeech = async (
  text: string,
  languageCode: string
): Promise<Blob> => {
  const audio = await axiosInstance.post<ArrayBuffer>(`${SPEAK_ENDPOINT}/`, {
    text,
    languageCode,
  });

  // Convert array buffer to MP3 Blob
  const blob = new Blob([audio.data], { type: "audio/mp3" });
  return blob;

  // TODO: MAke this work!!

  // console.log("BLOB: ", blob);

  // // Create a local URL that can be used to play the audio
  // return URL.createObjectURL(blob);
};
