import { useEffect, useState } from "react";
import { useTheme } from "../auth/ThemeContext";

const token = import.meta.env.VITE_GITHUB_TOKEN;
const username = import.meta.env.VITE_GITHUB_USER;

function RecentActivity() {
  const [commits, setCommits] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const getActivity = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/events`,
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();

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
