import { motion } from 'framer-motion'
import Nav from '../components/Nav'
import { useIsMobile } from '../hooks/useIsMobile'
import { PROFILE, SUMMARY, SKILL_GROUPS, EXPERIENCE, INDEPENDENT_ROLE, EDUCATION, CERTIFICATIONS, LANGUAGES } from '../data/cv'
import { PROJECTS } from '../data/projects'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
})

function SectionLabel({ children }: { children: string }) {
  return (
    <p style={{
      color: 'var(--accent-text)',
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
  const rowGrid = { display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '160px 1fr', gap: isMobile ? '0' : '0 32px' }

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
                alt={PROFILE.name}
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
                <h1 style={{ fontSize: 36, letterSpacing: '-0.03em', marginBottom: 6 }}>{PROFILE.name}</h1>
                <p style={{ fontSize: 17, color: 'var(--accent-text)', fontWeight: 500, marginBottom: 10 }}>
                  {PROFILE.title} <span style={{ color: 'var(--text)', fontWeight: 400 }}>· {PROFILE.focus}</span>
                </p>
                <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8 }}>
                  {PROFILE.location}
                  <span style={{ margin: '0 10px', opacity: 0.4 }}>·</span>
                  <a href={`mailto:${PROFILE.email}`} style={{ color: 'var(--text)' }}>{PROFILE.email}</a>
                  <span style={{ margin: '0 10px', opacity: 0.4 }}>·</span>
                  {PROFILE.phone}
                </p>
              </div>
            </div>
            <a
              href={PROFILE.cvPdf}
              download
              className="btn btn-ghost"
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

          {/* Summary */}
          <motion.div {...fadeUp(0)}>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text)', maxWidth: 680 }}>
              {SUMMARY}
            </p>
          </motion.div>

          <Divider />

          {/* Skills */}
          <motion.section {...fadeUp(0)}>
            <SectionLabel>Technical skills</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {SKILL_GROUPS.map(([group, skills]) => (
                <div key={group} style={rowGrid}>
                  <p style={{ fontSize: 13, color: 'var(--text-h)', fontWeight: 500, paddingTop: 3, marginBottom: isMobile ? 8 : 0 }}>{group}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {skills.map(skill => (
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
                </div>
              ))}
            </div>
          </motion.section>

          <Divider />

          {/* Experience */}
          <motion.section {...fadeUp(0)}>
            <SectionLabel>Experience</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
              {[INDEPENDENT_ROLE, ...EXPERIENCE].map((job, i) => (
                <motion.div key={job.company} {...fadeUp(i * 0.06)} style={rowGrid}>
                  <p style={{ fontSize: 13, color: 'var(--text)', paddingTop: 3, lineHeight: 1.5 }}>{job.period}</p>
                  <div>
                    <p style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-h)', marginBottom: 2 }}>{job.company}</p>
                    <p style={{ fontSize: 13, color: 'var(--accent-text)', fontWeight: 500, marginBottom: 10 }}>{job.role} · {job.sector}</p>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {job.bullets.map(b => (
                        <li key={b} style={{ display: 'flex', gap: 10, fontSize: 14, lineHeight: 1.7, color: 'var(--text)' }}>
                          <span style={{ color: 'var(--accent-text)', flexShrink: 0 }}>–</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <Divider />

          {/* Projects */}
          <motion.section {...fadeUp(0)}>
            <SectionLabel>Independent projects</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {PROJECTS.map(project => (
                <div key={project.slug} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                    <a href={`/#${project.slug}`} style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-h)' }}>
                      {project.name}
                    </a>
                    <span style={{ fontSize: 12, color: 'var(--text)', opacity: 0.7 }}>{project.tech.slice(0, 4).join(', ')}</span>
                  </div>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--accent-text)' }}>
                    Live demo →
                  </a>
                </div>
              ))}
            </div>
          </motion.section>

          <Divider />

          {/* Education */}
          <motion.section {...fadeUp(0)}>
            <SectionLabel>Education</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {EDUCATION.map((edu, i) => (
                <motion.div key={edu.institution} {...fadeUp(i * 0.06)} style={rowGrid}>
                  <p style={{ fontSize: 13, color: 'var(--text)', paddingTop: 3 }}>{edu.period}</p>
                  <div>
                    <p style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-h)', marginBottom: 2 }}>{edu.institution}</p>
                    <p style={{ fontSize: 13, color: 'var(--accent-text)', fontWeight: 500 }}>{edu.degree}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <Divider />

          {/* Languages & Certifications */}
          <motion.section {...fadeUp(0)} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 36 : 48 }}>
            <div>
              <SectionLabel>Languages</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {LANGUAGES.map(([lang, level]) => (
                  <div key={lang} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                    <span style={{ fontSize: 15, color: 'var(--text-h)' }}>{lang}</span>
                    <span style={{ fontSize: 13, color: 'var(--text)', textAlign: 'right' }}>{level}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionLabel>Certifications</SectionLabel>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {CERTIFICATIONS.map(cert => (
                  <li key={cert} style={{ fontSize: 14, color: 'var(--text)', display: 'flex', gap: 8 }}>
                    <span style={{ color: 'var(--accent-text)', flexShrink: 0 }}>→</span>
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
