"use client";

import { useEffect } from "react";

import {
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function LoginPage() {


  return (

    <main
      className="
        min-h-screen
        bg-[#CAD2C5]
        text-[#2F3E46]
        flex
        items-center
        justify-center
        px-8
      "
    >

      <div
        className="
          w-full
          max-w-xl
          rounded-[2rem]
          border
          border-[#84A98C]
          bg-[#84A98C]/20
          backdrop-blur
          p-12
        "
      >

        <div
          className="
            flex
            justify-center
            mb-8
          "
        >

          <div
            className="
              h-20
              w-20
              rounded-full
              bg-[#2F3E46]
              flex
              items-center
              justify-center
            "
          >

            <ShieldCheck
              size={40}
              color="#CAD2C5"
            />

          </div>

        </div>

        <p
          className="
            uppercase
            tracking-[0.3em]
            text-[#52796F]
            text-center
            mb-4
          "
        >
          GateKeeper
        </p>

        <h1
          className="
            text-5xl
            font-black
            text-center
            mb-6
          "
        >
          Welcome Back
        </h1>

        <p
          className="
            text-center
            text-[#354F52]
            mb-10
            leading-relaxed
          "
        >
          Continue with Google
          to access your projects,
          API keys, audit logs
          and team settings.
        </p>

        <a
          href="
            http://localhost:8081/oauth2/authorization/google
          "
          className="
            w-full
            flex
            justify-center
            items-center
            gap-3
            rounded-2xl
            bg-[#2F3E46]
            text-[#CAD2C5]
            px-6
            py-4
            font-semibold
            hover:scale-[1.02]
            transition
          "
        >

          Continue with Google

          <ArrowRight
            size={18}
          />

        </a>

        <div
          className="
            mt-10
            text-center
            text-sm
            text-[#52796F]
          "
        >
          Secure authentication
          powered by OAuth 2.0
        </div>

      </div>

    </main>

  );
}