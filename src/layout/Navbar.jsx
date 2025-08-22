import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../auth/ThemeContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // Validación de renderizado
  if (!user) return null;

  //Está función es para abrir y cerrar el menú
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`${
        theme === "light" ? "bg-blue-600" : "bg-gray-900"
      } text-white p-3 shadow-md fixed top-0 left-0 right-0 z-50`}
    >
      <div className="flex justify-end md:hidden">
        {/* Al estar en celular se va a mostrar este menú tipo hamburguesa, que al dar clic se abre el menú */}
        <button onClick={toggleMenu} className="text-2xl" aria-label="Menú">
          ☰
        </button>
      </div>

      <div
        // Aqui se controla si el menú está abierto o cerrado, en md o lg no se muestra
        className={`${
          isOpen ? "block" : "hidden"
        } md:block absolute left-0 right-0 top-full ${
          theme === "light" ? "bg-blue-600" : "bg-gray-900"
        } px-3 pb-4 shadow-lg z-20`}
      >
        <div className="flex flex-col items-center text-center gap-6 py-4 md:py-0 md:flex-row md:justify-between md:items-center md:gap-4">
          <div className="flex flex-col items-center gap-4 w-full md:flex-row md:justify-start">
            <Link
              to="/"
              className={`${
                theme === "light"
                  ? "bg-blue-700 hover:bg-blue-800"
                  : "bg-blue-900 hover:bg-blue-950"
              }
                " px-3 py-2 rounded font-bold w-40 text-center"`}
              // El onclick este es solo para pantalla de celular
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            {user.role === "admin" && (
              <Link
                to="/users"
                className={`${
                  theme === "light"
                    ? "bg-blue-700 hover:bg-blue-800"
                    : "bg-blue-900 hover:bg-blue-950"
                }
                  " px-3 py-2 rounded font-bold w-40 text-center"`}
                // El onclick este es solo para pantalla de celular
                onClick={() => setIsOpen(false)}
              >
                Usuarios
              </Link>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              // El onclick este es para cambiar de oscuro a claro y el setIsOpen para cuando sea pantalla movil
              onClick={() => {
                toggleTheme();
                setIsOpen(false);
              }}
              className={`${
                theme === "light"
                  ? "bg-blue-700 hover:bg-blue-800 cursor-pointer"
                  : "bg-blue-900 hover:bg-blue-950 cursor-pointer"
              }
                " px-3 py-2 rounded font-bold w-40 text-center"`}
            >
              {theme === "light" ? "Oscuro" : "Claro"}
            </button>
            <Link
              to="/login"
              onClick={() => {
                logout();
                // El onclick este es solo para pantalla de celular
                setIsOpen(false);
              }}
              className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded cursor-pointer font-bold w-40 text-center"
            >
              Cerrar sesión
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
