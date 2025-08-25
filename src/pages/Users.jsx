import React, { useState, useEffect } from "react";
import { useTheme } from "../auth/ThemeContext";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "" });
  const [filter, setFilter] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "" });
  const [addForm, setAddForm] = useState(false);
  const [formError, setFormError] = useState("");
  const { theme } = useTheme();

  // Llamada a la API de jsonplaceholder
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Hubo un error al cargar los usuarios");
        }
        const data = await response.json();
        setUsers(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Validaciones por si se tarda en cargar y por si hay un error
  if (loading)
    return (
      <p
        className={`${
          theme === "light" ? "bg-white" : "bg-gray-800"
        } min-h-screen`}
      >
        Cargando...
      </p>
    );
  if (error)
    return (
      <p
        className={`${
          theme === "light" ? "bg-white" : "bg-gray-800"
        } min-h-screen`}
      >
        {error.message}
      </p>
    );

  // Filtro para buscar a los usuarios en el input
  const filterUsers = users.filter((user) => {
    return user.name.toLowerCase().includes(filter.toLowerCase());
  });

  // Crear nuevo usuario
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.phone) {
      setFormError("Por favor complete todos los campos requeridos");
      return false;
    }

    setUsers([...users, { ...newUser, id: Date.now() }]);
    setNewUser({ name: "", email: "", phone: "" });
    setFormError("");
    return true;
  };

  return (
    <div
      className={`${
        theme === "light" ? "bg-gray-100" : "bg-gray-800"
      } min-h-screen p-6`}
    >
      <h1
        className={`${
          theme === "light" ? "text-gray-700" : "text-gray-300"
        } text-3xl font-bold text-center mb-8`}
      >
        Usuarios
      </h1>

      {/* Botón para mostrar formulario */}
      {!addForm && (
        <div className="w-full flex justify-center mb-8">
          <button
            onClick={() => setAddForm(true)}
            className="px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer bg-green-500 hover:bg-green-600 text-white"
          >
            Agregar nuevo usuario
          </button>
        </div>
      )}

      {/* Formulario para crear nuevo usuario */}
      {addForm && (
        <div className="w-full max-w-2xl mx-auto mb-8">
          <div
            className={`${
              theme === "light"
                ? "bg-white text-gray-600"
                : "bg-gray-800 text-gray-300"
            } rounded-lg p-6 border-2 border-gray-600`}
          >
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Nuevo Usuario
            </h2>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  className={`w-full p-2 border-2 ${
                    theme === "light"
                      ? "border-gray-600 bg-white"
                      : "border-gray-600 bg-gray-700"
                  } rounded`}
                  placeholder="Nombre"
                />
              </div>
              <div>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className={`w-full p-2 border-2 ${
                    theme === "light"
                      ? "border-gray-600 bg-white"
                      : "border-gray-600 bg-gray-700"
                  } rounded`}
                  placeholder="Tu correo"
                />
              </div>
              <div>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) =>
                    setNewUser({ ...newUser, phone: e.target.value })
                  }
                  className={`w-full p-2 border-2 ${
                    theme === "light"
                      ? "border-gray-600 bg-white"
                      : "border-gray-600 bg-gray-700"
                  } rounded`}
                  placeholder="Teléfono"
                />
              </div>
              {formError && (
                <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-center">
                  {formError}
                </div>
              )}
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => {
                  const success = handleAddUser();
                  if (success) {
                    setAddForm(false);
                  }
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-medium cursor-pointer transition-colors"
              >
                Crear Usuario
              </button>
              <button
                onClick={() => setAddForm(false)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-medium cursor-pointer transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {/* Input para buscar a los usuarios */}
        <input
          type="text"
          placeholder="Buscar usuario"
          className={`${
            theme === "light"
              ? "text-gray-700 placeholder:text-gray-700"
              : "text-gray-300 placeholder:text-gray-300"
          } border-2 border-gray-600 w-4/12 p-2 mb-5 flex justify-center items-center`}
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </div>

      <div className="min-h-screen">
        {filterUsers.length === 0 ? (
          <p
            className={`${
              theme === "light" ? "text-black" : "text-gray-400"
            } text-center text-2xl mt-4`}
          >
            No se encontraron usuarios
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filterUsers.map((user) => (
              <div
                key={user.id}
                className={`${
                  theme === "light"
                    ? "bg-white text-gray-600"
                    : "bg-gray-800 text-gray-300"
                } rounded-lg p-6 border-2 border-gray-600`}
              >
                {editId === user.id ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="text-xl font-semibold mb-3 border border-gray-600"
                  />
                ) : (
                  <h2 className="text-xl font-semibold mb-3">{user.name}</h2>
                )}
                <hr
                  className={theme === "light" ? "p-2" : "p-2 text-gray-600"}
                />
                <div className="flex flex-col gap-2">
                  <p>
                    <span className="font-medium pr-2">Email:</span>
                    {editId === user.id ? (
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) =>
                          setEditData({ ...editData, email: e.target.value })
                        }
                        className="border border-gray-600"
                      />
                    ) : (
                      user.email
                    )}
                  </p>

                  <p>
                    <span className="font-medium pr-2">Teléfono:</span>
                    {editId === user.id ? (
                      <input
                        type="phone"
                        value={editData.phone}
                        onChange={(e) =>
                          setEditData({ ...editData, phone: e.target.value })
                        }
                        className="border border-gray-600"
                      />
                    ) : (
                      user.phone
                    )}
                  </p>

                  {editId === user.id ? (
                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={() => {
                          setUsers((prev) =>
                            prev.map((u) =>
                              u.id === user.id ? { ...u, ...editData } : u
                            )
                          );
                          setEditId(null);
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded cursor-pointer"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-1 rounded cursor-pointer"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={() => {
                          setEditId(user.id);
                          setEditData({
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                          });
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => {
                          setUsers((prev) =>
                            prev.filter((u) => u.id !== user.id)
                          );
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
