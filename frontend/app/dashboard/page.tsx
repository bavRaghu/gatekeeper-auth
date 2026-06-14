"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { DashboardResponse }
  from "@/types/dashboard";

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
    <div className="min-h-screen bg-background p-8">

      <h1 className="text-4xl font-bold mb-8">
        GateKeeper
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Card>
          <CardHeader>
            <CardTitle>
              Projects
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold">
              {data.projects}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              API Keys
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold">
              {data.apiKeys}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Audit Logs
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold">
              {data.auditLogs}
            </div>
          </CardContent>
        </Card>

      </div>

      <Card className="mt-8">

        <CardHeader>
          <CardTitle>
            Recent Activity
          </CardTitle>
        </CardHeader>

        <CardContent>

          <div className="space-y-4">

            {data.recentActivity.map(
              (activity, index) => (

                <div
                  key={index}
                  className="border-b pb-3"
                >
                  <div className="font-medium">
                    {activity.action}
                  </div>

                  <div className="text-sm text-gray-500">
                    {activity.details}
                  </div>
                </div>
              )
            )}

          </div>

        </CardContent>

      </Card>

    </div>
  );
}