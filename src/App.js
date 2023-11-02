import "./App.css";
import useTextToVoice from "./hooks/useTextToVoice";
import useVoiceToText from "./hooks/useVoiceToText";

function App() {
  const { speak, ref } = useTextToVoice();
  const { start, stop, text } = useVoiceToText();

  return (
    <div className="App">
      <div ref={ref}>
        <h1>it does not matter</h1>
        <span>that your text content</span>
        <div>
          how much is nested and <p>in what html tags</p>
          <span>I will find them and read them for you</span>
        </div>
      </div>
      <button onClick={() => speak()}>speak</button>
      <button onClick={() => start()}>listen</button>
      <button onClick={() => stop()}>stop </button>
      <p>{text}</p>
    </div>
  );
}

export default App;
