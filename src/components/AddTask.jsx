import { useState } from "react";
import { useTheme } from "../useTheme";
import styles from "../assets/css/Theme.module.css";

export default function AddTask({ onFinish }) {
  const { theme } = useTheme();
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [notes, setNotes] = useState("");

  const handleFinishClick = () => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      notes,
      dueDate,
      priority,
      completed: false,
      selected: false,
    };

    onFinish(newTask);
  };

  // Shared base input styles, overridden in dark mode with styles
  const inputClass = `w-full px-2 py-1 border rounded ${
    theme === "dark"
      ? styles.darkInputBorder +
        " " +
        styles.darkInputBg +
        " " +
        styles.darkInputText
      : "border-gray-300 bg-white text-gray-900"
  }`;

  const selectClass = `px-2 py-1 border rounded ${
    theme === "dark"
      ? styles.darkInputBorder +
        " " +
        styles.darkInputBg +
        " " +
        styles.darkInputText
      : "border-gray-300 bg-white text-gray-900"
  }`;

  return (
    <tr
      className={`border-t ${
        theme === "dark" ? styles.darkTableRowBg : "bg-blue-50"
      }`}
    >
      {/* Select checkbox (disabled for new row) */}
      <td className="p-2 text-center">
        <input
          type="checkbox"
          disabled
          className={`${theme === "dark" ? styles.darkCheckbox : "w-4 h-4"}`}
        />
      </td>

      {/* Complete checkbox (disabled for new row) */}
      <td className="p-2 text-center">
        <input
          type="checkbox"
          disabled
          className={`${theme === "dark" ? styles.darkCheckbox : "w-4 h-4"}`}
        />
      </td>

      {/* Title */}
      <td className="p-2">
        <input
          type="text"
          placeholder="Task title"
          className={inputClass}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </td>

      {/* Priority dropdown */}
      <td className="p-2 text-center">
        <select
          className={selectClass}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">Select</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </td>

      {/* Due date picker */}
      <td className="p-2 text-center">
        <input
          type="date"
          className={inputClass}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </td>

      {/* Notes */}
      <td className="p-2">
        <input
          type="text"
          placeholder="Notes"
          className={inputClass}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </td>

      {/* Finish button */}
      <td className="p-2 text-center">
        <button
          onClick={handleFinishClick}
          className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition"
        >
          ✅ Finish
        </button>
      </td>
    </tr>
  );
}
