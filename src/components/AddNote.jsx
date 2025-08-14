import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../useTheme";
import { FaSave, FaTimes } from "react-icons/fa";

export default function AddNote({ addNote }) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [titleError, setTitleError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setTitleError(true);
      return;
    }
    const newId = Math.floor(Math.random() * 9000) + 1000;

    const newNote = {
      id: newId,
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
      createdAt: new Date().toISOString(),
    };
    console.log({ title, content, tags });
    addNote(newNote);
  };

  return (
    <div
      className={`h-3/4 p-6 ${
        theme === "dark" ? "dark-mode-bg" : "bg-gray-50"
      }`}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1
            className={`text-2xl font-bold ${
              theme === "dark" ? "dark-mode-text" : "text-gray-800"
            }`}
          >
            Create New Note
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className={`block mb-2 text-sm font-medium ${
                theme === "dark" ? "dark-mode-text" : "text-gray-700"
              }`}
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleError(false);
              }}
              className={`w-full p-3 rounded-lg border ${
                titleError ? "border-red-500" : "border-gray-300"
              } ${
                theme === "dark"
                  ? "dark-mode-input bg-gray-700 text-white"
                  : "bg-white text-gray-800"
              }`}
              placeholder="Enter title"
              autoFocus
            />
            {titleError && (
              <p className="mt-1 text-sm text-red-500">Title is required</p>
            )}
          </div>

          {/* Content Input */}
          <div className="mb-6">
            <label
              htmlFor="content"
              className={`block mb-2 text-sm font-medium ${
                theme === "dark" ? "dark-mode-text" : "text-gray-700"
              }`}
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`w-full p-3 rounded-lg border min-h-[200px] ${
                theme === "dark"
                  ? "dark-mode-input bg-gray-700 text-white"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
              placeholder="Write your note..."
            />
          </div>

          {/* Tags Input */}
          <div className="mb-8">
            <label
              htmlFor="tags"
              className={`block mb-2 text-sm font-medium ${
                theme === "dark" ? "dark-mode-text" : "text-gray-700"
              }`}
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className={`w-full p-3 rounded-lg border ${
                theme === "dark"
                  ? "dark-mode-input bg-gray-700 text-white"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
              placeholder="Separate tags with commas"
            />
            <p
              className={`mt-1 text-xs ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Example: work, important, ideas
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border ${
                theme === "dark"
                  ? "dark-mode-cancel-btn border-gray-600"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <FaTimes />
              Cancel
            </button>
            <button
              type="submit"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg ${
                theme === "dark"
                  ? "dark-mode-save-btn"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onClick={handleSubmit}
            >
              <FaSave />
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
