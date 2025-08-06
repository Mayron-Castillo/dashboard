import React from "react";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import { useTheme } from "../auth/ThemeContext";
import Posts from "../components/Posts";

function Home() {
  const { user } = useAuth();
  const { theme } = useTheme();
  return (
    <div
      className={
        theme === "light"
          ? "flex flex-col min-h-full w-full"
          : "flex flex-col min-h-full w-full bg-gray-800 text-gray-300"
      }
    >
      {user ? (
        <div>
          <div>
            <h1 className="text-2xl">
              Hola, bienvenido {user.name}, tu rol es {user.role}
            </h1>
          </div>
          <h2 className="text-2xl text-center flex justify-center my-2">
            Posts de Usuarios
          </h2>
          <div className="">
            <Posts></Posts>
          </div>
        </div>
      ) : (
        <div className="text-2xl flex flex-col gap-2 justify-center items-center h-full">
          <h1>Bienvenido, debes iniciar sesión</h1>
          <Link
            to="/login"
            className="bg-blue-600 p-2 text-center rounded text-white hover:bg-blue-700"
          >
            Iniciar Sesión
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
