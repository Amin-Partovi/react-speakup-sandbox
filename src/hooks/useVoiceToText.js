import { useRef, useState } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const useVoiceToText = () => {
  const [text, setText] = useState("");
  const continuous = useRef(true);

  let recognition = new SpeechRecognition();

  function start() {
    recognition.start();
  }

  function stop() {
    recognition.stop();
    continuous.current = false;
  }

  recognition.onend = () => {
    if (continuous.current) {
      start();
    }
  };

  recognition.onresult = (event) => {
    setText((text) => text + " " + event.results[0][0].transcript);
  };

  return { start, stop, text };
};

export default useVoiceToText;
