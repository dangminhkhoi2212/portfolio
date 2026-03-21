import { cn } from "@/lib/utils"
import React from "react"

type Props = React.ComponentProps<"div">
const Section: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "w-full border-x border-border px-4 py-12 md:max-w-3xl md:px-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Section
