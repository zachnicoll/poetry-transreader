import { useEffect, useRef, useState } from 'react';

interface HookReturn {
  playAudio: (audioBuffer: ArrayBuffer) => void;
  isPlaying: boolean;
}

const usePlayAudio = (): HookReturn => {
  const [isPlaying, setIsPlaying] = useState(false);

  const audioContext = useRef<AudioContext | null>(null);
  const audioSource = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    audioContext.current = new AudioContext();
  }, []);

  const playAudio = async (audioBuffer: ArrayBuffer): Promise<void> => {
    const audioCtx = audioContext.current;
    const audioSrc = audioSource.current;

    if (isPlaying) {
      audioSrc?.stop(0);
      setIsPlaying(false);
    }

    if (audioCtx) {
      try {
        // Decode audio ArrayBuffer
        const decodedBuffer = await audioCtx.decodeAudioData(audioBuffer);

        // Create new audio source and assign properties
        const newSrc = audioCtx.createBufferSource();
        newSrc.buffer = decodedBuffer;
        newSrc.connect(audioCtx.destination);
        newSrc.addEventListener('ended', () => setIsPlaying(false));

        // Play the audio
        audioSource.current = newSrc;
        audioSource.current.start(0);

        setIsPlaying(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return { playAudio, isPlaying };
};

export default usePlayAudio;
