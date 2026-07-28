import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
})

const SKILLS = ['React', 'TypeScript', 'Next.js', 'React Native', 'Tailwind', 'Vite', 'Node.js', 'Figma']

export default function Hero() {
  const isMobile = useIsMobile()

  return (
    <section style={{ padding: isMobile ? '48px 0 64px' : '96px 0 104px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
        {/* Identity row */}
        <motion.div
          {...fadeUp(0)}
          style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: isMobile ? 28 : 40 }}
        >
          <img
            src="/profile-picture.jpg"
            alt="Adam Borowski"
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--border)',
            }}
          />
          <div>
            <p style={{ color: 'var(--text-h)', fontWeight: 600, fontSize: 15 }}>Adam Borowski</p>
            <p style={{ color: 'var(--text)', fontSize: 14 }}>Senior Frontend Engineer · Warsaw</p>
          </div>
        </motion.div>

        {/* Statement */}
        <motion.h1
          {...fadeUp(0.08)}
          style={{
            fontSize: isMobile ? 'clamp(40px, 11vw, 52px)' : 'clamp(56px, 6.5vw, 92px)',
            lineHeight: 1.06,
            maxWidth: 900,
            marginBottom: 28,
          }}
        >
          Frontends for <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>complex</em> businesses —
          ERP, <span style={{ whiteSpace: 'nowrap' }}>e-commerce</span>, and mobile.
        </motion.h1>

        <motion.p
          {...fadeUp(0.16)}
          style={{
            fontSize: isMobile ? 16 : 19,
            lineHeight: 1.65,
            color: 'var(--text)',
            maxWidth: 560,
            marginBottom: 36,
          }}
        >
          Component-driven products built on shared design systems — so one
          foundation scales cleanly across every surface, from admin dashboards
          to customer-facing shops.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.24)} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
          <a
            href="/#projects"
            className="btn btn-primary"
            style={{
              fontSize: 15,
              fontWeight: 500,
              padding: '11px 24px',
              borderRadius: 8,
              background: 'var(--accent)',
              color: 'var(--accent-contrast)',
            }}
          >
            See my work →
          </a>
          <a
            href="/cv"
            className="btn btn-ghost"
            style={{
              fontSize: 15,
              fontWeight: 500,
              padding: '11px 24px',
              borderRadius: 8,
              border: '1px solid var(--border)',
              color: 'var(--text-h)',
            }}
          >
            View CV
          </a>
        </motion.div>

        <motion.p {...fadeUp(0.3)} style={{ fontSize: 14, color: 'var(--text)', opacity: 0.75 }}>
          {SKILLS.join('  ·  ')}
        </motion.p>
      </div>
    </section>
  )
}
