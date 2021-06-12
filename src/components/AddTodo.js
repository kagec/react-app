import React, { useState } from "react";

const AddTodo = ({ onAdd }) => {
  const [task, setTask] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    if (!task) {
      alert("Please add a todo");
      return;
    }

    if (!task.match(/\S/)) {
      alert("Please add a todo");
      setTask("");
      return;
    }

    onAdd(task);

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
