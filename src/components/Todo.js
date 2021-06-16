import { FaTimes } from "react-icons/fa";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

const Todo = ({ todo, onDelete, onClick }) => {
  return (
    <div className={`todo ${todo.completed ? "completed" : ""}`}>
      <h2>{todo.task}</h2>
      {todo.completed ? (
        <ImCheckboxChecked onClick={() => onClick(todo)} />
      ) : (
        <ImCheckboxUnchecked onClick={() => onClick(todo)} />
      )}
      <FaTimes
        style={{ color: "red", cursor: "pointer" }}
        onClick={() => onDelete(todo.id)}
      />
    </div>
  );
};

export default Todo;
