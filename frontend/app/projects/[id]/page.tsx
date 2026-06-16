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

  const [newKeyName, setNewKeyName] =
    useState("");

  const [memberEmail, setMemberEmail] =
    useState("");

  const [memberRole, setMemberRole] =
    useState("VIEWER");

  async function createApiKey() {
    const { id } =
      await params;

    const token =
      localStorage.getItem("token");

    await fetch(
      `http://localhost:8081/api/projects/${id}/api-keys`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          Authorization:
            `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newKeyName,
        }),
      }
    );

    window.location.reload();
  }

  async function deleteApiKey(
    apiKeyId: number
  ) {

    const { id } =
      await params;

    const token =
      localStorage.getItem("token");

    await fetch(
      `http://localhost:8081/api/projects/${id}/api-keys/${apiKeyId}`,
      {
        method: "DELETE",
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    window.location.reload();
  }

  async function addMember() {

    const { id } =
      await params;

    const token =
      localStorage.getItem("token");

    await fetch(
      `http://localhost:8081/api/projects/${id}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          Authorization:
            `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: memberEmail,
          role: memberRole,
        }),
      }
    );

    setMemberEmail("");

    window.location.reload();
  }

  async function updateRole(
    userId: number,
    role: string
  ) {

    const { id } =
      await params;

    const token =
      localStorage.getItem("token");

    await fetch(
      `http://localhost:8081/api/projects/${id}/members/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
          Authorization:
            `Bearer ${token}`,
        },
        body: JSON.stringify({
          role,
        }),
      }
    );

    window.location.reload();
  }

  async function removeMember(
    userId: number
  ) {

    const { id } =
      await params;

    const token =
      localStorage.getItem("token");

    await fetch(
      `http://localhost:8081/api/projects/${id}/members/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    window.location.reload();
  }

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
          flex
          gap-2
          mb-4
        "
      >

        <input
          value={memberEmail}
          onChange={(e) =>
            setMemberEmail(
              e.target.value
            )
          }
          placeholder="user@gmail.com"
          className="
            border
            rounded
            px-3
            py-2
          "
        />

        <select
          value={memberRole}
          onChange={(e) =>
            setMemberRole(
              e.target.value
            )
          }
          className="
            border
            rounded
            px-3
            py-2
          "
        >
          <option value="VIEWER">
            VIEWER
          </option>


          <option value="DEVELOPER">
            DEVELOPER
          </option>

          <option value="ADMIN">
            ADMIN
          </option>

          <option value="OWNER">
            OWNER
          </option>
        </select>

        <button
          onClick={addMember}
          className="
            border
            rounded
            px-4
            py-2
          "
        >
          Add Member
        </button>

      </div>


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
                flex
                justify-between
                items-center
              "
            >

              <div>

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

              <div
                className="
                  flex
                  gap-2
                "
              >

                <select
                  defaultValue={member.role}
                  onChange={(e) =>
                    updateRole(
                      member.id,
                      e.target.value
                    )
                  }
                  className="
                    border
                    rounded
                    px-2
                  "
                >

                  <option value="VIEWER">
                    VIEWER
                  </option>

                  <option value="DEVELOPER">
                    DEVELOPER
                  </option>

                  <option value="ADMIN">
                    ADMIN
                  </option>

                  <option value="OWNER">
                    OWNER
                  </option>
                </select>

                <button
                  onClick={() =>
                    removeMember(
                      member.id
                    )
                  }
                  className="
                    border
                    rounded
                    px-3
                    py-1
                  "
                >
                  Remove
                </button>

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

              <div className="flex gap-2 mb-4">

                <input
                  value={newKeyName}
                  onChange={(e) =>
                    setNewKeyName(
                      e.target.value
                    )
                  }
                  placeholder="deployment"
                  className="
                    border
                    rounded
                    px-3
                    py-2
                  "
                />

                <button
                  onClick={createApiKey}
                  className="
                    border
                    rounded
                    px-4
                    py-2
                  "
                >
                  Create
                </button>

              </div>


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
                  flex
                  justify-between
                  items-center
                "
              >
                <div>
                    {apiKey.name}
                </div>
                <button
                  onClick={() =>
                    deleteApiKey(
                      apiKey.id
                    )
                  }
                  className="
                        border
                        rounded
                        px-3
                        py-1
                      "
                >
                  Delete
                </button>
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