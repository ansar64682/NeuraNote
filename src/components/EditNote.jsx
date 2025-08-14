import React, { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";

export default function EditNote({
  note, // Now accepts the full note object
  editNote,
  onCancel,
  theme,
}) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [tags, setTags] = useState(note.tags.join(", "));

  const handleSubmit = (e) => {
    e.preventDefault();
    editNote({
      ...note,
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title Field */}
      <div>
        <label
          className={`block mb-1 ${
            theme === "dark" ? "text-white" : "text-gray-700"
          }`}
        >
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-2 rounded border ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300"
          }`}
          required
          autoFocus
        />
      </div>

      {/* Content Field */}
      <div>
        <label
          className={`block mb-1 ${
            theme === "dark" ? "text-white" : "text-gray-700"
          }`}
        >
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`w-full p-2 rounded border min-h-[150px] ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300"
          }`}
        />
      </div>

      {/* Tags Field */}
      <div>
        <label
          className={`block mb-1 ${
            theme === "dark" ? "text-white" : "text-gray-700"
          }`}
        >
          Tags (comma separated)
        </label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className={`w-full p-2 rounded border ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300"
          }`}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className={`px-4 py-2 rounded ${
            theme === "dark"
              ? "bg-gray-600 hover:bg-gray-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <FaTimes /> Cancel
        </button>
        <button
          type="submit"
          className={`px-4 py-2 rounded ${
            theme === "dark"
              ? "bg-blue-600 hover:bg-blue-500 text-white"
              : "bg-blue-500 hover:bg-blue-400 text-white"
          }`}
        >
          <FaSave /> Save Changes
        </button>
      </div>
    </form>
  );
}
