"use client"
import { FadeReveal } from "@/components/ui/fade-reveal"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"
import { certifications } from "@/lib/data"
import { Award, CheckCircle2 } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Section from "./ui/section"
const abouts = [
  "Skilled in Next.js, React, TypeScript, and modern front-end technologies; building high-quality, user-centric web and mobile applications.",
  "Passionate about exploring new technologies and turning ideas into reality through polished, thoughtfully crafted personal projects.",
  "Strong eye for pixel-perfect UI and seamless UX detail.",
]
const mainTechs = ["react", "nextjs", "ts", "tailwind", "vite", "shadcn"]
const otherTechs = [
  "redux",
  "zustand",
  "nestjs",
  "supabase",
  "postgres",
  "github",
  "docker",
  "flutter",
  "vercel",
  "antdesign",
  "firebase",
]
export function AboutSection() {
  const [radius, setRadius] = useState({ inner: 80, outer: 140 })
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setRadius({ inner: 60, outer: 110 })
      } else {
        setRadius({ inner: 80, outer: 160 })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const iconTheme = mounted && resolvedTheme === "dark" ? "dark" : "light"

  return (
    <Section id="about">
      <FadeReveal>
        <SectionHeading label="About" />
      </FadeReveal>

      <FadeReveal delay={0.1}>
        <div className="mt-6 space-y-4 leading-relaxed">
          <p>
            Frontend Developer with 1+ years of experience, specializing in
            architecting complex web systems and deep user experience
            optimization.
          </p>
          <ul className="space-y-2">
            {abouts.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </FadeReveal>

      {/* Skills */}
      <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden md:h-[500px]">
        {/* Inner Circle (Core Frontend) */}
        <OrbitingCircles
          className="size-10 border-none bg-transparent md:size-12"
          duration={20}
          radius={radius.inner}
          iconSize={40}
        >
          {mainTechs.map((tech, i) => (
            <div className="size-10" key={`${tech}-${iconTheme}`}>
              <img
                key={i}
                src={`https://go-skill-icons.vercel.app/api/icons?i=${tech}&theme=${iconTheme}`}
                alt={tech}
              />
            </div>
          ))}
        </OrbitingCircles>

        {/* Middle Circle (Systems & Tools) */}
        <OrbitingCircles
          className="size-10 border-none bg-transparent md:size-12"
          duration={25}
          radius={radius.outer}
          reverse
          iconSize={40}
        >
          {otherTechs.map((tech, i) => (
            <div className="size-10" key={`${tech}-${iconTheme}`}>
              <img
                src={`https://go-skill-icons.vercel.app/api/icons?i=${tech}&theme=${iconTheme}`}
                alt={tech}
                className="h-full w-full"
              />
            </div>
          ))}
        </OrbitingCircles>
      </div>

      {/* Certifications */}
      <div className="mt-10">
        <FadeReveal>
          <SectionHeading label="Certifications" />
        </FadeReveal>
        <div className="mt-6 space-y-3">
          {certifications.map((cert, idx) => (
            <FadeReveal key={cert.name} delay={0.1 * idx}>
              <div className="group flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:bg-accent/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted transition-colors group-hover:bg-accent">
                    <Award className="h-4 w-4 text-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {cert.name}
                  </span>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {cert.period}
                </span>
              </div>
            </FadeReveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

export function SectionHeading({ label }: { label: string }) {
  return (
    <h2 className="text-xl font-bold tracking-tight text-foreground">
      {label}
    </h2>
  )
}
