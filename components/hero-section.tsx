"use client"
import { Badge } from "@/components/ui/badge"
import { personalInfo } from "@/lib/data"
import {
  Copy,
  Github,
  Link2,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { SplitText } from "@/components/ui/split-text"
import { Button } from "./ui/button"
import { Ripple } from "./ui/ripple"
import Section from "./ui/section"

const metaItems = [
  {
    icon: MapPin,
    label: personalInfo.location,
    value: personalInfo.location,
    href: `https://maps.google.com/?q=${personalInfo.location}`,
  },
  {
    icon: Phone,
    label: personalInfo.phone,
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
  },
  {
    icon: Mail,
    label: personalInfo.email,
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: Link2,
    label: "Portafolio",
    value: personalInfo.website!,
    href: personalInfo.website!,
  },
  {
    icon: Github,
    label: "GitHub",
    value: personalInfo.github!,
    href: personalInfo.github!,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: personalInfo.linkedin!,
    href: personalInfo.linkedin!,
  },
]

export function HeroSection() {
  const handleCopy = (value: string) => {
    if (!navigator.clipboard) return
    navigator.clipboard.writeText(value)
  }
  return (
    <Section id="home">
      {/* Profile Row */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {/* Avatar */}
        <div className="relative flex items-center justify-center overflow-visible">
          <Ripple
            mainCircleSize={128}
            mainCircleOpacity={0.12}
            numCircles={7}
          />
          <div className="relative size-32 overflow-hidden rounded-full ring-2 ring-border ring-offset-2 ring-offset-background">
            <Image
              src={personalInfo.avatar}
              alt={personalInfo.name}
              width={128}
              height={128}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Name & Title */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center-safe gap-2">
            <SplitText
              text={personalInfo.name}
              className="text-2xl font-bold tracking-tight text-foreground"
              stagger={0.03}
              delay={0.1}
            />
            <Badge variant="secondary" className="font-mono text-xs">
              {personalInfo.pronouns}
            </Badge>
          </div>
          <div className="mt-2">
            <SplitText
              text={personalInfo.title}
              className="text-sm font-bold tracking-tight text-foreground"
              stagger={0.03}
              delay={0.1}
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {personalInfo.tagline}
          </p>
        </div>
      </div>
      {/* Meta Pills */}
      <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2">
        {metaItems.map(({ icon: Icon, label, value, href }) => (
          <div className="group flex items-center justify-between" key={value}>
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center gap-1.5 text-sm text-foreground transition-all duration-300 hover:underline"
            >
              <div className="rounded-md bg-border p-2">
                <Icon className="h-3.5 w-3.5 shrink-0" />
              </div>
              {label}
            </Link>
            <Button
              size="icon"
              variant="ghost"
              className={"invisible cursor-pointer group-hover:visible"}
              onClick={() => handleCopy(value)}
            >
              <Copy />
            </Button>
          </div>
        ))}
      </div>
    </Section>
  )
}
