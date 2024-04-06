import { useRef, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { User } from "./components/User";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { EditorComp } from "./components/Editor";
import { SignUp } from "./components/Signup";
import { SignIn } from "./components/Signin";
// Initialize the connection
const socket = io("http://localhost:5000");

function App() {
  const [text, setText] = useState("");
  const [user, setUserr] = useState(["Anurag", "Babai"]);
  const [userStatus, setUserStatus] = useState({});
  const editorRef = useRef(null);
  useEffect(() => {
    // Event listener for receiving messages from the server
    socket.on("hello", (data) => {
      console.log("Message from server:", data);
    });

    socket.on("user-status", (status) => {
      setUserStatus(status);
    });
    socket.on("reflect", (textvalue) => {
      setText(textvalue);
      console.log(textvalue);
    });
    // Clean up event listener when component unmounts
    return () => {
      socket.off("hello");
      socket.off("user-status");
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
    // Save editor instance to ref
    editorRef.current = editor;

    // Listen for cursor position changes
    editor.onDidChangeCursorPosition((e) => {
      // Get current cursor position
      const position = editor.getPosition();

      // Get username for the current cursor position
      const username = getUsernameAtPosition(position);

      // Update decorators to show username next to the cursor
      editor.deltaDecorations(
        [],
        [
          {
            range: new monaco.Range(
              position.lineNumber,
              position.column,
              position.lineNumber,
              position.column
            ),
            options: {
              inlineClassName: "cursorDecoration",
              hoverMessage: {
                value: `User: ${username}`,
              },
            },
          },
        ]
      );
    });
  }
  function handleEditorChange(value, event) {
    // Update the text state when editor value changes
    console.log("Inside handleEditorChange");
    console.log(value);
    setText(value);

    // Emit the updated text to the server
    socket.emit("editor-change", value);
  }

  // Function to get the username at a given cursor position
  function getUsernameAtPosition(position) {
    const lineNumber = position.lineNumber;
    const column = position.column;
    const usernames = Object.keys(userStatus);

    // Iterate over usernames and check if the cursor position falls within any user's range
    for (const username of usernames) {
      const userPosition = userStatus[username].position;
      if (
        userPosition &&
        userPosition.lineNumber === lineNumber &&
        userPosition.column === column
      ) {
        return username;
      }
    }

    return "Unknown";
  }
  // Function to show the current editor value
  function showValue() {
    alert(text);
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <EditorComp
            text={text}
            handleEditorChange={handleEditorChange}
            handleEditorDidMount={handleEditorDidMount}
          />
          <User user={user} userStatus={userStatus} />
        </>
      ),
    },
    {
      path:"/SignUp",
      element:<SignUp/>
    },
    {
      path:"/SignIn",
      element:<SignIn/>
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;