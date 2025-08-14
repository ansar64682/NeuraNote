import React from "react";
import NoteCard from "../components/NoteCard";
import { useTheme } from "../useTheme";
import styles from "../assets/css/Theme.module.css";
import AddNote from "../components/AddNote";
import "../App.css";

export default function NotesPage({
  notes,
  deleteNote,
  addNote,
  showAddNote,
  setShowAddNote,
  setNoteSearch,
  noteSearch,
  setFilter,
  filter,
  setEditingNoteId,
}) {
  const { theme } = useTheme();

  return (
    <div
      className={`flex flex-col h-full bg-gray-50 ${
        theme === "dark" ? styles.darkNotesPage : ""
      }`}
    >
      {/* Header Section */}
      <div
        className={`flex items-center justify-between px-6 py-4 border-b border-gray-200 ${
          theme === "dark" ? styles.darkNotesHeader : ""
        }`}
      >
        <h1
          className={`text-2xl font-bold text-gray-800 ${
            theme === "dark" ? "text-white" : ""
          }`}
        >
          📝 Notes
        </h1>

        <button
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          onClick={() => setShowAddNote(true)}
        >
          ➕ Add
        </button>
      </div>

      {/* Filter/Search Bar */}
      <div
        className={`px-6 py-3 flex items-center gap-4 border-b border-gray-200 ${
          theme === "dark" ? styles.darkNotesSearchBar : ""
        }`}
      >
        <input
          type="text"
          aria-label="serach"
          className={`flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            theme === "dark" ? styles.darkNotesInput : ""
          }`}
          value={noteSearch}
          onChange={(e) => setNoteSearch(e.target.value)}
          placeholder="Search notes..."
        />

        <select
          className={`px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 ${
            theme === "dark" ? styles.darkNotesSelect : ""
          }`}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value={"all"}>All Tags</option>
          <option value={"design"}>Design</option>
          <option value={"work"}>Work</option>
          <option value={"personal"}>Personal</option>
        </select>
      </div>
      {showAddNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div
            className={`relative max-w-md w-full rounded-xl shadow-xl p-6 ${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            {/* Close button */}
            <button
              onClick={() => setShowAddNote(false)}
              className={`absolute top-4 right-4 p-1 rounded-full ${
                theme === "dark"
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* AddNote component */}
            <AddNote
              addNote={(newNote) => {
                addNote(newNote);
                setShowAddNote(false);
              }}
              theme={theme}
            />
          </div>
        </div>
      )}
      {/* Notes Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {showAddNote && (
            <div
              className={`fixed inset-0 z-50 flex items-center justify-center p-4  bg-opacity-1000 ${
                theme === "dark" ? "bg-gray-900" : "bg-white"
              }`}
            >
              <div
                className={`relative max-w-md w-full rounded-xl shadow-xl p-6 ${
                  theme === "dark"
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
                }`}
              >
                {/* Close button */}
                <button
                  onClick={() => setShowAddNote(false)}
                  className={`absolute top-4 right-4 p-1 rounded-full ${
                    theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* AddNote component */}
                <AddNote
                  addNote={(newNote) => {
                    addNote(newNote);
                    setShowAddNote(false);
                  }}
                  theme={theme}
                />
              </div>
            </div>
          )}
          {/* Dummy cards for now */}
          {notes.map((note) => (
            <NoteCard
              note={note}
              deleteNote={deleteNote}
              key={note.id}
              setEditingNoteId={setEditingNoteId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
