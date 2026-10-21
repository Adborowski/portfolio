import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'
import { EXPERIENCE } from '../data/cv'


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
            color: 'var(--accent-text)',
            fontWeight: 500,
            fontSize: 13,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            Professional Experience
          </p>
          <h2 style={{ fontSize: isMobile ? 34 : 44, marginBottom: 8 }}>Enterprise & agency work</h2>
          <p style={{ color: 'var(--text)', fontSize: 15, marginBottom: 24, maxWidth: 520 }}>
            Production work across fintech, financial services, and cybersecurity — working with legacy codebases, complex data requirements, and cross-functional teams.
          </p>
        </motion.div>

        <div>
          {EXPERIENCE.map((role, i) => (
            <motion.div
              key={role.company}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '200px 1fr',
                gap: isMobile ? 6 : 32,
                padding: '28px 0',
                borderTop: '1px solid var(--border)',
              }}
            >
              <p style={{
                fontFamily: 'var(--mono)',
                fontSize: 13,
                color: 'var(--text)',
                opacity: 0.75,
                paddingTop: 3,
                whiteSpace: 'nowrap',
              }}>
                {role.period}
              </p>

              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                  <h3 style={{ fontSize: 17 }}>{role.company}</h3>
                  <span style={{ fontSize: 14, color: 'var(--text)' }}>
                    {role.role} · {role.sector}
                  </span>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 680 }}>
                  {role.bullets.map(b => (
                    <li key={b} style={{ display: 'flex', gap: 10, fontSize: 15, lineHeight: 1.65, color: 'var(--text)' }}>
                      <span style={{ color: 'var(--accent-text)', flexShrink: 0 }}>–</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
