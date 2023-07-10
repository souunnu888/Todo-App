import { useState } from "react";

export default function AddTodo(props) {
  const {editTaskId,inputValue,handleKeyPress,handleChange,editTask,cancelEdit} = props;


  return (
    <>
      <input
        onKeyDown={handleKeyPress}
        className="input"
        type="text"
        onChange={handleChange}
        value={inputValue}
        placeholder="+ Add a Task"
      />
      {editTaskId ? (
          <>
            <button className="edit--save" onClick={editTask}>Save</button>
            <button className="edit--cancel" onClick={cancelEdit}>Cancel</button>
          </>) : ""
          }
    </>
  );
}
