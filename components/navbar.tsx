"use client"

import { personalInfo } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Github } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
]

/**
 * Returns the Base-UI ScrollArea *Viewport* element — the actual scrollable div.
 * The Root element (#scroll-main) is just a wrapper; scroll events fire on the
 * Viewport child identified by data-slot="scroll-area-viewport".
 */
function getScrollViewport(): HTMLElement | null {
  const root = document.querySelector(
    "[data-slot='scroll-area-viewport']"
  ) as HTMLElement | null

  return root
}

const NAVBAR_HEIGHT = 56 // h-14 = 3.5rem = 56px

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)

    const viewport = getScrollViewport()
    console.log("🚀 ~ Navbar ~ viewport found:", !!viewport)

    if (!viewport) return

    const handleScroll = () => {
      const scrollTop = viewport.scrollTop
      setScrolled(scrollTop > 10)
    }

    viewport.addEventListener("scroll", handleScroll)
    return () => viewport.removeEventListener("scroll", handleScroll)
  }, [])

  /** Smoothly scroll to a #hash section with navbar offset, works inside ScrollArea viewport. */
  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (!href.startsWith("#")) return
    e.preventDefault()
    const id = href.slice(1)
    const target = document.getElementById(id)
    if (!target) return

    const viewport = getScrollViewport()
    if (viewport) {
      const viewportRect = viewport.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      const offset =
        targetRect.top - viewportRect.top + viewport.scrollTop - NAVBAR_HEIGHT
      viewport.scrollTo({ top: offset, behavior: "smooth" })
    } else {
      const top =
        target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT
      window.scrollTo({ top, behavior: "smooth" })
    }
    setScrolled(true)
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-y border-border transition-all duration-300",
        scrolled ? "backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
        {/* Logo */}
        <AnimatePresence mode="wait">
          {scrolled ? (
            <motion.div
              key="avatar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => handleNavClick(e as any, "#home")}
            >
              <Image
                src={personalInfo.avatar}
                alt={personalInfo.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
                priority
              />
            </motion.div>
          ) : (
            <motion.div
              key="logo"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.1 }}
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg"
            >
              <a
                href="#home"
                className="flex items-center justify-center transition-opacity hover:opacity-70"
              >
                <Image
                  src="/favicon-32x32.png"
                  alt="MK Logo"
                  width={32}
                  height={32}
                  className="rounded-sm"
                />
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="rounded-md px-3 py-1.5 font-mono text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <Link
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Github className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </Link>

          {mounted && <AnimatedThemeToggler />}
        </div>
      </div>
    </header>
  )
}
