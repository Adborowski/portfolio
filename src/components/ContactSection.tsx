import { motion } from 'framer-motion'

const LINKS = {
  email: 'adborowski@gmail.com',
  github: 'https://github.com/Adborowski',
  linkedin: 'https://www.linkedin.com/in/adam-borowski-38a08994/',
}

export default function ContactSection() {
  return (
    <section id="contact" style={{ padding: '88px 0 96px', borderTop: '1px solid var(--border)' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}
      >
        <p style={{
          color: 'var(--accent-text)',
          fontWeight: 500,
          fontSize: 13,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}>
          Contact
        </p>
        <h2 style={{ fontSize: 42, marginBottom: 12 }}>Get in touch</h2>
        <p style={{ color: 'var(--text)', marginBottom: 36, maxWidth: 380 }}>
          Open to new opportunities. Best reached by email.
        </p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a
            href={`mailto:${LINKS.email}`}
            className="btn btn-primary"
            style={{
              fontSize: 14,
              fontWeight: 500,
              padding: '10px 22px',
              borderRadius: 8,
              background: 'var(--accent)',
              color: 'var(--accent-contrast)',
            }}
          >
            {LINKS.email}
          </a>

          {LINKS.github && (
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              style={{
                fontSize: 14,
                fontWeight: 500,
                padding: '10px 22px',
                borderRadius: 8,
                border: '1px solid var(--border)',
                color: 'var(--text-h)',
              }}
            >
              GitHub
            </a>
          )}

          {LINKS.linkedin && (
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              style={{
                fontSize: 14,
                fontWeight: 500,
                padding: '10px 22px',
                borderRadius: 8,
                border: '1px solid var(--border)',
                color: 'var(--text-h)',
              }}
            >
              LinkedIn
            </a>
          )}
        </div>

        <p style={{ marginTop: 72, fontSize: 13, color: 'var(--text)', opacity: 0.5 }}>
          © {new Date().getFullYear()} Adam Borowski
        </p>
      </motion.div>
    </section>
  )
}
