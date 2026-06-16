"use client";

import Link from "next/link";

export default function Sidebar() {

  return (

    <aside
      className="
        w-72
        min-h-screen
        bg-[#2F3E46]
        text-white
        p-6
      "
    >

      <h1
        className="
          text-3xl
          font-bold
          mb-10
        "
      >
        GateKeeper
      </h1>

      <nav
        className="
          space-y-2
        "
      >

        <Link
          href="/dashboard"
          className="
            block
            p-3
            rounded-xl
            hover:bg-[#354F52]
            transition
          "
        >
          Dashboard
        </Link>

        <Link
          href="/projects"
          className="
            block
            p-3
            rounded-xl
            hover:bg-[#354F52]
            transition
          "
        >
          Projects
        </Link>

        <Link
          href="/api-keys"
          className="
            block
            p-3
            rounded-xl
            hover:bg-[#354F52]
            transition
          "
        >
          API Keys
        </Link>

        <Link
          href="/audit-logs"
          className="
            block
            p-3
            rounded-xl
            hover:bg-[#354F52]
            transition
          "
        >
          Audit Logs
        </Link>

      </nav>

    </aside>

  );
}