import Todo from "./Todo";

const Todos = ({ todos, onDelete, onClick }) => {
  return (
    <>
      {todos.map((todo, index) => (
        <Todo key={index} todo={todo} onDelete={onDelete} onClick={onClick} />
      ))}
    </>
  );
};

export default Todos;
