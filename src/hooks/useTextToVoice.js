import { useCallback, useEffect, useRef, useState } from "react";

const useTextToVoice = () => {
  const textContainerRef = useRef();
  const voiceTranscript = useRef("");
  const firstRenderRef = useRef(true);
  const [textContent, setTextContent] = useState("");
  const synth = window.speechSynthesis;

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

  useEffect(() => {
    if (firstRenderRef.current && textContainerRef) {
      const voiceContainer = textContainerRef.current;
      firstRenderRef.current = false;
      extractText(voiceContainer);
    }
    setTextContent(voiceTranscript.current);
  }, [extractText, textContainerRef]);

  function speak() {
    const utterThis = new SpeechSynthesisUtterance(textContent);
    synth.speak(utterThis);
  }

  return { speak, ref: textContainerRef };
};

export default useTextToVoice;
