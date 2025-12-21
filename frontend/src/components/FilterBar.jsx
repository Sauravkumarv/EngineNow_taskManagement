const FilterBar = ({ status, setStatus, sort, setSort }) => {
  return (
    <div className="flex gap-4 mb-4">
      <select onChange={(e) => setStatus(e.target.value)}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <select onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort</option>
        <option value="priority">Priority</option>
        <option value="dueDate">Due Date</option>
      </select>
    </div>
  );
};

export default FilterBar;
