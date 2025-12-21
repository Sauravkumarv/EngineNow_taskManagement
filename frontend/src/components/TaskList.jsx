import TaskCard from "./TaskCard";
const TaskList = ({ tasks, onEdit, onToggle, onDelete }) => {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks yet</p>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
