interface FrameProps {
  src: string
  alt: string
  height?: number | string
}

export function BrowserFrame({ src, alt, height, url }: FrameProps & { url?: string }) {
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
        {url && (
          <span style={{
            flex: 1,
            maxWidth: 280,
            margin: '0 auto',
            fontSize: 11,
            lineHeight: '18px',
            textAlign: 'center',
            color: 'var(--text)',
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            padding: '0 8px',
          }}>
            {url}
          </span>
        )}
      </div>
      <img
        src={src}
        alt={alt}
        className="frame-shot"
        style={{
          width: '100%',
          flex: height ? 1 : undefined,
          minHeight: 0,
          aspectRatio: height ? undefined : '16 / 10',
          objectFit: 'cover',
          objectPosition: 'top',
        }}
      />
    </div>
  )
}

export function PhoneFrame({ src, alt, width = 210 }: FrameProps & { width?: number }) {
  return (
    <div style={{
      width,
      flexShrink: 0,
      borderRadius: width * 0.15,
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow)',
      background: '#0a0a0a',
      padding: Math.round(width * 0.033),
    }}>
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', aspectRatio: '390 / 844', objectFit: 'cover', objectPosition: 'top', borderRadius: width * 0.12, display: 'block' }}
      />
    </div>
  )
}
