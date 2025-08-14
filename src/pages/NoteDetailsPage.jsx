import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { useTheme } from "../useTheme";
import EditNote from "../components/EditNote";
import ReactMarkdown from "react-markdown";

export default function NoteDetailsPage({
  notes,
  deleteNote,
  editNote,
  editingNoteId,
  setEditingNoteId,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const note = notes.find((n) => n.id === Number(id));
  if (!note) return <p>Note not found</p>;

  const isEditing = editingNoteId === note.id;

  return (
    <div
      className={`mx-auto p-6 min-h-screen w-full ${
        theme === "dark" ? "dark-mode-bg" : ""
      }`}
    >
      {/* Back Button - Always visible */}
      <button
        onClick={() => navigate(-1)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg mb-6 transition-all duration-200 ${
          theme === "dark"
            ? "dark-mode-back-btn"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        <FaArrowLeft className="text-sm" />
        <span>Back to Notes</span>
      </button>

      {isEditing ? (
        /* Edit Mode - Full Height Editor */
        <div
          className={`rounded-xl shadow-lg p-8 h-[calc(100vh-180px)] ${
            theme === "dark"
              ? "dark-mode-note-card"
              : "bg-white border border-gray-200"
          }`}
        >
          <EditNote
            note={note} // Pass full note object
            editNote={(updatedNote) => {
              editNote(updatedNote);
              setEditingNoteId(null); // Switch back to view mode on save
            }}
            onCancel={() => setEditingNoteId(null)}
            theme={theme}
          />
        </div>
      ) : (
        /* View Mode - Full Height Note Display */
        <div
          className={`rounded-xl shadow-lg p-8 h-[calc(100vh-180px)] overflow-y-auto ${
            theme === "dark"
              ? "dark-mode-note-card"
              : "bg-white border border-gray-200"
          }`}
        >
          {/* Title */}
          <h1
            className={`text-3xl font-bold mb-4 ${
              theme === "dark" ? "dark-mode-text" : "text-gray-900"
            }`}
          >
            {note.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {note.tags.map((tag, idx) => (
              <span
                key={idx}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  theme === "dark"
                    ? "dark-mode-tag"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Content */}
          <div
            className={`prose max-w-none mb-8 ${
              theme === "dark" ? "prose-invert" : ""
            }`}
          >
            <ReactMarkdown>{note.content}</ReactMarkdown>
          </div>

          {/* Action Buttons */}
          <div
            className={`flex gap-3 border-t pt-6 ${
              theme === "dark" ? "dark-mode-border" : "border-gray-200"
            }`}
          >
            <button
              onClick={() => setEditingNoteId(note.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium ${
                theme === "dark"
                  ? "dark-mode-edit-btn"
                  : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              }`}
            >
              <FaEdit />
              <span>Edit Note</span>
            </button>
            <button
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium ${
                theme === "dark"
                  ? "dark-mode-delete-btn"
                  : "bg-red-100 text-red-700 hover:bg-red-200"
              }`}
              onClick={() => deleteNote(note.id)}
            >
              <FaTrash />
              <span>Delete Note</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
