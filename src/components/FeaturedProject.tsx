import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'
import { BrowserFrame } from './DeviceFrames'

const TECH = ['React 19', 'TypeScript', 'Tailwind v4', 'shadcn/ui', 'React Router v7', 'Recharts', 'Vite']

const HIGHLIGHTS = [
  <>Multi-module ERP: service orders with Gantt-style schedule, parts catalog with two-panel browser, customer management, KPI dashboard</>,
  <>Integrated parts shop: product grid, cart, and full checkout flow — as a separate shell sharing the same component foundation</>,
  <>Platform architecture: domain-agnostic <code>ui/</code> layer drives both the ERP and Shop surfaces — design system changes propagate everywhere simultaneously</>,
  <>URL-driven state throughout — filter selections, active records, and pagination are deep-linkable across all modules</>,
]

const SCREENSHOTS = [
  { src: '/projects/auto-erp/auto-erp-1-dashboard.png', alt: 'ERP dashboard with KPI cards and order charts' },
  { src: '/projects/auto-erp/auto-erp-3-service-order.png', alt: 'Service order detail with status pipeline' },
  { src: '/projects/auto-erp/auto-erp-6-shop.png', alt: 'Parts shop product grid' },
]

const TAGS = ['ERP', 'E-Commerce', 'Greenfield', 'Platform Architecture']

export default function FeaturedProject() {
  const isMobile = useIsMobile()

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        border: '1px solid var(--border)',
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      {/* Header bar */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 8,
      }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {TAGS.map(tag => (
            <span key={tag} style={{
              fontSize: 12,
              fontWeight: 500,
              padding: '2px 10px',
              borderRadius: 100,
              background: 'var(--accent-bg)',
              color: 'var(--accent)',
              border: '1px solid var(--accent-border)',
              letterSpacing: '0.01em',
            }}>
              {tag}
            </span>
          ))}
        </div>
        {!isMobile && <span style={{ fontSize: 12, color: 'var(--text)' }}>Featured project</span>}
      </div>

      {/* Body */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1.15fr',
      }}>
        {/* Description */}
        <div style={{
          padding: isMobile ? '28px 24px' : '36px 36px',
          borderRight: isMobile ? 'none' : '1px solid var(--border)',
          borderBottom: isMobile ? '1px solid var(--border)' : 'none',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <h3 style={{ fontSize: isMobile ? 22 : 26, marginBottom: 6 }}>AutoServ ERP</h3>
          <p style={{ color: 'var(--accent)', fontWeight: 500, fontSize: 14, marginBottom: 16 }}>
            Automotive workshop ERP with integrated parts shop
          </p>
          <p style={{ lineHeight: 1.75, marginBottom: 24, color: 'var(--text)', fontSize: 15 }}>
            Greenfield frontend demo built around a shared component layer — the same <code>ui/</code> foundation
            powers both the ERP and the Shop, so design system changes propagate across both surfaces simultaneously.
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {HIGHLIGHTS.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                style={{ display: 'flex', gap: 10, fontSize: 14, lineHeight: 1.65 }}
              >
                <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 1, fontSize: 16 }}>→</span>
                <span style={{ color: 'var(--text)' }}>{item}</span>
              </motion.li>
            ))}
          </ul>

          <p style={{ fontSize: 13, color: 'var(--text)', opacity: 0.8, marginBottom: 28, lineHeight: 1.9 }}>
            {TECH.join('  ·  ')}
          </p>

          <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
            <a
              href="https://erp-auto.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{
                fontSize: 14,
                fontWeight: 500,
                padding: '9px 20px',
                borderRadius: 8,
                background: 'var(--accent)',
                color: 'var(--accent-contrast)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              View demo →
            </a>
            <a
              href="https://github.com/Adborowski/erp-auto"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              style={{
                fontSize: 14,
                fontWeight: 500,
                padding: '9px 20px',
                borderRadius: 8,
                border: '1px solid var(--border)',
                color: 'var(--text-h)',
              }}
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Screenshots */}
        <div style={{
          padding: isMobile ? '20px 24px' : '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          background: 'linear-gradient(180deg, var(--accent-bg), transparent 90%), var(--bg-subtle)',
        }}>
          <BrowserFrame src={SCREENSHOTS[0].src} alt={SCREENSHOTS[0].alt} />
          {!isMobile && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {SCREENSHOTS.slice(1).map(s => (
                <img
                  key={s.src}
                  src={s.src}
                  alt={s.alt}
                  style={{
                    borderRadius: 8,
                    border: '1px solid var(--border)',
                    width: '100%',
                    objectFit: 'cover',
                    aspectRatio: '16 / 10',
                    boxShadow: 'var(--shadow)',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  )
}
