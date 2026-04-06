import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const ROLES = [
  {
    company: 'IPF Digital',
    role: 'Frontend Developer',
    period: 'Feb 2025 – Jan 2026',
    sector: 'Fintech',
    description: 'Refactored legacy code, improved state management, defined API contracts, and delivered a short-term loan module handling 10,000+ applications.',
  },
  {
    company: 'Codesealer',
    role: 'Frontend Developer',
    period: 'Dec 2023 – Oct 2024',
    sector: 'Cybersecurity',
    description: 'Built content-driven frontends for a cybersecurity platform, combining animations, data visuals, and CMS integrations in close collaboration with stakeholders.',
  },
  {
    company: 'Finalto',
    role: 'Frontend Developer',
    period: 'Feb 2023 – Nov 2023',
    sector: 'Financial services',
    description: 'Developed interactive dashboards, onboarding flows, and motion-driven UIs for a financial services platform using modern web technologies.',
  },
  {
    company: 'Cybercrypt',
    role: 'Frontend Developer',
    period: 'Nov 2020 – Mar 2022',
    sector: 'Cybersecurity',
    description: 'Built interactive data-visualisation dashboards, onboarding flows, and marketing frontends with motion-driven UI using modern web technologies.',
  },
]

export default function ExperienceSection() {
  const isMobile = useIsMobile()

  return (
    <section style={{ padding: isMobile ? '56px 0 64px' : '80px 0 88px', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p style={{
            color: 'var(--accent)',
            fontWeight: 500,
            fontSize: 13,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            Professional Experience
          </p>
          <h2 style={{ fontSize: isMobile ? 26 : 32, marginBottom: 8 }}>Enterprise & agency work</h2>
          <p style={{ color: 'var(--text)', fontSize: 15, marginBottom: 40, maxWidth: 520 }}>
            Production work across fintech, financial services, and cybersecurity — working with legacy codebases, complex data requirements, and cross-functional teams.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
          {ROLES.map((role, i) => (
            <motion.div
              key={role.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              style={{
                padding: '24px',
                border: '1px solid var(--border)',
                borderRadius: 12,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4, gap: 8 }}>
                <h3 style={{ fontSize: 17 }}>{role.company}</h3>
                <span style={{
                  fontSize: 11,
                  padding: '2px 8px',
                  borderRadius: 100,
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}>
                  {role.sector}
                </span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 500, marginBottom: 4 }}>{role.role}</p>
              <p style={{ fontSize: 12, color: 'var(--text)', marginBottom: 14, opacity: 0.7 }}>{role.period}</p>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--text)' }}>{role.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
