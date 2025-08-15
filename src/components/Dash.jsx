import React from "react";
import ReposList from "./ReposList";
import Profile from "./Profile";
import { useTheme } from "../auth/ThemeContext";

function Dash() {
  const { theme } = useTheme();
  return (
    <div
      className={
        theme === "light"
          ? "w-11/12 mx-auto flex flex-col bg-gray-300 text-black rounded-lg h-auto p-4"
          : "w-11/12 mx-auto flex flex-col bg-gray-900 text-white rounded-lg h-auto p-4"
      }
    >
      {/* {theme === "light" ? :} */}
      <nav
        className={
          theme === "light"
            ? "flex gap-8 text-2xl font-bold bg-gray-200 rounded p-4"
            : "flex gap-8 text-2xl font-bold bg-gray-700 rounded p-4"
        }
      >
        <a href="#dashboard">Dashboard</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
      </nav>

      <div className="flex gap-4 mt-2">
        <div className="flex flex-col flex-1 gap-2">
          <div
            className={
              theme === "light"
                ? "bg-gray-200 rounded p-4"
                : "bg-gray-700 rounded p-4"
            }
          >
            <h2 className="text-2xl font-bold">Skills</h2>
          </div>
          <div
            className={
              theme === "light"
                ? "bg-gray-200 rounded p-4"
                : "bg-gray-700 rounded p-4"
            }
          >
            <h2 className="text-2xl font-bold mb-2">Projects</h2>
            <ReposList></ReposList>
          </div>
        </div>

        <aside
          className={
            theme === "light"
              ? "w-1/4 bg-gray-200 rounded p-4 flex flex-col items-center h-auto"
              : "w-1/4 bg-gray-700 rounded p-4 flex flex-col items-center h-auto"
          }
        >
          <Profile></Profile>
          <div className="w-full flex flex-col gap-2 mt-6">
            <a
              href="https://www.linkedin.com/in/mayron-castillo/"
              target="_blank"
              className="bg-gray-300 hover:bg-gray-400 rounded p-2 text-center"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Mayron-Castillo"
              target="_blank"
              className="bg-gray-300 hover:bg-gray-400 rounded p-2 text-center"
            >
              GitHub
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Dash;
