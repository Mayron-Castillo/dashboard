import { useEffect, useState } from "react";
import { useTheme } from "../auth/ThemeContext.js";

const username = import.meta.env.VITE_GITHUB_USER;

// Interfaz para el commit
interface GithubCommit {
  sha: string;
  message: string;
}

//interfaz para el nombre del repo
interface GithubRepo {
  name: string;
}

//interfaz del payload donde sacamos los commits
interface GithubPayload {
  commits: GithubCommit[];
}

//interfaz del evento
interface GithubEvent {
  type: string;
  payload: GithubPayload;
  repo: GithubRepo;
}

function RecentActivity() {
  const [commits, setCommits] = useState<GithubEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { theme } = useTheme();

  // Se llama a la API de github en la que se trae los eventos de mi usuario
  useEffect(() => {
    const getActivity = async (): Promise<void> => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/events`
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: GithubEvent[] = await res.json();

        // Se filtran los eventos, type son PushEvent, y con el slice se acceden a los últimos 4 commits
        const recentCommits = data
          .filter((event: GithubEvent) => event.type === "PushEvent")
          .slice(0, 4);

        setCommits(recentCommits);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Hubo un error";
        setError(errorMessage);
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
        {commits.map((event: GithubEvent) =>
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
