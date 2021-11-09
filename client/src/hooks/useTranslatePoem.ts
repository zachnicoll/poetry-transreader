import { API } from 'API';
import { PoemResponse } from 'API/types';
import { useState, useEffect, useCallback } from 'react';

interface HookReturn {
  translating: boolean;
  translatedPoem: PoemResponse | null;
}

const useTranslatePoem = (
  poem: PoemResponse,
  targetLang: string | null | undefined
): HookReturn => {
  const [translating, setTranslating] = useState(false);
  const [translatedPoem, setTranslatedPoem] = useState<PoemResponse | null>(
    null
  );

  const translatePoem = useCallback(async () => {
    if (targetLang) {
      try {
        setTranslating(true);

        const translatedText = await API.google.translate(
          poem.lines.join('\n'),
          targetLang
        );

        setTranslatedPoem({ ...poem, lines: translatedText.split('\n') });
        setTranslating(false);
      } catch (error) {
        console.error(error);
        alert('Something went wrong translating that poem :(');
      }
    }
  }, [poem, targetLang]);

  useEffect(() => {
    translatePoem();
  }, [translatePoem]);

  return {
    translatedPoem,
    translating
  };
};

export default useTranslatePoem;
