import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import Button from "./components/Button";
import FilterButton from "./components/FilterButton";

const FILTER_LIST = {
  All: () => true,
  Completed: (todo) => todo.completed,
  Incompleted: (todo) => !todo.completed,
};

const FILTER_NAME = Object.keys(FILTER_LIST);

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 0,
      task: "Eat",
      completed: false,
    },
    {
      id: 1,
      task: "Sleep",
      completed: false,
    },
    {
      id: 2,
      task: "Repeat",
      completed: false,
    },
  ]);
  const [filter, setFilter] = useState("All");
  const filterList = FILTER_NAME.map((name) => (
    <FilterButton
      name={name}
      key={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
  const filteredTodo =
    filter === "All" ? todos : todos.filter(FILTER_LIST[filter]);

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function deleteAll() {
    setTodos([]);
  }

  function addTodo(todo) {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTodo = { id, completed: false, task: todo };
    setTodos([...todos, newTodo]);
  }

  function toggleCompleted(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  return (
    <div className="App">
      <Header />
      <div className="form">
        <AddTodo onAdd={addTodo} />
        {todos.length > 0 ? (
          <Button color="red" text="Delete All" onClick={deleteAll} />
        ) : null}
      </div>
      {todos.length > 0 ? filterList : null}
      {filteredTodo.length > 0 ? (
        <Todos
          todos={filteredTodo}
          onDelete={deleteTodo}
          onClick={toggleCompleted}
        />
      ) : (
        <p>No Todos To Show</p>
      )}
    </div>
  );
};

export default App;
