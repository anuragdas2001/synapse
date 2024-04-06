import Editor from "@monaco-editor/react";
export const EditorComp = ({text,handleEditorChange,handleEditorDidMount}) => {
  return (
    <>
      <Editor
        height="30vh"
        defaultLanguage="javascript"
        value={text} // Pass the current value to the editor
        onChange={handleEditorChange} // Handle value changes
        editorDidMount={handleEditorDidMount} // Handle editor mount
      />
    </>
  );
};
