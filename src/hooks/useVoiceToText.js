import { useState } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const useVoiceToText = () => {
  const [text, setText] = useState("");
  let recognition = new SpeechRecognition();
  let subscribers = [];

  function start() {
    recognition.start();
    subscribers.push(start);
  }

  function stop() {
    recognition.stop();
    subscribers = [];
  }

  recognition.onend = () => {
    if (subscribers.length > 0) {
      subscribers[0]();
    } else {
      console.log("Nothing to execute.");
    }
  };

  recognition.onresult = (event) => {
    setText((text) => text + " " + event.results[0][0].transcript);
  };

  return { start, stop, text };
};

export default useVoiceToText;
