const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const useVoiceToText = () => {
  let recognition = new SpeechRecognition();
  recognition.continuous = true;

  function start() {
    recognition.start();
  }

  function stop() {
    recognition.stop();
  }

  recognition.onspeechend = () => {
    recognition.stop();
  };

  recognition.onresult = (event) => {
    console.log(event);
  };

  return { start, stop };
};

export default useVoiceToText;
