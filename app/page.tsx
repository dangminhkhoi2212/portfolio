import { AboutSection } from "@/components/about-section"
import EducationSection from "@/components/education-section"
import { ExperienceSection } from "@/components/experience-section"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import DividerPattern from "@/components/ui/divider-pattern"

export default function Page() {
  return (
    <main className="flex w-full flex-col items-center overflow-x-hidden">
      <HeroSection />
      <DividerPattern />

      <AboutSection />
      <DividerPattern />

      <ProjectsSection />
      <DividerPattern />

      <ExperienceSection />
      <DividerPattern />

      <EducationSection />
    </main>
  )
}
