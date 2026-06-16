import * as React from "react";

import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {

  return (

    <div
      className={cn(
        `
        rounded-2xl
        border
        border-[#84A98C]
        bg-white
        shadow-sm
        `,
        className
      )}
      {...props}
    />

  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {

  return (

    <div
      className={cn(
        "p-6",
        className
      )}
      {...props}
    />

  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {

  return (

    <h3
      className={cn(
        `
        text-[#2F3E46]
        font-semibold
        text-lg
        `,
        className
      )}
      {...props}
    />

  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {

  return (

    <div
      className={cn(
        "px-6 pb-6",
        className
      )}
      {...props}
    />

  );
}