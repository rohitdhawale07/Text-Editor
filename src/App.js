// src/App.js
import React, { useReducer, useState } from "react";
import Editor from "./components/Editor";

const SET_TEXT = "SET_TEXT";

const editorReducer = (state, action) => {
  switch (action.type) {
    case SET_TEXT:
      return { ...state, text: action.payload };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(editorReducer, { text: "" });
  const [formattedText, setFormattedText] = useState("");
  const [mode, setMode] = useState(false);

  const handleTextChange = (event) => {
    const newText = event.target.value;
    dispatch({ type: SET_TEXT, payload: newText });

    const formattedText = newText.toLowerCase();
    setFormattedText(formattedText);
  };

  const convertToUppercase = () => {
    const uppercaseText = state.text.toUpperCase();
    setFormattedText(uppercaseText);
    dispatch({ type: SET_TEXT, payload: uppercaseText });
  };

  const convertToLowercase = () => {
    const lowercaseText = state.text.toLowerCase();
    setFormattedText(lowercaseText);
    dispatch({ type: SET_TEXT, payload: lowercaseText });
  };

  const clearText = () => {
    dispatch({ type: SET_TEXT, payload: "" });
    setFormattedText("");
  };

  const copyToClipboard = () => {
    try {
      navigator.clipboard
        .writeText(state.text)
        .then(() => {
          alert("Text copied to clipboard!");
        })
        .catch((err) => {
          console.error(
            "Unable to copy text to clipboard. Falling back to manual copy."
          );
          fallbackCopyTextToClipboard();
        });
    } catch (err) {
      console.error(
        "Unable to copy text to clipboard. Falling back to manual copy."
      );
      fallbackCopyTextToClipboard();
    }
  };

  const fallbackCopyTextToClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.value = state.text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Text copied to clipboard (fallback method).");
  };

  const removeExtraSpaces = () => {
    const cleanedText = state.text.replace(/\s+/g, " ").trim();
    dispatch({ type: SET_TEXT, payload: cleanedText });
    setFormattedText(cleanedText);
  };

  const calculateReadingTime = () => {
    const words = state.text.split(/\s+/).filter((word) => word !== "");
    const wordsPerMinute = 200;
    const readingTimePerWord = words.map((word) => Math.ceil(word.length / 5));
    const totalReadingTime = readingTimePerWord.reduce(
      (total, time) => total + time,
      0
    );

    return totalReadingTime;
  };

  const togglemode = () => {
    if (mode === "dark") {
      setMode("light");
      document.body.style.background =
        "white";
        document.body.style.color =
        "black";
    } else {
      setMode("dark");
      document.body.style.background =
        "black";
        document.body.style.color =
        "white";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end mb-4">
        <button
          className="bg-gray-800 text-white p-2 rounded"
          onClick={togglemode}
        >
          {mode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-4">
        TextUtils - Word Counter, Character Counter, Remove Extra Space
      </h1>

      <textarea
        value={state.text}
        onChange={handleTextChange}
        className="w-full h-40 p-4 border border-gray-300 rounded mb-4"
        placeholder="Type your text here..."
      />

      <div className="flex space-x-4 mb-4">
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={convertToUppercase}
        >
          Convert Uppercase
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={convertToLowercase}
        >
          Convert Lowercase
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded"
          onClick={clearText}
        >
          Clear Text
        </button>
        <button
          className="bg-green-500 text-white p-2 rounded"
          onClick={copyToClipboard}
        >
          Copy to Clipboard
        </button>
        <button
          className="bg-purple-500 text-white p-2 rounded"
          onClick={removeExtraSpaces}
        >
          Remove Extra Spaces
        </button>
      </div>

      <h2 className="text-xl font-bold mb-2">Summary Of Your Text</h2>
      <p>
        Number of words:{" "}
        {state.text.split(/\s+/).filter((word) => word !== "").length}
      </p>
      <p>Number of characters: {state.text.length}</p>
      <p>Reading Time: {calculateReadingTime()} seconds</p>

      <h2 className="text-xl font-bold mt-4 mb-2">Formatted Text Preview</h2>
      <div className="border border-gray-300 p-4 rounded">
        <p>{formattedText}</p>
      </div>
    </div>
  );
};

export default App;
