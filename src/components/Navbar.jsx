import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../auth/ThemeContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  console.log(theme);
  if (!user) return null;

  return (
    <nav
      className={
        theme === "light"
          ? "bg-blue-600 text-white p-3 shadow-md"
          : "bg-gray-900 text-white p-3 shadow-md"
      }
    >
      <div className="w-full flex justify-between items-center gap-4">
        <div className="flex gap-4">
          <Link
            to="/"
            className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded font-bold"
          >
            Inicio
          </Link>
          {user.role === "admin" && (
            <Link
              to="/users"
              className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded font-bold"
            >
              Usuarios
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded cursor-pointer font-bold"
          >
            Cerrar sesión
          </Link>
          <Link
            onClick={toggleTheme}
            className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded cursor-pointer font-bold"
          >
            cambiar tema
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
