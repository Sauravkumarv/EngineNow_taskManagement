import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

import Header from "../components/Header";
import TaskList from "../components/TaskList";
import FilterBar from "../components/FilterBar";
import Modal from "../components/Modal";
import AddTaskForm from "../components/AddTaskForm.jsx";

const Home = () => {
  // 🔹 STATE
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  // 🔹 FETCH TASKS
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/get?status=${statusFilter}&sort=${sortBy}`
      );
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.log("Error fetching tasks", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 LOAD TASKS ON PAGE LOAD & FILTER CHANGE
  useEffect(() => {
    fetchTasks();
  }, [statusFilter, sortBy]);

  // 🔹 FILTER TASKS BY SEARCH TERM
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔹 ADD TASK
  const handleAddTask = async (data) => {
    await axiosInstance.post("/create", data);
    setShowModal(false);
    fetchTasks();
  };

  // 🔹 UPDATE TASK
  const handleUpdateTask = async (data) => {
    await axiosInstance.put(`/update/${editTask._id}`, data);
    setEditTask(null);
    setShowModal(false);
    fetchTasks();
  };

  // 🔹 TOGGLE COMPLETE
  const toggleComplete = async (id) => {
    await axiosInstance.patch(`/toggle/${id}`);
    fetchTasks();
  };

  // 🔹 DELETE TASK
  const deleteTask = async (id) => {
    await axiosInstance.delete(`/delete/${id}`);
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <Header
          onAdd={() => {
            setEditTask(null);
            setShowModal(true);
          }}
        />

        {/* FILTER BAR WITH SEARCH */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex-1">
            <FilterBar
              status={statusFilter}
              setStatus={setStatusFilter}
              sort={sortBy}
              setSort={setSortBy}
            />
          </div>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-500 mt-10">
            Loading tasks...
          </p>
        )}

        {/* NO RESULTS MESSAGE */}
        {!loading && filteredTasks.length === 0 && searchTerm && (
          <p className="text-center text-gray-500 mt-10">
            No tasks found matching "{searchTerm}"
          </p>
        )}

        {/* TASK LIST */}
        {!loading && (
          <TaskList
            tasks={filteredTasks}
            onEdit={(task) => {
              setEditTask(task);
              setShowModal(true);
            }}
            onToggle={toggleComplete}
            onDelete={deleteTask}
          />
        )}

        {/* MODAL (ADD / EDIT) */}
        {showModal && (
          <Modal
            onClose={() => {
              setShowModal(false);
              setEditTask(null);
            }}
          >
            <AddTaskForm
              initialData={editTask}
              onSubmit={editTask ? handleUpdateTask : handleAddTask}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Home;