import React, { useState, useEffect } from "react";
import { useTheme } from "../auth/ThemeContext";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "" });
  const [filter, setFilter] = useState("");
  const { theme } = useTheme();

  // Llamada a la API de jsonplaceholder, para simular usuarios en el apartado de usuarios
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
        {/* Se hace la validación de que si no se encontraron usuarios al filtrar por nombre muestre el mensaje */}
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
                {/* Esto se muestra cuando se le da click a los botones de editar */}
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
                    {/* Esto se muestra cuando se le da click a los botones de editar */}
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
                    {/* Esto se muestra cuando se le da click a los botones de editar */}
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

                  {/* Cuando está en la parte de editar se muestran estos dos botones, uno de Guardar y otro de Cancelar */}
                  {editId === user.id ? (
                    <div className="flex gap-4 mt-4">
                      <button
                        // Este onclick actualiza el estado y guarda los datos que se pusieron nuevos
                        // El .map si el id coincide con el que se editó, se crea el nuevo objeto editado
                        onClick={() => {
                          setUsers((prev) =>
                            prev.map((u) =>
                              u.id === user.id ? { ...u, ...editData } : u
                            )
                          );
                          //Al dar clic en guardar, se oculta la parte de editar y se vuelve al normal
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
                    // Cuando no se está en la parte de editar, sino en la normal, se muestran estos dos botones
                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={() => {
                          //setEditId sirve para controlar el usuario que se está actualizando
                          setEditId(user.id);
                          //setEditData obtiene los datos que se cambiaron y los actualiza si el usuario lo guarda
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
