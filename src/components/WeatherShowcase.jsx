import { useEffect, useMemo, useState } from 'react'

const presets = {
  sun: {
    name: 'Sunny Glow',
    bg: 'from-amber-200 via-rose-100 to-pink-200',
    overlay: 'bg-gradient-to-b from-amber-200/20 via-rose-200/10 to-transparent',
    particles: {
      color: 'rgba(255,200,0,0.6)',
      count: 40,
      size: [2, 4],
      drift: 0.2,
    },
  },
  rain: {
    name: 'Gentle Rain',
    bg: 'from-slate-800 via-slate-900 to-indigo-950',
    overlay: 'bg-gradient-to-b from-indigo-500/10 via-slate-900/20 to-slate-950/60',
    particles: {
      color: 'rgba(110,150,255,0.7)',
      count: 120,
      size: [1, 2],
      drift: 1.2,
      stretch: true,
    },
  },
  snow: {
    name: 'Soft Snow',
    bg: 'from-slate-100 via-indigo-50 to-pink-50',
    overlay: 'bg-gradient-to-b from-white/40 via-white/30 to-transparent',
    particles: {
      color: 'rgba(255,255,255,0.9)',
      count: 90,
      size: [2, 5],
      drift: 0.4,
    },
  },
}

function useCanvasAnimation(kind) {
  const cfg = presets[kind]
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const canvasRef = useMemo(() => ({ current: null }), [])

  useEffect(() => {
    if (!mounted || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let width, height

    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    const random = (min, max) => Math.random() * (max - min) + min

    const particles = Array.from({ length: cfg.particles.count }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * (cfg.particles.drift || 0.5),
      vy: cfg === presets.rain ? random(0.6, 1.4) : random(-0.2, 0.6),
      r: random(cfg.particles.size[0], cfg.particles.size[1]),
    }))

    function resize() {
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * DPR)
      canvas.height = Math.floor(height * DPR)
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }

    function step() {
      ctx.clearRect(0, 0, width, height)

      // gentle vignette
      const g = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/1.2)
      g.addColorStop(0, 'rgba(0,0,0,0)')
      g.addColorStop(1, 'rgba(0,0,0,0.15)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = cfg.particles.color
      ctx.strokeStyle = cfg.particles.color
      ctx.lineWidth = 1

      for (const p of particles) {
        p.x += p.vx * 0.6
        p.y += p.vy

        if (cfg === presets.rain && cfg.particles.stretch) {
          // raindrop streak
          ctx.beginPath()
          ctx.moveTo(p.x * width, p.y * height)
          ctx.lineTo((p.x - 0.02) * width, (p.y - 0.08) * height)
          ctx.stroke()
        } else {
          ctx.beginPath()
          ctx.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2)
          ctx.fill()
        }

        // wrap
        if (p.y * height > height + 20) p.y = -0.02
        if (p.y * height < -20) p.y = 1.02
        if (p.x * width > width + 20) p.x = -0.02
        if (p.x * width < -20) p.x = 1.02
      }

      raf = requestAnimationFrame(step)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [mounted, cfg])

  return canvasRef
}

function WeatherCard({ kind, active, onClick }) {
  const cfg = presets[kind]
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all ${
        active ? 'border-pink-400/70 bg-white/10' : 'border-white/10 bg-white/5 hover:bg-white/10'
      }`}
    >
      <div className="mb-2 text-sm text-white/70">{cfg.name}</div>
      <div className={`h-24 w-full rounded-xl bg-gradient-to-br ${cfg.bg}`} />
    </button>
  )
}

export default function WeatherShowcase() {
  const [mode, setMode] = useState('sun')
  const canvasRef = useCanvasAnimation(mode)
  const cfg = presets[mode]

  return (
    <section id="how-it-works" className="relative w-full bg-slate-950 py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-2">
        <div>
          <h2 className="bg-gradient-to-br from-white via-pink-100 to-purple-200 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            AI-styled weather scenes
          </h2>
          <p className="mt-3 text-white/70">
            Toggle between sun, rain, and snow to preview smooth ambient animations designed to add depth and delight to your UI.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {Object.keys(presets).map((k) => (
              <WeatherCard key={k} kind={k} active={mode === k} onClick={() => setMode(k)} />
            ))}
          </div>
          <p className="mt-6 text-sm text-white/50">
            Background colors adapt to the selected weather. Particles are rendered efficiently on a single canvas.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <div className={`absolute inset-0 -z-0 rounded-3xl bg-gradient-to-br ${cfg.bg}`} />
          <canvas ref={canvasRef} className="relative z-10 h-[360px] w-full" />
          <div className={`pointer-events-none absolute inset-0 rounded-3xl ${cfg.overlay}`} />
        </div>
      </div>
    </section>
  )
}
