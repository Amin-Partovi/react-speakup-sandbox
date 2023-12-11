import { useMemo, useRef, useState } from "react";

const useVoiceToText = (
  { lang, continuous } = { lang: undefined, continuous: true }
) => {
  const [text, setText] = useState("");
  const isContinuous = useRef(continuous);

  const SpeechRecognition = useMemo(
    () => window.SpeechRecognition || window.webkitSpeechRecognition,
    []
  );

  let recognition = new SpeechRecognition();

  if (lang) {
    recognition.lang = lang;
  }

  recognition.onerror = (event) => {
    console.error(`Speech recognition error detected: ${event.error}`);
  };

  function start() {
    recognition.start();
    if (continuous) {
      isContinuous.current = true;
    }
  }

  function stop() {
    recognition.stop();
    isContinuous.current = false;
  }

  recognition.onend = () => {
    if (isContinuous.current) {
      start();
    }
  };

  recognition.onresult = (event) => {
    setText((text) => text + " " + event.results[0][0].transcript);
  };

  return { start, stop, text };
};

export default useVoiceToText;
