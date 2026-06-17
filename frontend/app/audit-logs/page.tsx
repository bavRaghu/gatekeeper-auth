"use client";

import { useEffect, useState } from "react";

import { AuditLog }
  from "@/types/audit-log";

import Navbar from "@/components/navbar";

import {
  ScrollText,
  FolderKanban,
  Activity,
} from "lucide-react";

export default function AuditLogsPage() {

  const [logs, setLogs] =
    useState<AuditLog[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [selectedProject, setSelectedProject] =
    useState("ALL");

  const [selectedAction, setSelectedAction] =
    useState("ALL");

  useEffect(() => {

    async function loadLogs() {

      const token =
        localStorage.getItem("token");

      const response =
        await fetch(
          "http://localhost:8081/api/audit-logs",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const data =
        await response.json();

      setLogs(data);

      setLoading(false);
    }

    loadLogs();

  }, []);

  const projects =
    [...new Set(
      logs.map(
        log => log.projectName
      )
    )];

  const actions =
    [...new Set(
      logs.map(
        log => log.action
      )
    )];

  const filteredLogs =
    logs.filter(log => {

      const matchesSearch =
        log.details
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        log.userEmail
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesProject =
        selectedProject === "ALL" ||
        log.projectName ===
        selectedProject;

      const matchesAction =
        selectedAction === "ALL" ||
        log.action ===
        selectedAction;

      return (
        matchesSearch &&
        matchesProject &&
        matchesAction
      );

    });

  if (loading) {

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
          Audit Logs
        </p>

        <h1
          className="
            text-6xl
            font-black
            mb-4
          "
        >
          Track everything.
        </h1>

        <p
          className="
            text-xl
            text-[#354F52]
            max-w-3xl
          "
        >
          Monitor activity,
          member actions and
          API key events across
          your projects.
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

          <ScrollText
            size={36}
            className="mb-4"
          />

          <div
            className="
              text-5xl
              font-black
            "
          >
            {logs.length}
          </div>

          <div className="mt-2">
            Total Events
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

          <div className="mt-2">
            Projects Impacted
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
            {actions.length}
          </div>

          <div className="mt-2">
            Event Types
          </div>

        </div>

      </div>

      <div
        className="
          flex
          flex-wrap
          gap-4
          mb-12
        "
      >

        <input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search..."
          className="
            rounded-xl
            border
            border-[#84A98C]
            bg-[#CAD2C5]
            px-4
            py-3
          "
        />

        <select
          value={selectedProject}
          onChange={(e) =>
            setSelectedProject(
              e.target.value
            )
          }
          className="
            rounded-xl
            border
            border-[#84A98C]
            bg-[#CAD2C5]
            px-4
            py-3
          "
        >

          <option value="ALL">
            All Projects
          </option>

          {projects.map(project => (

            <option
              key={project}
              value={project}
            >
              {project}
            </option>

          ))}

        </select>

        <select
          value={selectedAction}
          onChange={(e) =>
            setSelectedAction(
              e.target.value
            )
          }
          className="
            rounded-xl
            border
            border-[#84A98C]
            bg-[#CAD2C5]
            px-4
            py-3
          "
        >

          <option value="ALL">
            All Actions
          </option>

          {actions.map(action => (

            <option
              key={action}
              value={action}
            >
              {action}
            </option>

          ))}

        </select>

      </div>

      <div className="space-y-4">

        {filteredLogs.map(log => (

          <div
            key={log.id}
            className="
              rounded-3xl
              border
              border-[#84A98C]
              bg-[#84A98C]/20
              p-6
            "
          >

            <div
              className="
                flex
                justify-between
                items-start
                mb-4
              "
            >

              <div>

                <div
                  className="
                    text-xl
                    font-bold
                  "
                >
                  {log.action}
                </div>

                <div
                  className="
                    text-[#52796F]
                    mt-1
                  "
                >
                  {log.projectName}
                </div>

              </div>

              <div
                className="
                  text-sm
                  text-[#52796F]
                "
              >
                {
                  new Date(
                    log.createdAt
                  )
                  .toLocaleString()
                }
              </div>

            </div>

            <div
              className="
                text-[#354F52]
                mb-4
              "
            >
              {log.details}
            </div>

            <div
              className="
                text-sm
                text-[#52796F]
              "
            >
              by {log.userEmail}
            </div>

          </div>

        ))}

      </div>

    </div>

  </>

  );
}