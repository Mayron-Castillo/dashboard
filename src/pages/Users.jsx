import React, { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
