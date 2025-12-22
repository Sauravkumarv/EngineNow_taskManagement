import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../api/axios";

import Header from "../components/Header";
import TaskList from "../components/TaskList";
import FilterBar from "../components/FilterBar";
import Modal from "../components/Modal";
import AddTaskForm from "../components/AddTaskForm.jsx";

const Home = () => {
  //  STATE
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  //  FETCH TASKS WITH DEBOUNCE PROTECTION
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      
      // Add timeout to detect slow responses
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const res = await axiosInstance.get(
        `/get?status=${statusFilter}&sort=${sortBy}`,
        { signal: controller.signal }
      );
      
      clearTimeout(timeoutId);
      setTasks(res.data.tasks || []);
    } catch (err) {
      if (err.name === 'AbortError') {
        console.error("Request timeout - server taking too long");
      } else {
        console.error("Error fetching tasks", err);
      }
    } finally {
      setLoading(false);
    }
  }, [statusFilter, sortBy]);

  //  LOAD TASKS ON PAGE LOAD & FILTER CHANGE
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  //  FILTER TASKS BY SEARCH TERM
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //  ADD TASK
  const handleAddTask = async (data) => {
    try {
      const res = await axiosInstance.post("/create", data);
      setShowModal(false);
      
      // Optimistic update instead of full fetch
      if (res.data.task) {
        setTasks(prev => [...prev, res.data.task]);
      } else {
        fetchTasks();
      }
    } catch (err) {
      console.error("Error adding task", err);
    }
  };

  //  UPDATE TASK
  const handleUpdateTask = async (data) => {
    try {
      const res = await axiosInstance.put(`/update/${editTask._id}`, data);
      setEditTask(null);
      setShowModal(false);
      
      // Optimistic update instead of full fetch
      if (res.data.task) {
        setTasks(prev => 
          prev.map(task => task._id === editTask._id ? res.data.task : task)
        );
      } else {
        fetchTasks();
      }
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  //  TOGGLE COMPLETE - OPTIMISTIC UPDATE
  const toggleComplete = async (id) => {
    // Optimistic update - immediately update UI
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task._id === id ? { ...task, completed: !task.completed } : task
      )
    );

    try {
      await axiosInstance.patch(`/toggle/${id}`);
    } catch (err) {
      console.error("Error toggling task", err);
      // Revert on error
      fetchTasks();
    }
  };

  //  DELETE TASK - OPTIMISTIC UPDATE
  const deleteTask = async (id) => {
    // Optimistic update - immediately remove from UI
    setTasks(prevTasks => prevTasks.filter(task => task._id !== id));

    try {
      await axiosInstance.delete(`/delete/${id}`);
    } catch (err) {
      console.error("Error deleting task", err);
      // Revert on error
      fetchTasks();
    }
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

        {/* SEARCH BAR */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* FILTER BAR */}
        <div className="mb-6">
          <FilterBar
            status={statusFilter}
            setStatus={setStatusFilter}
            sort={sortBy}
            setSort={setSortBy}
          />
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center mt-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 mt-2">Loading tasks...</p>
          </div>
        )}

        {/* NO RESULTS MESSAGE */}
        {!loading && filteredTasks.length === 0 && searchTerm && (
          <p className="text-center text-gray-500 mt-10">
            No tasks found matching "{searchTerm}"
          </p>
        )}

        {/* EMPTY STATE */}
        {!loading && tasks.length === 0 && !searchTerm && (
          <p className="text-center text-gray-500 mt-10">
            No tasks yet. Click "Add Task" to create one!
          </p>
        )}

        {/* TASK LIST */}
        {!loading && filteredTasks.length > 0 && (
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