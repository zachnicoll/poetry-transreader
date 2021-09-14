import { API } from "API";
import { useState } from "react";

type TAudio = HTMLAudioElement;

interface HookReturn {
  audioBuffer: ArrayBuffer | null;
  convertToAudio: (text: string, languageCode?: string) => Promise<void>;
  loading: boolean;
}

const useTextToSpeech = (): HookReturn => {
  const [audioBuffer, setAudioBuffer] = useState<ArrayBuffer | null>(null);
  const [loading, setLoading] = useState(false);

  const convertToAudio = async (
    text: string,
    languageCode: string = "en-US"
  ): Promise<void> => {
    setLoading(true);

    try {
      const audio = await API.google.textToSpeech(text, languageCode);

      setAudioBuffer(audio);
    } catch (error) {
      console.error(error);
      alert("Failed to convert that poem to audio :(");
    }

    setLoading(false);
  };

  return {
    audioBuffer,
    convertToAudio,
    loading,
  };
};

export default useTextToSpeech;
