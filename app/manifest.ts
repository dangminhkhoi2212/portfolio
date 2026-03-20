import { personalInfo, summary } from "@/lib/data"
import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${personalInfo.name} Portafolio`,
    short_name: personalInfo.initials,
    description: summary,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/avatar.jpg",
        sizes: "800x800",
        type: "image/jpeg",
      },
    ],
  }
}
