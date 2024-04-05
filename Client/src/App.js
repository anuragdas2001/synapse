import { useRef, useState, useEffect } from "react";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";

// Initialize the connection
const socket = io("http://localhost:5000");

function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    // Event listener for receiving messages from the server
    socket.on("hello", (data) => {
      console.log("Message from server:", data);
    });
    socket.on("reflect", (textvalue) => {
      setText(textvalue)
      console.log(textvalue);
    });
    // Clean up event listener when component unmounts
    return () => {
      socket.off("hello");
    };
  }, []);

  // Function to handle changes in the editor
  function handleEditorChange(value, event) {
    // Update the text state when editor value changes
    console.log("Inside handleEditorChange");
    console.log(value);
    setText(value);

    // Emit the updated text to the server
    socket.emit("editor-change", value);
  }

  // Function to handle editor mount
  function handleEditorDidMount(editor, monaco) {
    // You can use 'editor' and 'monaco' here
  }

  // Function to show the current editor value
  function showValue() {
    alert(text);
  }

  return (
    <>
      <button onClick={showValue}>Show value</button>
      <Editor
        height="30vh"
        defaultLanguage="javascript"
        value={text} // Pass the current value to the editor
        onChange={handleEditorChange} // Handle value changes
        editorDidMount={handleEditorDidMount} // Handle editor mount
      />
    </>
  );
}

export default App;
