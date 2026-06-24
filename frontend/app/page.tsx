import {
  ShieldCheck,
  KeyRound,
  Users,
  ScrollText,
  BarChart3,
  Gauge,
  Lock,
  Database,
} from "lucide-react";

export default function Home() {

  return (

    <main
      className="
        min-h-screen
        bg-[#CAD2C5]
        text-[#2F3E46]
      "
    >

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

      <h1
        className="
          text-2xl
          font-black
          text-[#CAD2C5]
        "
      >
        GateKeeper
      </h1>

      <div
        className="
          hidden
          md:flex
          gap-8
          text-[#CAD2C5]
        "
      >

        <a
          href="#features"
          className="
            hover:text-[#84A98C]
            transition
          "
        >
          Features
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
          href="#why-gatekeeper"
          className="
            hover:text-[#84A98C]
            transition
          "
        >
          Why GateKeeper
        </a>

      </div>

    </div>

    <div
      className="
        flex
        items-center
        gap-4
      "
    >

      <a
        href="/dashboard"
        className="
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
        Dashboard
      </a>

      <a
        href="/login"
        className="
          px-5
          py-2
          rounded-xl
          bg-[#84A98C]
          text-[#2F3E46]
          font-semibold
          hover:scale-105
          transition
        "
      >
        Login
      </a>

    </div>

  </div>

</nav>

    <section
      className="
        relative
        overflow-hidden
        min-h-[90vh]
        flex
        items-center
      "
    >

      <div
        className="
          absolute
          -top-40
          -right-20
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#84A98C]/40
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-0
          h-[400px]
          w-[400px]
          rounded-full
          bg-[#52796F]/30
          blur-3xl
        "
      />

      <div
        className="
          max-w-7xl
          mx-auto
          px-10
          grid
          lg:grid-cols-2
          gap-16
          items-center
          relative
          z-10
        "
      >

        <div>

          <p
            className="
              uppercase
              tracking-[0.3em]
              text-[#52796F]
              mb-6
            "
          >
            Authentication Infrastructure
          </p>

          <h1
            className="
              text-7xl
              lg:text-8xl
              font-black
              leading-none
              mb-8
            "
          >
            AUTH.
            <br />
            ACCESS.
            <br />
            VISIBILITY.
          </h1>

          <p
            className="
              text-xl
              text-[#354F52]
              max-w-xl
              mb-10
              leading-relaxed
            "
          >
            OAuth authentication,
            API key management,
            access control,
            audit logging and analytics
            for modern applications.
          </p>

          <div
            className="
              flex
              gap-4
            "
          >

            <a
              href="http://localhost:8081/oauth2/authorization/google"
              className="
                px-8
                py-4
                rounded-2xl
                bg-[#2F3E46]
                text-white
                font-medium
              "
            >
              Get Started
            </a>

            <a
              href="#features"
              className="
                px-8
                py-4
                rounded-2xl
                border-2
                border-[#354F52]
              "
            >
              Explore Features
            </a>

          </div>

        </div>

        <div
          className="
            relative
            h-[500px]
          "
        >

          <div
            className="
              absolute
              top-0
              right-10
              bg-[#2F3E46]
              text-white
              rounded-3xl
              p-6
              w-72
              rotate-3
            "
          >
            <div className="font-semibold">
              OAuth Login Enabled
            </div>

            <div className="mt-2 text-sm">
              Google OAuth connected
            </div>
          </div>

          <div
            className="
              absolute
              top-36
              left-0
              bg-[#52796F]
              text-white
              rounded-3xl
              p-6
              w-80
              -rotate-2
            "
          >
            <div className="font-semibold">
              API_KEY_CREATED
            </div>

            <div className="mt-2 text-sm">
              deployment-key
            </div>
          </div>

          <div
            className="
              absolute
              bottom-24
              right-0
              bg-[#84A98C]
              rounded-3xl
              p-6
              w-72
              rotate-2
            "
          >
            <div className="font-semibold">
              ROLE_UPDATED
            </div>

            <div className="mt-2 text-sm">
              Developer → Admin
            </div>
          </div>

          <div
            className="
              absolute
              bottom-0
              left-10
              bg-[#354F52]
              text-white
              rounded-3xl
              p-6
              w-80
              -rotate-3
            "
          >
            <div className="font-semibold">
              AUDIT_LOG_RECORDED
            </div>

            <div className="mt-2 text-sm">
              Activity successfully tracked
            </div>
          </div>

        </div>

      </div>

    </section>

         <section
           className="
             relative
             max-w-7xl
             mx-auto
             px-10
             py-32
             -mt-20
           "
         >

        <div
          className="
            absolute
            right-0
            top-20
            h-72
            w-72
            rounded-full
            bg-[#84A98C]/20
            blur-3xl
          "
        />

        <p
          id="why-gatekeeper"
          className="
            uppercase
            tracking-[0.3em]
            text-[#52796F]
            mb-6
          "
        >
          Why GateKeeper
        </p>

        <h2
          className="
            text-6xl
            font-black
            leading-tight
            mb-12
          "
        >
          Security shouldn't
          slow teams down.
        </h2>

        <div
          className="
            max-w-4xl
            text-xl
            leading-relaxed
            text-[#354F52]
            mb-16
          "
        >
          Modern applications need authentication,
          access control,
          API key management
          and auditability.

          Most teams rebuild these
          systems from scratch.

          GateKeeper provides them
          out of the box so developers
          can focus on building products,
          not infrastructure.
        </div>

        <div
          className="
            grid
            md:grid-cols-3
            gap-8
          "
        >

          {[
            {
              title: "Authentication",
              text:
                "OAuth and JWT authentication without rebuilding login systems.",
            },
            {
              title: "Access Control",
              text:
                "Manage project roles and permissions across your organization.",
            },
            {
              title: "Visibility",
              text:
                "Track actions and understand exactly what happened and when.",
            },
          ].map(item => (

            <div
              key={item.title}
              className="
                bg-[#84A98C]/30
                backdrop-blur
                border
                border-[#84A98C]
                rounded-3xl
                p-8
              "
            >

              <h3
                className="
                  text-2xl
                  font-bold
                  mb-4
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  text-[#354F52]
                  leading-relaxed
                "
              >
                {item.text}
              </p>

            </div>

          ))}

        </div>

      </section>

    <section
      id="features"
      className="
        relative
        max-w-7xl
        mx-auto
        px-10
      "
    >

      <div
        className="
          absolute
          left-0
          top-0
          h-25
          w-25
          rounded-full
          bg-[#84A98C]/20
          blur-3xl
        "
      />

      <p
        className="
          uppercase
          tracking-[0.3em]
          text-[#52796F]
          mb-6
        "
      >
        Features
      </p>

      <h2
        className="
          text-6xl
          font-black
          leading-tight
          mb-8
        "
      >
        Everything needed
        to secure modern
        applications.
      </h2>

      <p
        className="
          text-xl
          text-[#354F52]
          max-w-3xl
          mb-16
          leading-relaxed
        "
      >
        Authentication,
        authorization,
        API key management,
        auditing and analytics —
        all in one platform.
      </p>

      <div
        className="
          grid
          md:grid-cols-2
          xl:grid-cols-4
          gap-8
        "
      >

        {[
          {
            title: "OAuth Authentication",
            desc:
              "Secure Google OAuth sign-in and onboarding.",
            icon: ShieldCheck,
          },
          {
            title: "API Key Management",
            desc:
              "Create, revoke and monitor API keys.",
            icon: KeyRound,
          },
          {
            title: "Role Based Access",
            desc:
              "Owner, Admin, Developer and Viewer roles.",
            icon: Users,
          },
          {
            title: "Audit Logging",
            desc:
              "Track every important action performed.",
            icon: ScrollText,
          },
          {
            title: "Analytics",
            desc:
              "Understand project activity and usage.",
            icon: BarChart3,
          },
          {
            title: "Rate Limiting",
            desc:
              "Protect APIs against abuse and misuse.",
            icon: Gauge,
          },
          {
            title: "Secure Sessions",
            desc:
              "JWT authentication and token workflows.",
            icon: Lock,
          },
          {
            title: "Project Management",
            desc:
              "Manage projects, members and permissions.",
            icon: Database,
          },
        ].map((feature) => {

          const Icon = feature.icon;

          return (

            <div
              key={feature.title}
              className="
                group
                h-[280px]
                rounded-3xl
                p-8
                bg-[#CAD2C5]
                border-2
                border-[#84A98C]
                shadow-lg
                transition-all
                duration-500
                hover:-translate-y-3
                hover:bg-gradient-to-br
                hover:from-[#84A98C]
                hover:via-[#52796F]
                hover:to-[#2F3E46]
                hover:text-[#CAD2C5]
              "
            >

              <Icon
                size={40}
                strokeWidth={1.8}
                className="
                  mb-8
                  transition-all
                  duration-500
                  group-hover:scale-110
                "
              />

              <h3
                className="
                  text-2xl
                  font-bold
                  mb-6
                "
              >
                {feature.title}
              </h3>

              <p
                className="
                  opacity-0
                  translate-y-4
                  transition-all
                  duration-500
                  group-hover:translate-y-0
                  group-hover:opacity-100
                "
              >
                {feature.desc}
              </p>

            </div>

          );

        })}

      </div>

    <section
      className="
        relative
        max-w-7xl
        mx-auto
        px-10
        py-32
      "
    >

      <div
        className="
          absolute
          right-0
          top-10
          h-80
          w-80
          rounded-full
          bg-[#52796F]/20
          blur-3xl
        "
      />

      <p
        className="
          uppercase
          tracking-[0.3em]
          text-[#52796F]
          mb-6
        "
      >
        Built With
      </p>

      <h2
        className="
          text-6xl
          font-black
          mb-8
        "
      >
        Powered by
        proven technology.
      </h2>

      <p
        className="
          text-xl
          text-[#354F52]
          max-w-3xl
          mb-16
          leading-relaxed
        "
      >
        GateKeeper combines modern
        backend and frontend technologies
        to provide authentication,
        authorization and observability
        in a single platform.
      </p>

      <div
        className="
          flex
          flex-wrap
          gap-4
        "
      >

        {[
          "Spring Boot",
          "Java",
          "Next.js",
          "PostgreSQL",
          "Redis",
          "OAuth 2.0",
          "JWT",
          "TailwindCSS",
          "Docker",
        ].map((tech) => (

          <div
            key={tech}
            className="
              px-6
              py-4
              rounded-2xl
              bg-[#84A98C]/30
              border
              border-[#84A98C]
              backdrop-blur
              font-medium
            "
          >
            {tech}
          </div>

        ))}

      </div>

    </section>

    </section>

      <section
        className="
          relative
          overflow-hidden
          py-10
          px-10
        "
      >

        <div
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#84A98C]/25
            blur-3xl
          "
        />

        <div
          className="
            relative
            z-10
            max-w-5xl
            mx-auto
            text-center
          "
        >

          <p
            className="
              uppercase
              tracking-[0.3em]
              text-[#52796F]
              mb-6
            "
          >
            Start Building
          </p>

          <h2
            className="
              text-4xl
              md:text-7xl
              font-black
              leading-tight
              mb-8
            "
          >
            Ready to secure your applications?
          </h2>

          <p
            className="
              text-xl
              text-[#354F52]
              max-w-3xl
              mx-auto
              mb-12
              leading-relaxed
            "
          >
            Authentication,
            access control,
            audit logging,
            analytics and API key
            management already handled.
          </p>

          <a
            href="/login"
            className="
              inline-flex
              items-center
              gap-3
              px-8
              py-5
              rounded-2xl
              bg-[#2F3E46]
              text-[#CAD2C5]
              font-semibold
              text-lg
              hover:scale-105
              transition-all
            "
          >
            Get Started →
          </a>

        </div>

      </section>

      <footer
        className="
          border-t,
          border-[#52796F]/30,
          bg-[#2F3E46],
          text-[#CAD2C5],
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            px-10
            py-20
          "
        >

          <div
            className="
              grid
              md:grid-cols-3
              gap-12
            "
          >

            <div>

              <h3
                className="
                  text-3xl
                  font-black
                  mb-4
                "
              >
                GateKeeper
              </h3>

              <p
                className="
                  text-[#84A98C]
                  leading-relaxed
                "
              >
                Authentication,
                authorization,
                API key management,
                audit logging and analytics
                for modern applications.
              </p>

            </div>

            <div>

              <h4
                className="
                  font-semibold
                  mb-4
                "
              >
                Product
              </h4>

              <div
                className="
                  flex
                  flex-col
                  gap-3
                "
              >

                <a
                  href="#features"
                  className="
                    hover:text-[#84A98C]
                    transition
                  "
                >
                  Features
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
                  href="/dashboard"
                  className="
                    hover:text-[#84A98C]
                    transition
                  "
                >
                  Dashboard
                </a>

              </div>

            </div>

            <div>

              <h4
                className="
                  font-semibold
                  mb-4
                "
              >
                Technology
              </h4>

              <div
                className="
                  flex
                  flex-col
                  gap-3
                  text-[#84A98C]
                "
              >

                <span>
                  Spring Boot
                </span>

                <span>
                  Next.js
                </span>

                <span>
                  PostgreSQL
                </span>

                <span>
                  OAuth 2.0
                </span>

                <span>
                  JWT
                </span>

              </div>

            </div>

          </div>

          <div
            className="
              mt-16
              pt-8
              border-t
              border-[#52796F]/30
              flex
              flex-col
              md:flex-row
              justify-between
              items-center
              gap-4
            "
          >

            <p
              className="
                text-sm
                text-[#84A98C]
              "
            >
              Built by Bavya • 2026
            </p>

            <p
              className="
                text-sm
                text-[#84A98C]
              "
            >
              Authentication Infrastructure for Modern Applications
            </p>

          </div>

        </div>

      </footer>
    </main>


  );
}