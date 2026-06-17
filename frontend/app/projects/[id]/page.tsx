"use client";

import { useEffect, useState } from "react";

import { ProjectDetails }
  from "@/types/project-details";

import Navbar from "@/components/navbar";

import {
  Users,
  KeyRound,
  Activity,
} from "lucide-react";

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

  const [createdKey, setCreatedKey] =
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

    const response =
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

    const data = await response.json();

    setCreatedKey(data.apiKey);

    const updatedResponse =
      await fetch(
        `http://localhost:8081/api/projects/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    const updatedProject =
      await updatedResponse.json();

    setProject(updatedProject);
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
          Project
        </p>

        <h1
          className="
            text-6xl
            font-black
            mb-4
          "
        >
          {project.name}
        </h1>

        <p
          className="
            text-xl
            text-[#354F52]
          "
        >
          Owned by {project.ownerEmail}
        </p>

      </div>

      <div
        className="
          grid
          md:grid-cols-3
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

          <Users
            size={36}
            className="mb-4"
          />

          <div
            className="
              text-5xl
              font-black
            "
          >
            {project.members.length}
          </div>

          <div className="mt-2">
            Members
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

          <KeyRound
            size={36}
            className="mb-4"
          />

          <div
            className="
              text-5xl
              font-black
            "
          >
            {project.apiKeys.length}
          </div>

          <div className="mt-2">
            API Keys
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

          <Activity
            size={36}
            className="mb-4"
          />

          <div
            className="
              text-5xl
              font-black
            "
          >
            {project.recentActivity.length}
          </div>

          <div className="mt-2">
            Recent Events
          </div>

        </div>

      </div>

      <div
        className="
          grid
          xl:grid-cols-2
          gap-8
        "
      >

        <div
          className="
            rounded-3xl
            border
            border-[#84A98C]
            bg-[#84A98C]/20
            p-8
          "
        >

          <h2
            className="
              text-3xl
              font-bold
              mb-6
            "
          >
            Members
          </h2>

          <div
            className="
              flex
              gap-2
              mb-6
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
                flex-1
                rounded-xl
                border
                px-4
                py-3
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
                rounded-xl
                border
                px-4
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
                rounded-xl
                bg-[#2F3E46]
                text-[#CAD2C5]
                px-4
              "
            >
              Add
            </button>

          </div>

          <div className="space-y-3">

            {project.members.map(
              member => (

                <div
                  key={member.id}
                  className="
                    rounded-2xl
                    bg-[#CAD2C5]
                    p-4
                    flex
                    justify-between
                    items-center
                  "
                >

                  <div>

                    <div className="font-medium">
                      {member.email}
                    </div>

                    <div
                      className="
                        text-sm
                        text-[#52796F]
                      "
                    >
                      <select
                        value={member.role}
                        onChange={(e) =>
                          updateRole(
                            member.id,
                            e.target.value
                          )
                        }
                        className="
                          rounded-xl
                          border
                          px-3
                          py-2
                          mt-2
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
                    </div>

                  </div>

                  <button
                    onClick={() =>
                      removeMember(
                        member.id
                      )
                    }
                    className="
                      text-red-600
                    "
                  >
                    Remove
                  </button>

                </div>

              )
            )}

          </div>

        </div>

        <div
          className="
            rounded-3xl
            border
            border-[#84A98C]
            bg-[#84A98C]/20
            p-8
          "
        >

{
  createdKey && (

    <div
      className="
        mb-6
        rounded-2xl
        border
        border-[#84A98C]
        bg-[#84A98C]/20
        p-6
      "
    >

      <div
        className="
          font-semibold
          mb-3
        "
      >
        Save this key now.
        You won't be able
        to view it again.
      </div>

      <code
        className="
          block
          break-all
        "
      >
        {createdKey}
      </code>

      <button
        onClick={() =>
          setCreatedKey("")
        }
        className="
          mt-4
          px-4
          py-2
          rounded-xl
          bg-[#2F3E46]
          text-white
        "
      >
        Close
      </button>

    </div>

  )
}
          <h2
            className="
              text-3xl
              font-bold
              mb-6
            "
          >
            API Keys
          </h2>

          <div
            className="
              flex
              gap-2
              mb-6
            "
          >

            <input
              value={newKeyName}
              onChange={(e) =>
                setNewKeyName(
                  e.target.value
                )
              }
              placeholder="deployment"
              className="
                flex-1
                rounded-xl
                border
                px-4
                py-3
              "
            />

            <button
              onClick={createApiKey}
              className="
                rounded-xl
                bg-[#2F3E46]
                text-[#CAD2C5]
                px-4
              "
            >
              Create
            </button>

          </div>

          <div className="space-y-3">

            {project.apiKeys.map(
              apiKey => (

                <div
                  key={apiKey.id}
                  className="
                    rounded-2xl
                    bg-[#CAD2C5]
                    p-4
                    flex
                    justify-between
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
                      text-red-600
                    "
                  >
                    Delete
                  </button>

                </div>

              )
            )}

          </div>

        </div>

      </div>

      <div
        className="
          mt-8
          rounded-3xl
          border
          border-[#84A98C]
          bg-[#84A98C]/20
          p-8
        "
      >

        <h2
          className="
            text-3xl
            font-bold
            mb-6
          "
        >
          Recent Activity
        </h2>

        <div className="space-y-4">

          {project.recentActivity.map(
            (
              activity,
              index
            ) => (

              <div
                key={index}
                className="
                  rounded-2xl
                  bg-[#CAD2C5]
                  p-4
                "
              >

                <div
                  className="
                    font-semibold
                  "
                >
                  {activity.action}
                </div>

                <div
                  className="
                    text-[#354F52]
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

  </>

  );
}