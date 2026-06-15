"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r min-h-screen p-4">

      <h1 className="text-2xl font-bold mb-8">
        GateKeeper
      </h1>

      <nav className="space-y-2">

        <Link
          href="/dashboard"
          className="block p-2 rounded hover:bg-gray-100"
        >
          Dashboard
        </Link>

        <Link
          href="/projects"
          className="block p-2 rounded hover:bg-gray-100"
        >
          Projects
        </Link>

        <Link
          href="/audit-logs"
          className="block p-2 rounded hover:bg-gray-100"
        >
          Audit Logs
        </Link>

      </nav>
    </aside>
  );
}