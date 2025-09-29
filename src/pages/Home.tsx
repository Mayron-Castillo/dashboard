import React from "react";
import { useAuth } from "../auth/AuthContext.js";
import { Link } from "react-router-dom";
import { useTheme } from "../auth/ThemeContext.js";
import MainLayout from "../layout/MainLayout.js";

function Home() {
  const { user } = useAuth();
  const { theme } = useTheme();
  return (
    <div>
      {/* Si se loguea y se encuentra que si hay un usuario muestra el MainLayout */}
      {user ? (
        <div
          className={`${
            theme === "light" ? "bg-gray-100" : "bg-gray-800 text-gray-300"
          } flex flex-col min-h-full w-full mt-6 sm:mt-10 md:mt-16 lg:mt-20 px-2 sm:px-4`}
        >
          <div className="mb-6 sm:mb-8 text-center mt-6 sm:mt-8 px-2">
            <h1 className="text-2xl sm:text-3xl font-bold">¡Hola!</h1>
            <p className="text-lg sm:text-xl mt-2">
              Tu rol es: <span className="font-bold">{user.role}</span>
            </p>
          </div>
          <div>
            <MainLayout />
          </div>
        </div>
      ) : (
        // Esto es lo que se va a mostrar primeramente al ejecutar el programa
        <div className="text-xl sm:text-2xl flex flex-col gap-3 sm:gap-4 justify-center items-center min-h-screen px-4 text-center">
          <h1
            className={`${
              theme === "light" ? "text-black" : "text-white"
            } text-xl sm:text-2xl`}
          >
            Bienvenido, debes iniciar sesión
          </h1>
          <Link
            to="/login"
            className="bg-blue-600 px-4 py-2 sm:px-6 sm:py-2 text-center rounded-lg text-white hover:bg-blue-700 w-full max-w-xs"
          >
            Iniciar Sesión
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
