import { Check, Pencil, Trash2, Calendar, Clock } from 'lucide-react';

const TaskCard = ({ task, onEdit, onToggle, onDelete }) => {
  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;
  const dueDate = new Date(task.dueDate);
  const today = new Date();
  const isToday = dueDate.toDateString() === today.toDateString();
  
  return (
    <div className={`relative p-4 bg-white rounded-lg shadow border ${
      task.completed 
        ? 'border-gray-200 opacity-75' 
        : isOverdue 
        ? 'border-red-200' 
        : 'border-gray-200'
    }`}>
      <div className="flex gap-3">
        <button
          onClick={() => onToggle(task._id)}
          className={`px-3 py-1 rounded text-xs font-medium transition-all ${
            task.completed
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          title={task.completed ? 'Click to mark as pending' : 'Click to mark as completed'}
        >
          {task.completed ? 'Completed' : 'Pending'}
        </button>

        <div className="flex-1">
          <h3 className={`font-medium mb-1 ${
            task.completed ? 'text-gray-500' : 'text-gray-900'
          }`}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className="text-sm text-gray-600 mb-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-2 text-xs">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span className={isOverdue && !task.completed ? 'text-red-600 font-medium' : 'text-gray-500'}>
              {dueDate.toLocaleDateString()}
            </span>
            {isOverdue && !task.completed && (
              <span className="text-red-600">• Overdue</span>
            )}
          </div>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-gray-50 rounded"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-gray-50 rounded"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};



export default TaskCard;