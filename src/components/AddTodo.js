import React, { useState } from "react";

const AddTodo = ({ onAdd }) => {
  const [task, setTask] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    const trimmed = task.trim();

    if (!trimmed) {
      alert("Please add a todo");
      setTask(trimmed);
      return;
    }

    onAdd(trimmed);

    setTask("");
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Todo"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input className="btn" type="submit" value="Add" />
    </form>
  );
};

export default AddTodo;
