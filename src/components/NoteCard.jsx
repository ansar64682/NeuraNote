// src/components/NoteCard.jsx
import React from "react";
import { useTheme } from "../useTheme";
import { useNavigate } from "react-router-dom";
import styles from "../assets/css/Theme.module.css";

export default function NoteCard({ note, deleteNote, setEditingNoteId }) {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { id, title, content, tags = [], createdAt } = note;

  // Map lowercase keys for consistency
  const colorMap = {
    design: {
      dark: styles.darkNoteTagBlue,
      light: "bg-blue-100 text-blue-700",
    },
    ui: {
      dark: styles.darkNoteTagGreen,
      light: "bg-green-100 text-green-700",
    },
    work: {
      dark: styles.darkNoteTagRed,
      light: "bg-gray-100 text-red-700",
    },
    personal: {
      dark: styles.darkNoteTagRed,
      light: "bg-yellow-100 text-white-700",
    },
  };

  const handleClick = (e) => {
    // Check if the click came from an action button
    if (!e.target.closest(".action-button")) {
      navigate(`/notes/${id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative cursor-pointer bg-white rounded-2xl hover:shadow-lg transition-shadow p-5 flex flex-col ${
        theme === "dark" ? styles.darkNoteCard : ""
      } ${theme === "dark" ? "shadow-gray-500" : "shadow"}`}
    >
      {/* Title */}
      <h3
        className={`text-lg font-semibold mb-2 line-clamp-1 ${
          theme === "dark" ? styles.darkNoteCardTitle : "text-gray-800"
        }`}
      >
        {title}
      </h3>

      {/* Content Preview */}
      <p
        className={`text-sm flex-1 line-clamp-3 ${
          theme === "dark" ? styles.darkNoteCardPreview : "text-gray-600"
        }`}
      >
        {content}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((tag, index) => {
          const lowerTag = tag.toLowerCase();
          const tagStyle = colorMap[lowerTag] || {
            dark: styles.darkNoteTagDefault,
            light: "bg-gray-100 text-gray-700",
          };
          return (
            <span
              key={index}
              className={`px-2 py-1 rounded-full text-xs ${
                theme === "dark" ? tagStyle.dark : tagStyle.light
              }`}
            >
              {tag}
            </span>
          );
        })}
      </div>

      {/* Created Date */}
      <div className="mt-3 text-xs text-gray-400">
        {new Date(createdAt).toLocaleDateString()}
      </div>

      {/* Action Buttons (hover only) */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <button
          className={`p-1 rounded-full action-button ${
            theme === "dark"
              ? `${styles.darkNoteActionBtn} hover:${styles.darkNoteActionBtnHover}`
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => setEditingNoteId(note.id)}
        >
          ✏️
        </button>
        <button
          className={`p-1 rounded-full action-button ${
            theme === "dark"
              ? `${styles.darkNoteActionBtn} hover:${styles.darkNoteActionBtnHover}`
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm("Are you sure you want to delete this note?")) {
              deleteNote(id);
            }
          }}
        >
          🗑
        </button>
      </div>
    </div>
  );
}
