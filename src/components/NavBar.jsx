import { Link, useLocation } from "react-router-dom";
import styles from "../assets/css/Theme.module.css";
import { useTheme } from "../useTheme";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const links = [
    { path: "/tasks", label: "Tasks", icon: "🗒️" },
    { path: "/notes", label: "Notes", icon: "📝" },
    { path: "/archive", label: "Archive", icon: "📦" },
    { path: "/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <aside
      className={`flex flex-col w-[200px] min-w-[200px] h-screen ${
        theme === "light" ? styles.lightSidebar : styles.darkSidebar
      }`}
    >
      {/* Top Section - Fixed */}
      <div
        className={`px-4 py-6 border-b ${
          theme === "light" ? "border-gray-200" : "border-gray-700"
        }`}
      >
        <div className="flex items-center justify-between">
          <span
            className={`text-xl font-bold ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            NeuraNote
          </span>
          <button
            onClick={toggleTheme}
            className={`p-1 rounded ${
              theme === "light"
                ? styles.lightThemeToggle
                : styles.darkThemeToggle
            }`}
            title="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>

      {/* Navigation Links - Scrollable */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {links.slice(0, -1).map(({ path, label, icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
              location.pathname === path
                ? theme === "light"
                  ? styles.lightActiveLink
                  : styles.darkActiveLink
                : theme === "light"
                ? styles.lightHoverLink
                : styles.darkHoverLink
            }`}
          >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Section - Fixed */}
      <div
        className={`p-4 border-t ${
          theme === "light" ? "border-gray-200" : "border-gray-700"
        }`}
      >
        <Link
          to="/settings"
          className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
            location.pathname === "/settings"
              ? theme === "light"
                ? styles.lightActiveLink
                : styles.darkActiveLink
              : theme === "light"
              ? styles.lightHoverLink
              : styles.darkHoverLink
          }`}
        >
          <span className="text-lg">⚙️</span>
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
