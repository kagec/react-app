import { FaTimes } from "react-icons/fa";

const Todo = ({ todo, onDelete }) => {
  return (
    <div className="todo">
      <h2>
        {todo.task}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(todo.id)}
        />
      </h2>
    </div>
  );
};

export default Todo;
