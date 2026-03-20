import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { GridBackground } from "@/components/ui/grid-background"
import { Meteors } from "@/components/ui/meteors"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SpotlightBackground } from "@/components/ui/spotlight-background"
import { personalInfo } from "@/lib/data"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Geist_Mono, Outfit } from "next/font/google"
import "./globals.css"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: `${personalInfo.name} — Frontend Developer`,
  description: `Portfolio of ${personalInfo.name}, a Frontend Developer specializing in architecting complex web systems and deep user experience optimization.`,
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Dang Minh Khoi",
  ],
  authors: [{ name: personalInfo.name }],
  openGraph: {
    title: `${personalInfo.name} — Frontend Developer`,
    description: `Portfolio of ${personalInfo.name}`,
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
      <body>
        <ThemeProvider>
          <SpotlightBackground />
          <ScrollArea className="h-screen">
            <div className="relative min-h-screen bg-background">
              <div className="h-full w-full">
                <Meteors number={30} />
              </div>
              <GridBackground />
              <div className="relative z-10 flex flex-col items-center justify-center">
                <Navbar />
                {children}
                <Footer />
              </div>
            </div>
          </ScrollArea>
        </ThemeProvider>
      </body>
    </html>
  )
}
