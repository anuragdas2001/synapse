import { useRef } from "react";
// import { Server } from "socket.io";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";
const socket = io("http://localhost:5000");
function App() {
  const editorRef = useRef(null);
   const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Connect to Socket.IO server
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    return () => {
      // Disconnect from Socket.IO server
      socket.disconnect();
    };
  }, []);
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    // console.log(editor)
    // console.log(editorRef.current)
  }

  function showValue() {
    alert(editorRef.current.getValue());
    // socket.emit('chatMessage', 'Hello, server!');
  }
  return (
    <>
      <button onClick={() => showValue()}>Show value</button>
      <Editor
        height="30vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onChange={handleEditorDidMount}
      />
      ;
    </>
  );
}

export default App;
