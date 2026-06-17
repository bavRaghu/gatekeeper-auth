"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import Navbar from "@/components/navbar";

import { Project }
  from "@/types/project";

import {
  FolderKanban,
  Search,
} from "lucide-react";

export default function ProjectsPage() {

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [search, setSearch] =
    useState("");

  const [projectName, setProjectName] =
    useState("");

  async function createProject() {

    const token =
      localStorage.getItem("token");

    await fetch(
      "http://localhost:8081/api/projects",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          Authorization:
            `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: projectName,
        }),
      }
    );

    window.location.reload();
  }

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    fetch(
      "http://localhost:8081/api/projects",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    )
      .then(res => res.json())
      .then(setProjects);

  }, []);

  const filteredProjects =
    projects.filter(project =>
      project.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <>
      <Navbar />

      <div
        className="
          min-h-screen
          bg-[#CAD2C5]
          text-[#2F3E46]
          p-10
        "
      >

        <div className="mb-12">

          <p
            className="
              uppercase
              tracking-[0.3em]
              text-[#52796F]
              mb-4
            "
          >
            Projects
          </p>

          <h1
            className="
              text-6xl
              font-black
              mb-4
            "
          >
            Manage your
            applications.
          </h1>

          <p
            className="
              text-xl
              text-[#354F52]
              max-w-3xl
            "
          >
            Organize projects,
            manage access and
            monitor activity
            from a single place.
          </p>

        </div>

        <div
          className="
            bg-[#84A98C]/30
            border
            border-[#84A98C]
            rounded-3xl
            p-8
            mb-12
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              mb-4
            "
          >
            Create Project
          </h2>

          <div
            className="
              flex
              gap-3
            "
          >

            <input
              value={projectName}
              onChange={(e) =>
                setProjectName(
                  e.target.value
                )
              }
              placeholder="Project Name"
              className="
                flex-1
                rounded-xl
                border
                px-4
                py-3
              "
            />

            <button
              onClick={createProject}
              className="
                rounded-xl
                bg-[#2F3E46]
                text-[#CAD2C5]
                px-6
              "
            >
              Create
            </button>

          </div>

        </div>

        <div
          className="
            grid
            md:grid-cols-2
            gap-8
            mb-12
          "
        >

          <div
            className="
              bg-[#84A98C]/30
              border
              border-[#84A98C]
              rounded-3xl
              p-8
            "
          >

            <FolderKanban
              size={36}
              className="mb-4"
            />

            <div
              className="
                text-5xl
                font-black
              "
            >
              {projects.length}
            </div>

            <div
              className="
                mt-2
                text-lg
              "
            >
              Total Projects
            </div>

          </div>

          <div
            className="
              bg-[#84A98C]/30
              border
              border-[#84A98C]
              rounded-3xl
              p-8
            "
          >

            <div
              className="
                text-lg
                font-semibold
                mb-4
              "
            >
              Search Projects
            </div>

            <div className="relative">

              <Search
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                "
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search..."
                className="
                  w-full
                  rounded-2xl
                  border
                  border-[#84A98C]
                  bg-[#CAD2C5]
                  py-3
                  pl-12
                  pr-4
                  outline-none
                "
              />

            </div>

          </div>

        </div>

        <div
          className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
          "
        >

          {filteredProjects.map(
            (project) => (

              <Link
                key={project.id}
                href={`/projects/${project.id}`}
              >

                <div
                  className="
                    rounded-3xl
                    border
                    border-[#84A98C]
                    bg-[#84A98C]/20
                    p-8
                    transition-all
                    duration-300
                    hover:bg-[#84A98C]/40
                    hover:-translate-y-1
                    h-full
                  "
                >

                  <div
                    className="
                      text-2xl
                      font-bold
                      mb-4
                    "
                  >
                    {project.name}
                  </div>

                  <div
                    className="
                      text-[#354F52]
                      mb-8
                    "
                  >
                    Application Project
                  </div>

                  <div
                    className="
                      text-[#52796F]
                      font-medium
                    "
                  >
                    View Project →
                  </div>

                </div>

              </Link>

            )
          )}

        </div>

        {filteredProjects.length === 0 && (

          <div
            className="
              mt-16
              text-center
              text-[#52796F]
            "
          >
            No projects found.
          </div>

        )}

      </div>

    </>

  );
}