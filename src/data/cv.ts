// Source of truth for the CV. `npm run cv` renders it, with src/data/projects.ts,
// into public/cv-adam-borowski.pdf.

export const PROFILE = {
  name: 'Adam Borowski',
  title: 'Frontend Developer',
  focus: 'React · TypeScript · Next.js',
  location: 'Warsaw, Poland',
  email: 'adborowski@gmail.com',
  phone: '+48 502 760 002',
  github: 'https://github.com/Adborowski',
  linkedin: 'https://www.linkedin.com/in/adam-borowski-38a08994/',
  cvPdf: '/cv-adam-borowski.pdf',
}

export const SUMMARY =
  'Frontend Developer with 4+ years of experience building production web applications with React, TypeScript, and Next.js, including enterprise systems in regulated fintech. Strong in UI architecture, testing, performance optimization, accessibility, and data visualization, working closely with product, design, and backend teams in Agile environments. Currently applying AI-assisted development workflows (Claude Code) to deliver full-stack projects faster.'

export const SKILL_GROUPS: [string, string[]][] = [
  ['Languages & Frameworks', ['JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'React Native', 'Node.js', 'HTML5', 'CSS/Sass', 'Tailwind CSS']],
  ['UI Engineering', ['Accessibility (WCAG)', 'Responsive design', 'Design systems', 'Data visualization', 'Headless CMS']],
  ['State & Data', ['Redux', 'Context API', 'State machines', 'REST APIs', 'tRPC', 'API contracts']],
  ['Testing & Performance', ['Jest', 'React Testing Library', 'Unit & integration testing', 'Code splitting', 'Lazy loading']],
  ['Tooling & Delivery', ['Git', 'GitHub', 'CI/CD', 'Vite', 'Webpack', 'npm', 'Docker (basic)', 'Vercel', 'Netlify', 'Serverless functions']],
  ['Ways of Working', ['Agile/Scrum', 'Code reviews', 'Figma handoff', 'AI-assisted development (Claude Code)']],
]

export interface Role {
  company: string
  role: string
  period: string
  sector: string
  bullets: string[]
}

export const EXPERIENCE: Role[] = [
  {
    company: 'IPF Digital',
    role: 'Frontend Developer',
    period: 'Feb 2025 – Jan 2026',
    sector: 'Fintech',
    bullets: [
      'Refactored legacy code in a loan processing system handling 10,000+ transactions per day, improving maintainability and reducing technical debt.',
      'Implemented a modern state management architecture and defined frontend–backend API contracts.',
      'Delivered a new short-term loan module for critical user workflows, tested with Jest and React Testing Library.',
    ],
  },
  {
    company: 'Codesealer',
    role: 'Frontend Developer',
    period: 'Dec 2023 – Oct 2024',
    sector: 'Cybersecurity',
    bullets: [
      'Built content-driven interfaces for a cybersecurity platform with animations, data visualizations, and Headless CMS.',
      'Worked closely with product, design, and backend teams to implement complex UI patterns.',
      'Reduced initial load size with code splitting and lazy loading across the shared component library.',
    ],
  },
  {
    company: 'Finalto',
    role: 'Frontend Developer',
    period: 'Feb 2023 – Nov 2023',
    sector: 'Financial services',
    bullets: [
      'Developed interactive financial dashboards and real-time data visualization components in React.',
      'Designed and implemented structured onboarding flows using a state machine architecture.',
      'Built motion-driven UIs, balancing performance and visual quality.',
    ],
  },
  {
    company: 'Cybercrypt',
    role: 'Frontend Developer',
    period: 'Nov 2020 – Mar 2022',
    sector: 'Cybersecurity',
    bullets: [
      'Built interactive security analytics dashboards with custom React components.',
      'Developed marketing and product landing pages with Next.js, optimized for conversion.',
      'Established design system patterns and motion-driven components for a reusable component library.',
    ],
  },
]

export const INDEPENDENT_ROLE: Role = {
  company: 'Personal Projects',
  role: 'Independent Frontend Developer',
  period: 'Feb 2026 – Present',
  sector: 'Independent',
  bullets: [
    'Designed, built and shipped every project end to end, from data pipelines and scraping to UI and deployment, using AI-assisted development workflows (Claude Code).',
  ],
}

export const EDUCATION = [
  { institution: 'Copenhagen Business School', degree: 'MSc Business Administration and E-Business', period: '2020 – 2022' },
  { institution: 'Copenhagen School of Design and Technology (KEA)', degree: 'BA Web Development', period: '2016 – 2020' },
  { institution: 'University of Reading, UK', degree: 'LLB English Law', period: '2013 – 2016' },
]

export const CERTIFICATIONS = [
  'HackerRank React Developer Certificate',
  'Cambridge Certificate of Proficiency in English (CPE), C2',
]

export const LANGUAGES: [string, string][] = [
  ['Polish', 'Native'],
  ['English', 'C2, including legal English'],
]
