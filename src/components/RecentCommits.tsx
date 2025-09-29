import { useEffect, useState } from "react";
import { useTheme } from "../auth/ThemeContext.js";

const username = import.meta.env.VITE_GITHUB_USER;

function RecentActivity() {
  const [commits, setCommits] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  // Se llama a la API de github en la que se trae los eventos de mi usuario
  useEffect(() => {
    const getActivity = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/events`
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();

        // Se filtran los eventos, type son PushEvent, y con el slice se acceden a los últimos 4 commits
        const recentCommits = data
          .filter((event) => event.type === "PushEvent")
          .slice(0, 4);

        setCommits(recentCommits);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getActivity();
  }, []);
  // Validaciones de renderizado, para evitar errores
  if (loading) return <p>Cargando actividad reciente...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!commits.length) return <p>No hay actividad reciente.</p>;

  return (
    <div
      className={`${
        theme === "light" ? "bg-gray-300" : "bg-gray-800"
      } p-4 rounded h-full`}
    >
      <ul>
        {/* Se hace un .map de  los eventos, al paylad.commits se accede a los commits */}
        {commits.map((event) =>
          event.payload.commits.map((commit) => (
            <li
              key={commit.sha}
              className={`${
                theme === "light" ? "bg-gray-300 font-bold" : "bg-gray-800"
              } py-1 rounded`}
            >
              <p className="font-semibold">{commit.message}</p>
              <span className="text-sm text-gray-500">
                Repositorio: {event.repo.name}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default RecentActivity;
