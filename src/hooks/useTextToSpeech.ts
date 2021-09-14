import { API } from "API";
import { useState } from "react";

type TAudio = HTMLAudioElement;

interface HookReturn {
  audioSrc: Blob | null;
  convertToAudio: (text: string, languageCode?: string) => Promise<void>;
  loading: boolean;
}

const useTextToSpeech = (): HookReturn => {
  const [audioSrc, setAudioSrc] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);

  const convertToAudio = async (
    text: string,
    languageCode: string = "en-US"
  ): Promise<void> => {
    setLoading(true);

    try {
      const audioBlob = await API.google.textToSpeech(text, languageCode);

      // TODO: Make this work!

      setAudioSrc(audioBlob);
    } catch (error) {
      console.error(error);
      alert("Failed to convert that poem to audio :(");
    }

    setLoading(false);
  };

  return {
    audioSrc,
    convertToAudio,
    loading,
  };
};

export default useTextToSpeech;
