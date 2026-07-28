import { motion } from 'framer-motion'
import { BrowserFrame, PhoneFrame } from './DeviceFrames'

interface Props {
  name: string
  tagline: string
  description: string
  tech: string[]
  screenshot: string
  screenshotAlt?: string
  liveUrl?: string
  githubUrl?: string
  badge?: string
  media?: 'browser' | 'phone'
  tint?: string
}

export default function ProjectCard({
  name,
  tagline,
  description,
  tech,
  screenshot,
  screenshotAlt,
  liveUrl,
  githubUrl,
  badge,
  media = 'browser',
  tint,
}: Props) {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        border: '1px solid var(--border)',
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Screenshot */}
      <div style={{
        height: 280,
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
        background: tint
          ? `linear-gradient(180deg, ${tint}, transparent 90%), var(--bg-subtle)`
          : 'var(--bg-subtle)',
        padding: '28px 28px 0',
        display: 'flex',
        justifyContent: 'center',
      }}>
        {media === 'phone' ? (
          <PhoneFrame src={screenshot} alt={screenshotAlt ?? `${name} screenshot`} />
        ) : (
          <BrowserFrame src={screenshot} alt={screenshotAlt ?? `${name} screenshot`} height="100%" />
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '24px 24px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6, gap: 8 }}>
          <h3 style={{ fontSize: 20 }}>{name}</h3>
          {badge && (
            <span style={{
              fontSize: 11,
              fontWeight: 500,
              padding: '2px 9px',
              borderRadius: 100,
              background: 'var(--accent-bg)',
              color: 'var(--accent)',
              border: '1px solid var(--accent-border)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
              {badge}
            </span>
          )}
        </div>

        <p style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500, marginBottom: 14 }}>
          {tagline}
        </p>

        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--text)', marginBottom: 20, flex: 1 }}>
          {description}
        </p>

        <p style={{ fontSize: 13, color: 'var(--text)', opacity: 0.8, marginBottom: 20, lineHeight: 1.9 }}>
          {tech.join('  ·  ')}
        </p>

        {(liveUrl || githubUrl) && (
          <div style={{ display: 'flex', gap: 8 }}>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  padding: '7px 16px',
                  borderRadius: 7,
                  background: 'var(--accent)',
                  color: 'var(--accent-contrast)',
                }}
              >
                Live →
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  padding: '7px 16px',
                  borderRadius: 7,
                  border: '1px solid var(--border)',
                  color: 'var(--text-h)',
                }}
              >
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  )
}
