import React from "react";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import { useTheme } from "../auth/ThemeContext";
import Dash from "../components/Dash";

function Home() {
  const { user } = useAuth();
  const { theme } = useTheme();
  return (
    <div>
      {user ? (
        <div
          className={
            theme === "light"
              ? "flex flex-col min-h-full w-full mt-10 md:mt-20"
              : "flex flex-col min-h-full w-full bg-gray-800 text-gray-300 mt-10 md:mt-20"
          }
        >
          <div className="mb-8 text-center mt-8">
            <h1 className="text-3xl font-bold">Hola!</h1>
            <p className="text-xl mt-2">
              Tu rol es: <span className="font-bold">{user.role}</span>
            </p>
          </div>
          <div>
            <Dash></Dash>
          </div>
        </div>
      ) : (
        <div className="text-2xl flex flex-col gap-2 justify-center items-center min-h-screen">
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
