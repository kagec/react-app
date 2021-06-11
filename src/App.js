import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 0,
      task: "Eat",
    },
    {
      id: 1,
      task: "Sleep",
    },
    {
      id: 2,
      task: "Repeat",
    },
  ]);

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function addTodo(todo) {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTodo = { id, task: todo };
    setTodos([...todos, newTodo]);
  }

  return (
    <div className="App">
      <Header />
      <AddTodo onAdd={addTodo} />
      {todos.length > 0 ? (
        <Todos todos={todos} onDelete={deleteTodo} />
      ) : (
        "No Todos To Show"
      )}
    </div>
  );
}

export default App;
