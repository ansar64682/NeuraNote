import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import TasksPage from "./pages/TasksPage";
import NotesPage from "./pages/NotesPage";
import ArchivePage from "./pages/ArchivePage";
import SettingsPage from "./pages/SettingsPage";
import styles from "./assets/css/Theme.module.css";
import { useTheme } from "./useTheme";
import NoteDetailsPage from "./pages/NoteDetailsPage";
import "./App.css";

function App() {
  const { theme } = useTheme();

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "UI Theme Ideas",
      content: "Explore dark theme variations with muted hover states.",
      tags: ["personal", "ui"],
      createdAt: "2025-08-13T12:00:00Z",
      updatedAt: null,
    },
    {
      id: 2,
      title: "Filters Ideas",
      content: "Explore dark theme variations with muted hover states.",
      tags: ["work", "ui"],
      createdAt: "2025-08-13T12:00:00Z",
      updatedAt: null,
    },
    {
      id: 3,
      title: "UI Theme Ideas",
      content: "Explore dark theme variations with muted hover states.",
      tags: ["design", "ui"],
      createdAt: "2025-08-13T12:00:00Z",
      updatedAt: null,
    },
    {
      id: 4,
      title: "UI Theme Ideas",
      content: "Explore dark theme variations with muted hover states.",
      tags: ["design", "backend"],
      createdAt: "2025-08-13T12:00:00Z",
      updatedAt: null,
    },
  ]);

  const [editingNoteId, setEditingNoteId] = useState(null); // Track which note is being edited

  const editNote = (updatedNote) => {
    setNotes(
      notes.map((note) =>
        note.id === updatedNote.id
          ? {
              ...updatedNote,
              updatedAt: new Date().toISOString(),
            }
          : note
      )
    );
    setEditingNoteId(null); // Exit edit mode
  };

  const [noteSearch, setNoteSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const getFilteredNotes = () => {
    let result = [...notes];

    if (noteSearch.trim() != "") {
      result = result.filter((prev) =>
        prev.title.toLowerCase().includes(noteSearch.toLowerCase())
      );
    }

    if (filter !== "all") {
      result = result.filter((note) =>
        note.tags.some((tag) => tag.toLowerCase() === filter.toLowerCase())
      );
    }

    return result;
  };

  const filteredNotes = getFilteredNotes();

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const [showAddNote, setShowAddNote] = useState(false);

  const addNote = (newNote) => {
    setNotes((prev) => [...prev, newNote]);
    setShowAddNote(false);
  };

  return (
    <div className="app-grid">
      {/* Sidebar */}
      <div
        className={`sidebar-container ${
          theme === "light" ? styles.lightSidebar : styles.darkSidebar
        }`}
      >
        <Navbar />
      </div>

      {/* Main */}
      <div
        className={`main-container ${
          theme === "light" ? styles.lightMain : styles.darkMain
        }`}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route
            path="/notes"
            element={
              <NotesPage
                notes={filteredNotes}
                deleteNote={deleteNote}
                addNote={addNote}
                setShowAddNote={setShowAddNote}
                showAddNote={showAddNote}
                setNoteSearch={setNoteSearch}
                noteSearch={noteSearch}
                setFilter={setFilter}
                filter={filter}
                setEditingNoteId={setEditingNoteId}
              />
            }
          />
          <Route
            path="/notes/:id"
            element={
              <NoteDetailsPage
                notes={notes}
                deleteNote={deleteNote}
                editNote={editNote}
                editingNoteId={editingNoteId}
                setEditingNoteId={setEditingNoteId}
              />
            }
          />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
