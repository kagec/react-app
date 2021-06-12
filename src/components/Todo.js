import { FaTimes } from "react-icons/fa";

const Todo = ({ todo, onDelete }) => {
  return (
    <div className="todo">
      <h2>{todo.task}</h2>
      <FaTimes
        style={{ color: "red", cursor: "pointer" }}
        onClick={() => onDelete(todo.id)}
      />
    </div>
  );
};

export default Todo;
