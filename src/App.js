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
  const [isLoaded, setIsLoaded] = useState(false);
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
      try {
        const todosFromServer = await getTodos();

        setIsLoaded(true);
        setTodos(todosFromServer);
      } catch (e) {
        setIsLoaded(true);
        setError(e);
      }
    };

    didGetTodo();
  }, []);

  async function getTodos() {
    try {
      const { data } = await axios.get("http://localhost:5000/todos");

      await new Promise((r) => setTimeout(r, 3000));

      return data;
    } catch (e) {
      throw new Error("データを取得できませんでした");
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

  async function deleteAll() {
    const todoList = await getTodos();
    try {
      await Promise.all(todoList.map((todo) => deleteTodo(todo.id)));

      setTodos([]);
    } catch (e) {
      setError(e);
    }
  }

  async function addTodo(todo) {
    try {
      const { data } = await axios.post("http://localhost:5000/todos", {
        task: todo,
        completed: false,
      });

      setTodos([...todos, data]);
    } catch (e) {
      setError(e);
    }
  }

  async function toggleCompleted(todo) {
    try {
      const { id } = todo;
      const { data } = await axios.put(`http://localhost:5000/todos/${id}`, {
        ...todo,
        completed: !todo.completed,
      });

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
      ) : !isLoaded ? (
        <div>Loading...</div>
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
