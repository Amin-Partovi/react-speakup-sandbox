import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const useTextToVoice = ({ pitch, rate, volume } = {}) => {
  const textContainerRef = useRef();
  const voiceTranscript = useRef("");
  const firstRenderRef = useRef(true);
  const [textContent, setTextContent] = useState("");
  const synth = window.speechSynthesis;
  
  const utterThis = useMemo(
    () => new SpeechSynthesisUtterance(textContent),
    [textContent]
  );

  const extractText = useCallback((element) => {
    if (!element) return;
    // Check if the element has child nodes
    if (element.childNodes.length > 0) {
      // Loop through the child nodes
      element.childNodes.forEach((child) => {
        if (child.nodeType === 3) {
          // If it's a text node (nodeType 3), add its text content to the result
          voiceTranscript.current += child.textContent;
        } else if (child.nodeType === 1) {
          // If it's an element node (nodeType 1), recursively call the function
          extractText(child);
        }
      });
    }
  }, []);

  utterThis.onerror = (event) => {
    console.log(
      `An error has occurred with the speech synthesis: ${event.error}`
    );
  };

  const voices = synth.getVoices();
  const voiceNames = useMemo(() => voices.map((voice) => voice.name), [voices]);

  useEffect(() => {
    if (firstRenderRef.current && textContainerRef) {
      const voiceContainer = textContainerRef.current;
      firstRenderRef.current = false;
      extractText(voiceContainer);
    }
    setTextContent(voiceTranscript.current);
  }, [extractText, textContainerRef]);

  useEffect(() => {
    if (pitch) {
      utterThis.pitch = pitch;
    }
    if (volume) {
      utterThis.volume = volume;
    }
    if (rate) {
      utterThis.rate = rate;
    }
  }, [utterThis, pitch, volume, rate]);

  function speak() {
    synth.speak(utterThis);
  }

  function pause() {
    synth.pause();
  }

  function resume() {
    synth.resume();
  }

  function setVoice(voice) {
    utterThis.voice = voices.find((item) => item.name === voice);
  }

  return {
    speak,
    pause,
    resume,
    voices: voiceNames,
    setVoice,
    ref: textContainerRef,
  };
};

export default useTextToVoice;
