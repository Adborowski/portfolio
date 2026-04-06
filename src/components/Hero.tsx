import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
})

const SKILLS = ['React', 'TypeScript', 'Next.js', 'React Native', 'Tailwind', 'Vite', 'Node.js']

export default function Hero() {
  const isMobile = useIsMobile()

  return (
    <section style={{
      minHeight: isMobile ? 'auto' : '58vh',
      display: 'flex',
      alignItems: 'center',
      padding: isMobile ? '48px 0 52px' : '80px 0 72px',
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '0 20px',
        width: '100%',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: isMobile ? 32 : 48,
      }}>
        {/* Photo — top on mobile */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="/profile-picture.jpg"
              alt="Adam Borowski"
              style={{
                width: 96,
                height: 96,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--border)',
                boxShadow: 'var(--shadow)',
              }}
            />
          </motion.div>
        )}

        {/* Text */}
        <div style={{ flex: 1 }}>
          <motion.p
            {...fadeUp(0)}
            style={{
              color: 'var(--accent)',
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            Senior Frontend Engineer
          </motion.p>

          <motion.h1
            {...fadeUp(0.08)}
            style={{
              fontSize: isMobile ? 42 : 'clamp(44px, 6.5vw, 76px)',
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              marginBottom: 20,
              color: 'var(--text-h)',
            }}
          >
            Adam Borowski
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            style={{
              fontSize: isMobile ? 17 : 20,
              lineHeight: 1.65,
              color: 'var(--text)',
              maxWidth: 540,
              marginBottom: 36,
            }}
          >
            Building component-driven products — from Greenfield ERP systems
            and e-commerce shops to mobile apps. Focused on scalable architecture
            and multi-surface frontends.
          </motion.p>

          <motion.div {...fadeUp(0.24)} style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SKILLS.map(skill => (
              <span
                key={skill}
                style={{
                  fontSize: 13,
                  padding: '5px 13px',
                  borderRadius: 6,
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                }}
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Photo — right on desktop */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ flexShrink: 0 }}
          >
            <img
              src="/profile-picture.jpg"
              alt="Adam Borowski"
              style={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--border)',
                boxShadow: 'var(--shadow)',
              }}
            />
          </motion.div>
        )}
      </div>
    </section>
  )
}
