import { FaTimes } from "react-icons/fa";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

const Todo = ({ todo, onDelete, onClick }) => {
  return (
    <div
      className={`todo ${todo.completed && "completed"}`}
      onClick={() => onClick(todo.id)}
    >
      <h2>{todo.task}</h2>
      {todo.completed ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
      <FaTimes
        style={{ color: "red", cursor: "pointer" }}
        onClick={() => onDelete(todo.id)}
      />
    </div>
  );
};

export default Todo;
