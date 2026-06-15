"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Project }
  from "@/types/project";

export default function ProjectsPage() {

  const [projects, setProjects] =
    useState<Project[]>([]);

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

console.log(projects);

  return (
    <div className="p-8">

      <div className="flex justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Projects
        </h1>

      </div>
<div className="space-y-4">

  {projects.map((project) => (

    <Link
      href={`/projects/${project.id}`}
      key={project.id}
    >
      <div
        className="
          border
          rounded-lg
          p-4
          hover:bg-gray-50
          cursor-pointer
          transition
        "
      >
        <div className="font-semibold">
          {project.name}
        </div>

        <div className="text-sm text-gray-500">
          ID: {project.id}
        </div>
      </div>
    </Link>

  ))}

</div>

    </div>
  );
}