import React, { useReducer } from 'react';
const SET_TEXT = 'SET_TEXT';

const editorReducer = (state, action) => {
  switch (action.type) {
    case SET_TEXT:
      return { ...state, text: action.payload };
    default:
      return state;
  }
};

const Editor = () => {
  const [state, dispatch] = useReducer(editorReducer, { text: '' });

  const handleTextChange = (event) => {
    dispatch({ type: SET_TEXT, payload: event.target.value });
  };

  return (
    <div>
      <textarea
        value={state.text}
        onChange={handleTextChange}
        className="w-full h-40 p-4 border border-gray-300 rounded mb-4"
        placeholder="Type your text here..."
      />
    </div>
  );
};

export default Editor;
