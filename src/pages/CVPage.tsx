import { motion } from 'framer-motion'
import Nav from '../components/Nav'
import { useIsMobile } from '../hooks/useIsMobile'

const EXPERIENCE = [
  {
    company: 'IPF Digital',
    role: 'Frontend Developer',
    period: 'Feb 2025 – Jan 2026',
    description: 'Refactored legacy code, improved state management, defined API contracts, and delivered a short-term loan module handling 10k+ applications.',
  },
  {
    company: 'Codesealer',
    role: 'Frontend Developer',
    period: 'Dec 2023 – Oct 2024',
    description: 'Built content-driven frontends for a cybersecurity platform, combining animations, data visuals, and CMS integrations in close collaboration with stakeholders.',
  },
  {
    company: 'Finalto',
    role: 'Frontend Developer',
    period: 'Feb 2023 – Nov 2023',
    description: 'Developed interactive dashboards, onboarding flows, and motion-driven UIs using modern web technologies.',
  },
  {
    company: 'Cybercrypt',
    role: 'Frontend Developer',
    period: 'Nov 2020 – Mar 2022',
    description: 'Built interactive data-visualization dashboards, onboarding and marketing frontends, and motion-driven UI using modern web technologies.',
  },
]

const EDUCATION = [
  {
    institution: 'Copenhagen Business School',
    degree: 'MSc Business Administration & E-Business',
    period: '2020 – 2022',
    detail: 'Digital solution design, IT strategy, EU digital regulation, business context',
  },
  {
    institution: 'Copenhagen School of Design and Technology (KEA)',
    degree: 'BA Web Development',
    period: '2016 – 2020',
    detail: 'JS, browser architecture, and full-stack fundamentals',
  },
  {
    institution: 'University of Reading, UK',
    degree: 'LLB English Law',
    period: '2013 – 2016',
    detail: 'EU law, data protection, and regulatory frameworks (GDPR)',
  },
]

const PROJECTS = [
  {
    name: 'AutoServ ERP',
    stack: 'React 19, TypeScript, Tailwind v4, shadcn/ui',
    href: 'https://erp-auto.vercel.app/',
  },
  {
    name: 'Sejmograf.pl',
    stack: 'Next.js, Firebase, Recharts, Vercel',
    href: 'https://sejmograf.pl',
  },
  {
    name: 'Warszapka',
    stack: 'React Native, Expo, TypeScript, Zustand',
    href: null,
  },
]

const SKILLS = [
  'JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'Node.js',
  'React Native', 'HTML5', 'CSS / SASS', 'Tailwind', 'REST APIs',
  'Git', 'CI/CD', 'Agile', 'Figma', 'AI Workflows (Claude Code)',
]

const CERTIFICATES = [
  'Certificate of Proficiency in English (CPE — C2)',
  'HackerRank React Developer Certificate',
  'Proficiency in Adobe design tools',
  'Legal English & legislation analysis',
  'Public speaking & presentations',
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
})

function SectionLabel({ children }: { children: string }) {
  return (
    <p style={{
      color: 'var(--accent)',
      fontWeight: 500,
      fontSize: 12,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      marginBottom: 24,
    }}>
      {children}
    </p>
  )
}

function Divider() {
  return <div style={{ borderTop: '1px solid var(--border)', margin: '60px 0' }} />
}

export default function CVPage() {
  const isMobile = useIsMobile()

  return (
    <>
      <Nav />
      <main>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px 96px' }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48, flexWrap: 'wrap', gap: 24 }}>
            <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
              <img
                src="/profile-picture.jpg"
                alt="Adam Borowski"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--border)',
                  flexShrink: 0,
                }}
              />
              <div>
                <h1 style={{ fontSize: 36, letterSpacing: '-0.03em', marginBottom: 6 }}>Adam Borowski</h1>
                <p style={{ fontSize: 17, color: 'var(--accent)', fontWeight: 500, marginBottom: 10 }}>Frontend Developer</p>
                <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8 }}>
                  Warsaw, Poland
                  <span style={{ margin: '0 10px', opacity: 0.4 }}>·</span>
                  <a href="mailto:adborowski@gmail.com" style={{ color: 'var(--text)' }}>adborowski@gmail.com</a>
                  <span style={{ margin: '0 10px', opacity: 0.4 }}>·</span>
                  +48 502 760 002
                </p>
              </div>
            </div>
            <a
              href="/cv-adam-borowski.pdf"
              download
              style={{
                fontSize: 13,
                fontWeight: 500,
                padding: '9px 18px',
                borderRadius: 8,
                border: '1px solid var(--border)',
                color: 'var(--text-h)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              ↓ Download PDF
            </a>
          </div>

          {/* Bio */}
          <motion.div {...fadeUp(0)}>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text)', maxWidth: 680, marginBottom: 28 }}>
              Frontend engineer specialising in building production web apps with React, TypeScript, and Next.js.
              Experienced across domains in both greenfield and enterprise. Freshly upskilled into AI workflows,
              including Claude Code. Passionate about pixel-perfect UI development and systems thinking, with a
              growing focus on React Native and native apps.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {SKILLS.map(skill => (
                <span key={skill} style={{
                  fontSize: 12,
                  padding: '3px 10px',
                  borderRadius: 6,
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          <Divider />

          {/* Experience */}
          <motion.section {...fadeUp(0)}>
            <SectionLabel>Experience</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
              {EXPERIENCE.map((job, i) => (
                <motion.div key={job.company} {...fadeUp(i * 0.06)} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '160px 1fr', gap: isMobile ? '0' : '0 32px' }}>
                  <p style={{ fontSize: 13, color: 'var(--text)', paddingTop: 3, lineHeight: 1.5 }}>{job.period}</p>
                  <div>
                    <p style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-h)', marginBottom: 2 }}>{job.company}</p>
                    <p style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500, marginBottom: 10 }}>{job.role}</p>
                    <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--text)' }}>{job.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <Divider />

          {/* Education */}
          <motion.section {...fadeUp(0)}>
            <SectionLabel>Education</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {EDUCATION.map((edu, i) => (
                <motion.div key={edu.institution} {...fadeUp(i * 0.06)} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '160px 1fr', gap: isMobile ? '0' : '0 32px' }}>
                  <p style={{ fontSize: 13, color: 'var(--text)', paddingTop: 3 }}>{edu.period}</p>
                  <div>
                    <p style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-h)', marginBottom: 2 }}>{edu.institution}</p>
                    <p style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500, marginBottom: 8 }}>{edu.degree}</p>
                    <p style={{ fontSize: 14, color: 'var(--text)' }}>{edu.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <Divider />

          {/* Projects */}
          <motion.section {...fadeUp(0)}>
            <SectionLabel>Recent Projects</SectionLabel>
            <p style={{ fontSize: 14, color: 'var(--text)', marginBottom: 24, lineHeight: 1.7 }}>
              Dedicated recent months to building solo projects focused on AI-assisted development,
              including LLM API integration, prompt design, and automation of data and UI workflows.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {PROJECTS.map(project => (
                <div key={project.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                    {project.href ? (
                      <a href={project.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-h)' }}>
                        {project.name}
                      </a>
                    ) : (
                      <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-h)' }}>{project.name}</span>
                    )}
                    <span style={{ fontSize: 12, color: 'var(--text)', opacity: 0.7 }}>{project.stack}</span>
                  </div>
                  {project.href && (
                    <a href={project.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--accent)' }}>
                      {project.href.replace('https://', '')} →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </motion.section>

          <Divider />

          {/* Languages & Certificates */}
          <motion.section {...fadeUp(0)} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 36 : 48 }}>
            <div>
              <SectionLabel>Languages</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[['Polish', 'Native'], ['English', 'C2 — CPE']].map(([lang, level]) => (
                  <div key={lang} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 15, color: 'var(--text-h)' }}>{lang}</span>
                    <span style={{ fontSize: 13, color: 'var(--text)' }}>{level}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionLabel>Certificates & Skills</SectionLabel>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {CERTIFICATES.map(cert => (
                  <li key={cert} style={{ fontSize: 14, color: 'var(--text)', display: 'flex', gap: 8 }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0 }}>→</span>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>
        </motion.div>
      </main>
    </>
  )
}
