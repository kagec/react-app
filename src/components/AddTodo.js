import React, { useState } from "react";

const AddTodo = ({ onAdd }) => {
  const [task, setTask] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    if (!task) {
      alert("Please add a todo");
      return;
    }

    onAdd(task);

    setTask("");
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Todo"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input type="submit" value="Add" />
    </form>
  );
};

export default AddTodo;
