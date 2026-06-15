"use client";

import { useEffect, useState } from "react";

import { ProjectDetails }
  from "@/types/project-details";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const [project, setProject] =
    useState<ProjectDetails | null>(
      null
    );

  useEffect(() => {

    async function loadProject() {

      const { id } =
        await params;

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await fetch(
          `http://localhost:8081/api/projects/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const data =
        await response.json();

      setProject(data);
    }

    loadProject();

  }, [params]);

  if (!project) {

    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">

      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          {project.name}
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Owner: {project.ownerEmail}
        </p>

      </div>

      <div>

        <h2
          className="
            text-xl
            font-semibold
            mb-4
          "
        >
          Members
        </h2>

        <div
          className="
            border
            rounded-lg
            overflow-hidden
          "
        >

          {project.members.map(
            member => (

              <div
                key={member.id}
                className="
                  p-4
                  border-b
                  last:border-b-0
                "
              >

                <div>
                  {member.email}
                </div>

                <div
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  {member.role}
                </div>

              </div>

            )
          )}

        </div>

      </div>

      <div>

        <h2
          className="
            text-xl
            font-semibold
            mb-4
          "
        >
          API Keys
        </h2>

        <div
          className="
            border
            rounded-lg
            overflow-hidden
          "
        >

          {project.apiKeys.map(
            apiKey => (

              <div
                key={apiKey.id}
                className="
                  p-4
                  border-b
                  last:border-b-0
                "
              >
                {apiKey.name}
              </div>

            )
          )}

        </div>

      </div>

      <div>

        <h2
          className="
            text-xl
            font-semibold
            mb-4
          "
        >
          Recent Activity
        </h2>

        <div
          className="
            border
            rounded-lg
            overflow-hidden
          "
        >

          {project.recentActivity.map(
            (activity, index) => (

              <div
                key={index}
                className="
                  p-4
                  border-b
                  last:border-b-0
                "
              >

                <div
                  className="
                    font-medium
                  "
                >
                  {activity.action}
                </div>

                <div
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  {activity.details}
                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}