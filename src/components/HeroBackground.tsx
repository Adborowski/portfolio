import { useEffect, useRef } from 'react'

// A drifting dot grid with "data pings": ripples that light dots up in the accent colour as they
// pass. The cursor nudges nearby dots aside and tints them; clicking sends a ripple of its own.
const SPACING = 26 // px between dots
const CURSOR_RADIUS = 150
const PING_EVERY_MS = 2200
const PING_SPEED = 0.22 // px per ms
const PING_WIDTH = 70 // thickness of the bright ring
const PING_LIFE_MS = 3600

interface Ping { x: number; y: number; born: number }

function cssColor(name: string) {
  const probe = document.createElement('span')
  probe.style.color = `var(${name})`
  document.body.appendChild(probe)
  const rgb = getComputedStyle(probe).color.match(/\d+/g)!.slice(0, 3).map(Number)
  probe.remove()
  return rgb
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !section || !ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
    let ink = cssColor('--text-h')
    let accent = cssColor('--accent')
    const refreshColors = () => {
      ink = cssColor('--text-h')
      accent = cssColor('--accent')
      if (reducedMotion) draw(0)
    }

    let width = 0
    let height = 0
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = section.clientWidth
      height = section.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (reducedMotion) draw(0)
    }

    let pointer: { x: number; y: number } | null = null
    const pings: Ping[] = []
    let lastPing = -PING_EVERY_MS / 2

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)
      const cols = Math.ceil(width / SPACING) + 1
      const rows = Math.ceil(height / SPACING) + 1

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * SPACING + (r % 2) * (SPACING / 2)
          const by = r * SPACING
          // Slow, layered sine "terrain" makes the grid breathe.
          const wave = Math.sin(bx * 0.011 + t * 0.0006) * Math.cos(by * 0.014 - t * 0.00045)
          let x = bx + wave * 5
          let y = by + Math.sin(bx * 0.02 + t * 0.0008) * 3

          let glow = 0
          for (const p of pings) {
            const age = t - p.born
            const d = Math.hypot(bx - p.x, by - p.y)
            const ring = 1 - Math.abs(d - age * PING_SPEED) / PING_WIDTH
            if (ring > 0) glow = Math.max(glow, ring * (1 - age / PING_LIFE_MS))
          }
          if (pointer) {
            const dx = bx - pointer.x
            const dy = by - pointer.y
            const d = Math.hypot(dx, dy)
            if (d < CURSOR_RADIUS) {
              const f = (1 - d / CURSOR_RADIUS) ** 2
              x += (dx / (d || 1)) * f * 14
              y += (dy / (d || 1)) * f * 14
              glow = Math.max(glow, f)
            }
          }

          const base = 0.13 + 0.1 * (wave + 1)
          const [cr, cg, cb] = glow > 0.02 ? accent : ink
          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${glow > 0.02 ? 0.25 + 0.6 * glow : base})`
          ctx.beginPath()
          ctx.arc(x, y, 1.1 + glow * 1.8, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    resize()
    if (reducedMotion) {
      draw(0)
    }

    let frame = 0
    let visible = true
    const start = performance.now()
    const tick = (now: number) => {
      const t = now - start
      if (t - lastPing > PING_EVERY_MS) {
        lastPing = t
        // Pings favour the right-hand side, away from the headline.
        pings.push({ x: width * (0.45 + Math.random() * 0.55), y: height * Math.random(), born: t })
      }
      while (pings.length && t - pings[0].born > PING_LIFE_MS) pings.shift()
      draw(t)
      frame = requestAnimationFrame(tick)
    }
    const play = () => {
      if (!reducedMotion && visible && !document.hidden && !frame) frame = requestAnimationFrame(tick)
    }
    const pause = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const local = (e: PointerEvent) => {
      const box = section.getBoundingClientRect()
      return { x: e.clientX - box.left, y: e.clientY - box.top }
    }
    const onMove = (e: PointerEvent) => { if (e.pointerType === 'mouse') pointer = local(e) }
    const onLeave = () => { pointer = null }
    const onDown = (e: PointerEvent) => {
      const at = local(e)
      pings.push({ ...at, born: performance.now() - start })
    }
    const onVisibility = () => (document.hidden ? pause() : play())

    section.addEventListener('pointermove', onMove)
    section.addEventListener('pointerleave', onLeave)
    section.addEventListener('pointerdown', onDown)
    document.addEventListener('visibilitychange', onVisibility)
    darkQuery.addEventListener('change', refreshColors)
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(section)
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) play()
      else pause()
    })
    intersection.observe(section)
    play()

    return () => {
      pause()
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
      section.removeEventListener('pointerdown', onDown)
      document.removeEventListener('visibilitychange', onVisibility)
      darkQuery.removeEventListener('change', refreshColors)
      resizeObserver.disconnect()
      intersection.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="hero-bg"
    />
  )
}
