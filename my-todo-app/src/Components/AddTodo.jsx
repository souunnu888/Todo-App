import { useState } from "react";

export default function AddTodo(props) {
  const [text, setText] = useState("");
  const { handleAddTodo } = props;

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        text && handleAddTodo(text);
        setText("");
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };


  return (
    <>
      <input
        onKeyDown={handleKeyPress}
        className="input"
        type="text"
        onChange={handleChange}
        value={text}
        placeholder="+ Add a Task"
      />
    </>
  );
}
