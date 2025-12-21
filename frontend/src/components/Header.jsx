const Header = ({ onAdd }) => {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <button
        onClick={onAdd}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
    </header>
  );
};

export default Header;
