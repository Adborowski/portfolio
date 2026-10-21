import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'

// Bricolage Grotesque's variable axes: letters relax to BASE and swell to PEAK near the cursor.
const BASE = { wght: 520, wdth: 92 }
const PEAK = { wght: 800, wdth: 100 }
const RADIUS = 190 // px of cursor influence
const EASE = 0.16 // per-frame smoothing toward the target
const MEASURE_AT = 0.5 // swell level used when choosing line breaks
const INTRO_MS = 1600 // left-to-right sweep that shows the effect on load

interface Props {
  text: string
  /** Words given the neon highlighter treatment (.headline-accent). */
  accentWords?: string[]
  style?: CSSProperties
}

const axes = (f: number) =>
  `'wght' ${BASE.wght + (PEAK.wght - BASE.wght) * f}, 'wdth' ${BASE.wdth + (PEAK.wdth - BASE.wdth) * f}`

export default function KineticHeadline({ text, accentWords = [], style }: Props) {
  const words = text.split(' ')
  const rootRef = useRef<HTMLHeadingElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const letterRefs = useRef<HTMLSpanElement[]>([])
  // Line breaks are measured with every letter half-swollen, then locked, so swelling letters
  // never re-wrap the text. The hero clips horizontal overflow for the rare fully-swollen line.
  const [lines, setLines] = useState<number[][] | null>(null)

  useLayoutEffect(() => {
    if (lines) return
    const tops = wordRefs.current.map(w => w?.offsetTop ?? 0)
    const grouped: number[][] = []
    tops.forEach((top, i) => {
      if (i === 0 || top !== tops[i - 1]) grouped.push([i])
      else grouped[grouped.length - 1].push(i)
    })
    setLines(grouped)
  }, [lines])

  useEffect(() => {
    let width = window.innerWidth
    const relayout = () => {
      if (window.innerWidth === width) return
      width = window.innerWidth
      setLines(null)
    }
    window.addEventListener('resize', relayout)
    document.fonts?.ready.then(() => setLines(null))
    return () => window.removeEventListener('resize', relayout)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root || !lines) return
    const letters = letterRefs.current.filter(Boolean)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const current = letters.map(() => 0)
    let centers: { x: number; y: number }[] = []
    const measure = () => {
      centers = letters.map(el => {
        const r = el.getBoundingClientRect()
        return { x: r.left + r.width / 2 + window.scrollX, y: r.top + r.height / 2 + window.scrollY }
      })
    }
    measure()

    let pointer: { x: number; y: number } | null = null
    let visible = true
    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const t = now - start
      let target: (i: number) => number
      if (finePointer && t < INTRO_MS) {
        // Intro: a virtual cursor sweeps across each line.
        const box = root.getBoundingClientRect()
        const x = box.left + window.scrollX - RADIUS + (box.width + RADIUS * 2) * (t / INTRO_MS)
        target = i => Math.max(0, 1 - Math.abs(centers[i].x - x) / RADIUS) ** 2
      } else if (finePointer) {
        target = i => {
          if (!pointer) return 0
          const d = Math.hypot(centers[i].x - pointer.x, centers[i].y - pointer.y)
          return Math.max(0, 1 - d / RADIUS) ** 2
        }
      } else {
        // Touch: a slow wave rolls through the letters.
        target = i => 0.5 + 0.5 * Math.sin(t / 700 - i * 0.35)
      }

      let moving = false
      letters.forEach((el, i) => {
        const next = current[i] + (target(i) - current[i]) * EASE
        if (Math.abs(next - current[i]) > 0.001) moving = true
        current[i] = next
        el.style.fontVariationSettings = axes(next)
      })

      const keepGoing = visible && (moving || !finePointer || t < INTRO_MS)
      frame = keepGoing ? requestAnimationFrame(tick) : 0
    }
    const wake = () => {
      if (!frame && visible) frame = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      pointer = { x: e.pageX, y: e.pageY }
      wake()
    }
    const onLeave = () => {
      pointer = null
      wake()
    }
    const section = root.closest('section') ?? root
    section.addEventListener('pointermove', onMove)
    section.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', measure)

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) wake()
    })
    observer.observe(root)
    wake()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', measure)
    }
  }, [lines])

  letterRefs.current = []
  let letterIndex = 0
  const renderWord = (wi: number) => {
    const word = words[wi]
    const accent = accentWords.includes(word)
    return (
      <span
        key={wi}
        ref={el => { wordRefs.current[wi] = el }}
        className={accent ? 'headline-accent' : undefined}
        style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
      >
        {[...word].map((ch, ci) => {
          const i = letterIndex++
          return (
            <span
              key={ci}
              ref={el => { if (el) letterRefs.current[i] = el }}
              style={{ fontVariationSettings: axes(lines ? 0 : MEASURE_AT) }}
            >
              {ch}
            </span>
          )
        })}
      </span>
    )
  }

  return (
    <h1 ref={rootRef} aria-label={text} style={{ ...style, fontVariationSettings: axes(lines ? 0 : MEASURE_AT) }}>
      {lines
        ? lines.map((line, li) => (
            <span key={li} aria-hidden style={{ display: 'block', whiteSpace: 'nowrap' }}>
              {line.map((wi, k) => (
                <span key={wi}>
                  {k > 0 && ' '}
                  {renderWord(wi)}
                </span>
              ))}
            </span>
          ))
        : (
          <span aria-hidden style={{ display: 'block', textWrap: 'balance' }}>
            {words.map((_, wi) => (
              <span key={wi}>
                {wi > 0 && ' '}
                {renderWord(wi)}
              </span>
            ))}
          </span>
        )}
    </h1>
  )
}
