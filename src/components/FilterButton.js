const FilterButton = ({ name, isPressed, setFilter }) => {
  return (
    <button
      className="btn btn-filter"
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      {name}
    </button>
  );
};

export default FilterButton;
