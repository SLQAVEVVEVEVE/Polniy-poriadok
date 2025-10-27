"use client"

import * as React from "react"
import { useToast } from "./use-toast"
import { cn } from "@/lib/utils"

const Toaster = () => {
  const { toasts } = useToast()

  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map(({ id, title, description, action, variant }) => (
        <div
          key={id}
          className={cn(
            "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
            variant === "destructive"
              ? "border-red-500 bg-red-50 text-red-900"
              : "border bg-background text-foreground"
          )}
        >
          <div className="grid gap-1">
            {title && <div className="font-semibold">{title}</div>}
            {description && (
              <div className="text-sm opacity-90">{description}</div>
            )}
          </div>
          {action}
        </div>
      ))}
    </div>
  )
}

export { Toaster }
