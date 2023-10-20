import "./App.css";
import useTextToVoice from "./hooks/useTextToVoice";

function App() {
  const { speak, ref } = useTextToVoice();
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
    </div>
  );
}

export default App;
