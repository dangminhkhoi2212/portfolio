export const personalInfo = {
  name: "Dang Minh Khoi",
  title: "Frontend Developer",
  tagline: "Code is the foundation, details are the soul.",
  email: "dmkhoi2212@gmail.com",
  phone: "(+84) 378083459",
  github: "https://github.com/dangminhkhoi2212",
  linkedin:
    "https://www.linkedin.com/in/%C4%91%E1%BA%B7ng-minh-kh%C3%B4i-b41391342/",
  location: "Can Tho, Vietnam",
  pronouns: "he/him",
  website: process.env.NEXT_PUBLIC_PORTAFOLIO,
  avatar: "/avatar.jpg",
  initials: "MK",
}

export const summary =
  "Frontend Developer with over 1 year of professional experience, specializing in architecting complex web systems and deep user experience optimization."

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/dangminhkhoi2212",
    icon: "github",
  },
  {
    name: "Email",
    url: "mailto:dmkhoi2212@gmail.com",
    icon: "mail",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/dangminhkhoi2212",
    icon: "linkedin",
  },
]

export const education = [
  {
    school: "Can Tho University",
    degree: "Computer Science",
    period: "2020 – 2025",
    location: "Can Tho, Vietnam",
    gpa: "3.56 / 4.0",
  },
]

export const experience = [
  {
    company: "TekNix Corporation",
    role: "Frontend Developer",
    type: "Full-time",
    period: "Mar. 2025 – Mar. 2026",
    location: "Can Tho, Vietnam",
    projects: [
      {
        name: "Healthcare Platform",
        highlights: [
          "Led frontend architecture for a cross-platform system using **React**, **Vite**, and **TypeScript** to build a high-performance patient WebView and staff management dashboard.",
          "Built a real-time appointment synchronization system leveraging **React Query** for efficient data fetching and **Zustand** for global state management across departments.",
          "Implemented RBAC-based UI governance, utilizing **shadcn/ui** and **Tailwind CSS** to dynamically tailor views and permissions for multiple user roles.",
          "Optimized WebView interactions and form handling using **React Hook Form**, delivering native-like performance and seamless UX for medical booking workflows.",
        ],
      },
      {
        name: "Low-code Web Builder",
        highlights: [
          "Engineered a high-fidelity **Canvas rendering engine** with **Konva.js** and **Vite** to handle complex object manipulation, leveraging **Ant Design** to build the core library of draggable components.",
          "Architected a visual action builder using **React Flow** and **Redux**, enabling centralized state management for complex logic-driven application flows without writing code.",
          "Developed a JSON-to-Static compilation pipeline with **Next.js** and **TypeScript**, generating production-ready source code for improved SEO and performance.",
          "Integrated **Web Container** technology to provide an instant, browser-based environment for building, running, and previewing generated code in real-time.",
        ],
      },
    ],
  },
]

export const projects = [
  {
    name: "KDrago — Database Visualization Tool",
    period: "Feb. 2026 – Present",
    url: null,
    demoUrl: "https://k-drago.vercel.app/",
    tags: [
      "Next.js",
      "Shadcn/ui",
      "Tailwind CSS",
      "React Flow",
      "NestJS",
      "Supabase",
      "Vercel AI SDK",
    ],
    highlights: [
      "Architected a dynamic database schema visualizer using **Next.js** and **React Flow**, enabling users to manipulate complex ERD-style table relationships through an interactive, reactive canvas interface.",
      "Integrated **Vercel AI SDK** to build an intelligent SQL co-pilot, supporting natural language-to-query generation and instant table schema drafting with real-time streaming.",
      "Developed a seamless state synchronization layer between the **React Flow** canvas and an AI-driven chat interface, ensuring that visual modifications and AI-generated schema changes are reflected instantly in the UI.",
      "Built a robust backend infrastructure with **NestJS**, **TypeORM**, and **Supabase** to execute AI-suggested migrations and maintain high-performance data representation for large-scale database structures.",
    ],
  },
]

export const skills = {
  Frontend: [
    "React",
    "Next.js",
    "Vite",
    "TypeScript",
    "Tailwind CSS",
    "Shadcn/ui",
    "Ant Design",
    "React Query",
    "React Hook Form",
    "Redux",
    "Zustand",
  ],
  Backend: ["NestJS", "Express", "Supabase", "PostgreSQL", "RESTful API"],
  Tools: ["Vercel AI SDK", "GitHub", "Docker", "Flutter", "Socket.IO"],
}

export const certifications = [
  {
    name: "TOEIC Certificate",
    period: "Mar. 2023 – Mar. 2025",
  },
]
