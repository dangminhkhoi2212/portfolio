"use client"

import { personalInfo } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Download, Github, Loader, Menu } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
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
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }, [isOpen])

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
    setIsOpen(false)
  }
  const { mutate: handleDownload, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axios.get(personalInfo.resumePath, {
        responseType: "blob",
      })
      const blob = new Blob([response.data], { type: "application/pdf" })
      const url = window.URL.createObjectURL(blob)
      window.open(url, "_blank")
    },
  })
  return (
    <header
      className={cn(
        "sticky top-0 w-full border-y border-border transition-all duration-300",
        scrolled ? "z-10 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-14 max-w-4xl cursor-pointer items-center justify-between px-6">
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

        {/* Nav Links - Desktop */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="group relative flex-1 rounded-md px-3 py-1.5 font-mono text-xs font-medium text-muted-foreground transition-all duration-300 hover:bg-accent hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            onClick={() => handleDownload()}
            variant={"ghost"}
            disabled={isPending}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {isPending ? (
              <Loader className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">Resume</span>
          </Button>
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

          {/* Mobile Menu via Sheet (Bottom) */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              className={"md:hidden"}
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex"
                  aria-label="Toggle menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              }
            ></SheetTrigger>
            <SheetContent
              side="bottom"
              className="flex h-[80vh] flex-col gap-0 rounded-2xl rounded-b-none! bg-background px-6 py-4"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>
              <div className="mx-auto mb-8 h-1.5 w-12 rounded-full bg-muted-foreground/20" />
              <nav className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="group relative text-lg font-bold tracking-tight text-foreground transition-all hover:text-primary"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-12 flex flex-col gap-4"
                >
                  <Link
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-border bg-accent px-10 py-4 font-mono text-sm font-semibold transition-all hover:bg-foreground hover:text-background"
                  >
                    <Github className="h-4 w-4" />
                    View Code on GitHub
                  </Link>
                </motion.div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
