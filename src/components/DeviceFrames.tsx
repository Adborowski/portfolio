interface FrameProps {
  src: string
  alt: string
  height?: number | string
}

export function BrowserFrame({ src, alt, height }: FrameProps) {
  return (
    <div style={{
      width: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow)',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      height,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        padding: '8px 12px',
        background: 'var(--bg-subtle)',
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
      }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--border)' }} />
        ))}
      </div>
      <img
        src={src}
        alt={alt}
        className="frame-shot"
        style={{ width: '100%', flex: 1, minHeight: 0, objectFit: 'cover', objectPosition: 'top' }}
      />
    </div>
  )
}

export function PhoneFrame({ src, alt, width = 210 }: FrameProps & { width?: number }) {
  return (
    <div style={{
      width,
      flexShrink: 0,
      borderRadius: 32,
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow)',
      background: '#0a0a0a',
      padding: 7,
    }}>
      <img src={src} alt={alt} style={{ width: '100%', borderRadius: 25, display: 'block' }} />
    </div>
  )
}
