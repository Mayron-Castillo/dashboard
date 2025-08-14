import React from "react";
import ReposList from "./ReposList";

function Dash() {
  return (
    <div className="w-11/12 mx-auto flex flex-col bg-gray-300 text-black rounded-lg h-auto p-4">
      <nav className="flex gap-8 text-2xl font-bold bg-gray-200 rounded p-4">
        <a href="#dashboard">Dashboard</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
      </nav>

      <div className="flex gap-4 mt-2">
        <div className="flex flex-col flex-1 gap-2">
          <section className="bg-gray-200 rounded p-4">
            <h2 className="text-2xl font-bold mb-2">Recent Projects</h2>
          </section>
          <div className="bg-gray-200 rounded p-4">
            <h2 className="text-2xl font-bold">Skills</h2>
          </div>
          <div className="bg-gray-200 rounded p-4">
            <ReposList></ReposList>
          </div>
        </div>

        <aside className="w-1/4 bg-gray-200 rounded p-4 flex flex-col items-center h-[250px]">
          <h1 className="text-xl font-bold">Hi, I'm Mayron</h1>
          <p className="text-lg mb-4">React Developer</p>
          <div className="w-full flex flex-col gap-2">
            <a
              href="#"
              className="bg-gray-300 hover:bg-gray-400 rounded p-2 text-center"
            >
              Download CV
            </a>
            <a
              href="#"
              className="bg-gray-300 hover:bg-gray-400 rounded p-2 text-center"
            >
              LinkedIn
            </a>
            <a
              href="#"
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
