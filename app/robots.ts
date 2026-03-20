import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_PORTAFOLIO || "https://dangminhkhoi.com"

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl.endsWith("/") ? baseUrl : baseUrl + "/"}sitemap.xml`,
  }
}
