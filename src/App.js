import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import Button from "./components/Button";
import FilterButton from "./components/FilterButton";
import axios from "axios";

const FILTER_LIST = {
  All: () => true,
  Completed: (todo) => todo.completed,
  Incompleted: (todo) => !todo.completed,
};

const FILTER_NAME = Object.keys(FILTER_LIST);

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const didGetTodo = async () => {
      const todosFromServer = await getTodos();
      setTodos(todosFromServer);
    };

    didGetTodo();
  }, []);

  async function getTodos() {
    try {
      const res = await axios.get("http://localhost:5000/todos");
      const data = res.data;

      return data;
    } catch (e) {
      setError(e);
    }
  }

  async function getTodo(id) {
    try {
      const res = await axios.get(`http://localhost:5000/todos/${id}`);
      const data = res.data;

      return data;
    } catch (e) {
      setError(e);
    }
  }

  async function deleteTodo(id) {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (e) {
      setError(e);
    }
  }

  function deleteAll() {
    setTodos([]);
  }

  async function addTodo(todo) {
    try {
      const res = await axios.post("http://localhost:5000/todos", {
        task: todo,
        completed: false,
      });
      const data = res.data;

      setTodos([...todos, data]);
    } catch (e) {
      setError(e);
    }
  }

  async function toggleCompleted(id) {
    const todoToToggle = await getTodo(id);
    const updTodo = { ...todoToToggle, completed: !todoToToggle.completed };

    try {
      const res = await axios.put(`http://localhost:5000/todos/${id}`, updTodo);
      const data = res.data;

      setTodos(todos.map((todo) => (todo.id === id ? data : todo)));
    } catch (e) {
      setError(e);
    }
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
      {error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {" "}
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
      )}
    </div>
  );
};

export default App;
