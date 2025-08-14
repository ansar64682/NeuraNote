import React from "react";
import AddTask from "./AddTask";
import styles from "../assets/css/Theme.module.css";
import { useTheme } from "../useTheme";

export default function TaskTable({
  tasks,
  onToggleComplete,
  onToggleSelect,
  showAddTask,
  handleFinishAddTask,
}) {
  const { theme } = useTheme();
  const priorityColors = {
    high:
      theme === "dark" ? styles["priority-high"] : "bg-red-100 text-red-800",
    medium:
      theme === "dark"
        ? styles["priority-medium"]
        : "bg-orange-100 text-orange-800",
    low:
      theme === "dark" ? styles["priority-low"] : "bg-green-100 text-green-800",
  };

  return (
    <div
      className={`overflow-x-auto  rounded-lg shadow-sm ${
        theme === "dark" ? styles.darkTaskTable : "border-gray-200"
      }`}
    >
      <table className="w-full text-sm">
        <thead
          className={`${theme === "dark" ? "" : "bg-gray-100 text-gray-700"}`}
        >
          <tr>
            <th className="p-2 text-center">Select</th>
            <th className="p-2 text-center">Done</th>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-center">Priority</th>
            <th className="p-2 text-center">Due Date</th>
            <th className="p-2 text-left">Notes</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className={`border-t transition ${
                theme === "dark" ? "" : "hover:bg-gray-50"
              }`}
            >
              {/* Select for CRUD */}
              <td className="p-2 text-center">
                <input
                  type="checkbox"
                  checked={task.selected}
                  onChange={() => onToggleSelect(task.id)}
                  className={`w-4 h-4 ${
                    theme === "dark" ? "accent-gray-400" : "accent-blue-500"
                  }`}
                />
              </td>

              {/* Complete */}
              <td className="p-2 text-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleComplete(task.id)}
                  className={`w-4 h-4 ${
                    theme === "dark" ? "accent-green-400" : "accent-green-500"
                  }`}
                />
              </td>

              {/* Title */}
              <td className="p-2">
                <span
                  className={`font-medium ${
                    task.completed
                      ? theme === "dark"
                        ? "line-through text-gray-500"
                        : "line-through text-gray-400"
                      : ""
                  }`}
                >
                  {task.title}
                </span>
              </td>

              {/* Priority */}
              <td className="p-2 text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    priorityColors[task.priority]
                  }`}
                >
                  {task.priority}
                </span>
              </td>

              {/* Due Date */}
              <td
                className={`p-2 text-center ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : ""}
              </td>

              {/* Notes */}
              <td
                className={`p-2 ${
                  theme === "dark" ? "text-gray-500" : "text-gray-500"
                }`}
              >
                {task.notes || "—"}
              </td>
            </tr>
          ))}
          {showAddTask && <AddTask onFinish={handleFinishAddTask} />}
        </tbody>
      </table>
    </div>
  );
}
