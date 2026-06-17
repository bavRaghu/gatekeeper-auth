"use client";

export default function Navbar() {

  return (

    <nav
      className="
        sticky
        top-0
        z-50
        backdrop-blur-xl
        bg-[#2F3E46]/90
        border-b
        border-[#52796F]
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-10
          py-5
          flex
          justify-between
          items-center
        "
      >

        <div
          className="
            flex
            items-center
            gap-12
          "
        >

          <a
            href="/"
            className="
              text-2xl
              font-black
              text-[#CAD2C5]
            "
          >
            GateKeeper
          </a>

          <div
            className="
              hidden
              md:flex
              gap-8
              text-[#CAD2C5]
            "
          >

            <a
              href="/dashboard"
              className="
                hover:text-[#84A98C]
                transition
              "
            >
              Dashboard
            </a>

            <a
              href="/projects"
              className="
                hover:text-[#84A98C]
                transition
              "
            >
              Projects
            </a>

            <a
              href="/api-keys"
              className="
                hover:text-[#84A98C]
                transition
              "
            >
              API Keys
            </a>

            <a
              href="/audit-logs"
              className="
                hover:text-[#84A98C]
                transition
              "
            >
              Audit Logs
            </a>

          </div>

        </div>



        <button
          onClick={() => {

            localStorage.removeItem(
              "token"
            );

            window.location.href = "/";
          }}
          className="
//             px-4
//             py-2
//             rounded-xl
//             bg-[#84A98C]
//             text-[#2F3E46]
//             font-semibold
            px-4
            py-2
            rounded-xl
            border
            border-[#84A98C]
            text-[#CAD2C5]
            hover:bg-[#354F52]
            transition
          "
        >
          Logout
        </button>

      </div>


    </nav>

  );
}