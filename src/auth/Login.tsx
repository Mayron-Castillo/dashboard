import React, { useState } from "react";
import { useAuth } from "./AuthContext.js";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setError("");
      setIsLoading(true);
      await login(data);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Iniciar Sesión</h1>
        </div>
        {/* Si hay un error en la llamada se ejecuta y se muestra el error */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Formulario del login*/}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Usuario
            </label>
            {/* El input debe ser requerido y minimo de 2 caracteres si no da error */}
            <input
              {...register("username", {
                required: "El usuario es requerido",
                minLength: {
                  value: 2,
                  message:
                    "El nombre de usuario debe tener al menos 2 caracteres",
                },
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
              placeholder="Ingresa tu usuario"
              // Al hacer clic en iniciar sesión se deshabilita escribir en el input
              disabled={isLoading}
            />
            {/* Si hay error lo captura y lo muestra debajo del input con texto en rojo */}
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            {/* La contraseña debe ser requerido y minimo de 5 caracteres si no da error */}
            <input
              {...register("password", {
                required: "La contraseña es requerida",
                minLength: {
                  value: 5,
                  message: "La contraseña debe tener al menos 5 caracteres",
                },
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
              placeholder="Ingresa tu contraseña"
              // Al hacer clic en iniciar sesión se deshabilita escribir en la contraseña
              disabled={isLoading}
            />
            {/* Si hay error lo captura y lo muestra debajo de la contraseña con texto en rojo */}
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Botón para enviar el formulario */}
          <button
            type="submit"
            // Si se da a enviar se desactiva el botón al momento, si hay error se vuelve a habilitar
            disabled={isLoading}
            className={`w-full text-white py-3 px-4 rounded-lg cursor-pointer ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
