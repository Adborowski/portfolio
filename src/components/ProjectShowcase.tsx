import { useState } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'
import { BrowserFrame, PhoneFrame } from './DeviceFrames'
import type { Project } from '../data/projects'

interface Props {
  project: Project
  index: number
}

export default function ProjectShowcase({ project, index }: Props) {
  const isMobile = useIsMobile()
  const [active, setActive] = useState(0)
  const flipped = !isMobile && index % 2 === 1
  const shot = project.desktop[active]
  const displayUrl = project.liveUrl.replace(/^https?:\/\/(www\.)?/, '')

  return (
    <motion.article
      id={project.slug}
      className="project-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      style={{
        border: '1px solid var(--border)',
        borderRadius: 16,
        overflow: 'hidden',
        display: 'grid',
        // minmax(0, …) lets columns shrink below their content, so a long URL in the
        // browser frame truncates instead of widening the card past the viewport.
        gridTemplateColumns: isMobile
          ? 'minmax(0, 1fr)'
          : flipped ? 'minmax(0, 1fr) minmax(0, 1.2fr)' : 'minmax(0, 1.2fr) minmax(0, 1fr)',
      }}
    >
      {/* Media */}
      <div style={{
        order: flipped ? 2 : 0,
        padding: isMobile ? '20px 20px 24px' : '32px 32px 28px',
        background: `linear-gradient(180deg, ${project.tint}, transparent 90%), var(--bg-subtle)`,
        borderRight: !isMobile && !flipped ? '1px solid var(--border)' : 'none',
        borderLeft: flipped ? '1px solid var(--border)' : 'none',
        borderBottom: isMobile ? '1px solid var(--border)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 14,
      }}>
        <div style={{ position: 'relative', paddingRight: isMobile ? 36 : 56, paddingBottom: isMobile ? 28 : 40 }}>
          <BrowserFrame src={shot.src} alt={shot.alt} url={displayUrl} />
          <div style={{ position: 'absolute', right: 0, bottom: 0 }}>
            <PhoneFrame src={project.mobile.src} alt={project.mobile.alt} width={isMobile ? 92 : 132} />
          </div>
        </div>

        {project.desktop.length > 1 && (
          <div role="tablist" aria-label={`${project.name} screenshots`} style={{ display: 'flex', gap: 8 }}>
            {project.desktop.map((s, i) => (
              <button
                key={s.src}
                role="tab"
                aria-selected={i === active}
                aria-label={s.alt}
                title={s.alt}
                onClick={() => setActive(i)}
                className="shot-thumb"
                style={{
                  width: isMobile ? 64 : 84,
                  padding: 0,
                  borderRadius: 6,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: 'var(--bg)',
                  border: `2px solid ${i === active ? 'var(--accent-text)' : 'var(--border)'}`,
                  opacity: i === active ? 1 : 0.7,
                }}
              >
                <img src={s.src} alt="" style={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', objectPosition: 'top' }} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{
        padding: isMobile ? '24px 22px 28px' : '36px 36px 32px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text)', opacity: 0.6, marginBottom: 10 }}>
          {String(index + 1).padStart(2, '0')}
        </p>
        <h3 style={{ fontSize: isMobile ? 22 : 26, marginBottom: 6 }}>{project.name}</h3>
        <p style={{ color: 'var(--accent-text)', fontWeight: 500, fontSize: 14, marginBottom: 16 }}>
          {project.tagline}
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text)', marginBottom: 20 }}>
          {project.description}
        </p>

        <div style={{
          borderLeft: '2px solid var(--accent)',
          padding: '2px 0 2px 14px',
          marginBottom: 22,
        }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-h)', marginBottom: 4 }}>
            {project.highlight.label}
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--text)' }}>{project.highlight.text}</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
          {project.tech.map(t => (
            <span key={t} style={{
              fontSize: 12,
              padding: '3px 10px',
              borderRadius: 6,
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
            }}>
              {t}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 'auto', flexWrap: 'wrap', alignItems: 'center' }}>
          <a
            href={project.liveUrl}
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
            }}
          >
            Live demo →
          </a>
          <a
            href={project.githubUrl}
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
    </motion.article>
  )
}
