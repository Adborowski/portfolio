import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const SKILLS = [
  'React', 'TypeScript', 'Next.js', 'React Native', 'Node.js',
  'Tailwind CSS', 'Vite', 'Firebase', 'Framer Motion',
  'REST APIs', 'CI/CD', 'Figma', 'Claude Code',
]

export default function AboutSection() {
  const isMobile = useIsMobile()

  return (
    <section id="about" style={{ padding: isMobile ? '56px 0' : '88px 0', borderTop: '1px solid var(--border)' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}
      >
        <p style={{
          color: 'var(--accent)',
          fontWeight: 500,
          fontSize: 13,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}>
          About
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 36 : 72,
          alignItems: 'start',
        }}>
          <div>
            <h2 style={{ fontSize: isMobile ? 34 : 44, marginBottom: 20 }}>
              Frontend engineer,<br />systems thinker
            </h2>
            <p style={{ lineHeight: 1.8, color: 'var(--text)', marginBottom: 16 }}>
              I build scalable frontend systems — with experience across Greenfield products and
              enterprise codebases. My focus is component architecture, multi-surface products,
              and translating complex business requirements into clean, maintainable interfaces.
            </p>
            <p style={{ lineHeight: 1.8, color: 'var(--text)' }}>
              Recent work has deepened my focus on React Native, mobile-first experiences,
              and AI-assisted development workflows using Claude Code.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: 15, marginBottom: 18, color: 'var(--text-h)', fontWeight: 500, letterSpacing: 0 }}>
              Tech I work with
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 24 }}>
              {SKILLS.map(skill => (
                <span key={skill} style={{
                  fontSize: 14,
                  color: 'var(--text)',
                  padding: '7px 0',
                  borderBottom: '1px solid var(--border)',
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
