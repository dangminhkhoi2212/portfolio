import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { GridBackground } from "@/components/ui/grid-background"
import { Meteors } from "@/components/ui/meteors"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SpotlightBackground } from "@/components/ui/spotlight-background"
import { personalInfo, summary } from "@/lib/data"
import { cn } from "@/lib/utils"
import type { Metadata, Viewport } from "next"
import { Geist_Mono, Outfit } from "next/font/google"
import "./globals.css"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const baseUrl = process.env.NEXT_PUBLIC_PORTAFOLIO || "https://dangminhkhoi.com"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${personalInfo.name} — ${personalInfo.title}`,
    template: `%s | ${personalInfo.name}`,
  },
  description: summary,
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Web Developer",
    "Software Engineer",
    "Dang Minh Khoi",
    "Can Tho",
    "Vietnam",
  ],
  authors: [{ name: personalInfo.name, url: personalInfo.github }],
  creator: personalInfo.name,
  publisher: personalInfo.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${personalInfo.name} — ${personalInfo.title}`,
    description: summary,
    url: baseUrl,
    siteName: `${personalInfo.name} Portafolio`,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/avatar.jpg",
        width: 800,
        height: 800,
        alt: personalInfo.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} — ${personalInfo.title}`,
    description: summary,
    images: ["/avatar.jpg"],
    creator: "@dangminhkhoi", // Placeholder if not found
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-placeholder", // User should replace this
  },
  category: "technology",
  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    url: baseUrl,
    sameAs: [personalInfo.github, personalInfo.linkedin],
    description: summary,
    image: `${baseUrl}/avatar.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Can Tho",
      addressCountry: "VN",
    },
    email: personalInfo.email,
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        outfit.variable,
        "font-sans"
      )}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <SpotlightBackground />
          <Navbar />
          <ScrollArea className="h-screen w-full">
            <Meteors number={30} />
            <GridBackground />
            <div className="relative z-10 flex flex-col items-center justify-center">
              {children}
              <Footer />
            </div>
          </ScrollArea>
        </ThemeProvider>
      </body>
    </html>
  )
}
