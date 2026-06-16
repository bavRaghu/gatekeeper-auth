"use client";

import { useEffect, useState } from "react";

import { AuditLog }
  from "@/types/audit-log";

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
    <div className="p-8">

      <h1
        className="
          text-3xl
          font-bold
          mb-8
        "
      >
        Audit Logs
      </h1>

      <div
        className="
          grid
          grid-cols-3
          gap-4
          mb-8
        "
      >

        <div
          className="
            border
            rounded-lg
            p-4
          "
        >
          <div
            className="
              text-sm
              text-gray-500
            "
          >
            Total Events
          </div>

          <div
            className="
              text-2xl
              font-bold
            "
          >
            {logs.length}
          </div>
        </div>

        <div
          className="
            border
            rounded-lg
            p-4
          "
        >
          <div
            className="
              text-sm
              text-gray-500
            "
          >
            Projects
          </div>

          <div
            className="
              text-2xl
              font-bold
            "
          >
            {projects.length}
          </div>
        </div>

        <div
          className="
            border
            rounded-lg
            p-4
          "
        >
          <div
            className="
              text-sm
              text-gray-500
            "
          >
            Actions
          </div>

          <div
            className="
              text-2xl
              font-bold
            "
          >
            {actions.length}
          </div>
        </div>

      </div>

      <div
        className="
          flex
          gap-4
          mb-8
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
            border
            rounded
            px-3
            py-2
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
            border
            rounded
            px-3
            py-2
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
            border
            rounded
            px-3
            py-2
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

      <div
        className="
          border
          rounded-lg
          overflow-hidden
        "
      >

        {filteredLogs.map((log) => (

          <div
            key={log.id}
            className="
              p-4
              border-b
              last:border-b-0
            "
          >

            <div
              className="
                flex
                justify-between
                items-start
              "
            >

              <div>

                <div
                  className="
                    font-semibold
                  "
                >
                  {log.action}
                </div>

                <div
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  {log.projectName}
                </div>

              </div>

              <div
                className="
                  text-xs
                  text-gray-500
                "
              >
                {new Date(
                  log.createdAt
                ).toLocaleString()}
              </div>

            </div>

            <div
              className="
                mt-2
              "
            >
              {log.details}
            </div>

            <div
              className="
                mt-2
                text-sm
                text-gray-500
              "
            >
              by {log.userEmail}
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}