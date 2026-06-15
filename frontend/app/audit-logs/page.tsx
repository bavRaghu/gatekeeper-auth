"use client";

import { useEffect, useState } from "react";

import { AuditLog }
  from "@/types/audit-log";

export default function AuditLogsPage() {

  const [logs, setLogs] =
    useState<AuditLog[]>([]);

  const [loading, setLoading] =
    useState(true);

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
          border
          rounded-lg
          overflow-hidden
        "
      >

        {logs.map((log) => (

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