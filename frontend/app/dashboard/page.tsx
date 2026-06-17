"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { DashboardResponse }
  from "@/types/dashboard";

import {
  FolderKanban,
  KeyRound,
  ScrollText,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {

  const [data, setData] =
    useState<DashboardResponse>();

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    fetch(
      "http://localhost:8081/api/dashboard",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then(setData);

  }, []);

  if (!data) {

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
          Dashboard
        </p>

        <h1
          className="
            text-6xl
            font-black
            mb-4
          "
        >
          Welcome back.
        </h1>

        <p
          className="
            text-xl
            text-[#354F52]
          "
        >
          Here's what's happening
          across your projects.
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

        <Card
          className="
            bg-[#84A98C]/30
            border-[#84A98C]
            rounded-3xl
          "
        >

          <CardContent className="p-8">

            <FolderKanban
              size={36}
              className="mb-6"
            />

            <div
              className="
                text-5xl
                font-black
              "
            >
              {data.projects}
            </div>

            <div
              className="
                mt-2
                text-lg
              "
            >
              Projects
            </div>

          </CardContent>

        </Card>

        <Card
          className="
            bg-[#84A98C]/30
            border-[#84A98C]
            rounded-3xl
          "
        >

          <CardContent className="p-8">

            <KeyRound
              size={36}
              className="mb-6"
            />

            <div
              className="
                text-5xl
                font-black
              "
            >
              {data.apiKeys}
            </div>

            <div
              className="
                mt-2
                text-lg
              "
            >
              API Keys
            </div>

          </CardContent>

        </Card>

        <Card
          className="
            bg-[#84A98C]/30
            border-[#84A98C]
            rounded-3xl
          "
        >

          <CardContent className="p-8">

            <ScrollText
              size={36}
              className="mb-6"
            />

            <div
              className="
                text-5xl
                font-black
              "
            >
              {data.auditLogs}
            </div>

            <div
              className="
                mt-2
                text-lg
              "
            >
              Audit Events
            </div>

          </CardContent>

        </Card>

      </div>

      <div
        className="
          grid
          lg:grid-cols-3
          gap-8
        "
      >

        <Card
          className="
            lg:col-span-2
            rounded-3xl
            border-[#84A98C]
          "
        >

          <CardHeader>

            <CardTitle
              className="
                text-2xl
              "
            >
              Recent Activity
            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="space-y-4">

              {data.recentActivity.map(
                (
                  activity,
                  index
                ) => (

                  <div
                    key={index}
                    className="
                      p-4
                      rounded-2xl
                      bg-[#84A98C]/20
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
                        mt-1
                      "
                    >
                      {activity.details}
                    </div>

                    <div
                      className="
                        text-xs
                        text-[#52796F]
                        mt-2
                      "
                    >
                      {
                        new Date(
                          activity.timestamp
                        )
                        .toLocaleString()
                      }
                    </div>

                  </div>

                )
              )}

            </div>

          </CardContent>

        </Card>

        <Card
          className="
            rounded-3xl
            border-[#84A98C]
          "
        >

          <CardHeader>

            <CardTitle>
              Quick Actions
            </CardTitle>

          </CardHeader>

          <CardContent>

            <div
              className="
                flex
                flex-col
                gap-4
              "
            >

              <a
                href="/projects"
                className="
                  flex
                  justify-between
                  items-center
                  p-4
                  rounded-2xl
                  bg-[#84A98C]/20
                  hover:bg-[#84A98C]/40
                  transition
                "
              >
                View Projects

                <ArrowRight
                  size={18}
                />
              </a>

              <a
                href="/api-keys"
                className="
                  flex
                  justify-between
                  items-center
                  p-4
                  rounded-2xl
                  bg-[#84A98C]/20
                  hover:bg-[#84A98C]/40
                  transition
                "
              >
                API Keys

                <ArrowRight
                  size={18}
                />
              </a>

              <a
                href="/audit-logs"
                className="
                  flex
                  justify-between
                  items-center
                  p-4
                  rounded-2xl
                  bg-[#84A98C]/20
                  hover:bg-[#84A98C]/40
                  transition
                "
              >
                Audit Logs

                <ArrowRight
                  size={18}
                />
              </a>

            </div>

          </CardContent>

        </Card>

      </div>

    </div>


  </>

  );
}