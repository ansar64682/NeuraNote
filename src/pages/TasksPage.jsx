import { useState } from "react";
import TaskTable from "../components/TaskTable";
import styles from "../assets/css/Theme.module.css";
import { useTheme } from "../useTheme";

export default function TasksPage() {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState([
    {
      id: "t1",
      title: "Finish React layout",
      completed: false,
      selected: false,
      dueDate: "2025-08-12",
      priority: "high",
      notes: "Need to finalize sidebar and theme toggle",
    },
    {
      id: "t2",
      title: "Write TaskTable integration",
      completed: false,
      selected: false,
      dueDate: "2025-08-15",
      priority: "medium",
      notes: "Replace TaskItem with table layout",
    },
    {
      id: "t3",
      title: "Write TaskTable integration",
      completed: false,
      selected: false,
      dueDate: "2025-08-15",
      priority: "medium",
      notes: "Replace TaskItem with table layout",
    },
  ]);

  const deleteTask = () => {
    setTasks((prev) => prev.filter((tasks) => !tasks.selected));
  };

  const getFilteredTasks = () => {
    let results = [...tasks];

    return results;
  };

  const [showAddTask, setShowAddTask] = useState(false);

  const handleFinishAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
    setShowAddTask(false);
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleSelect = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, selected: !task.selected } : task
      )
    );
  };

  return (
    <div
      className={`flex flex-col h-full bg-gray-50  p-4  ${
        theme === "dark" ? styles.darkTask : ""
      }`}
    >
      {/* Top ribbon */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
            onClick={() => setShowAddTask(true)}
          >
            ➕ Add
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            onClick={deleteTask}
          >
            🗑 Delete
          </button>
          <button className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition">
            📦 Archive
          </button>
        </div>
      </div>

      {/* Task table */}
      <div className="flex-1 overflow-y-auto">
        <TaskTable
          tasks={getFilteredTasks()}
          onToggleComplete={toggleComplete}
          onToggleSelect={toggleSelect}
          showAddTask={showAddTask}
          handleFinishAddTask={handleFinishAddTask}
        />
      </div>
    </div>
  );
}
