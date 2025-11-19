import { useMemo } from 'react'

const EFFECTS = [
  {
    key: 'sunny-glow',
    name: 'Sunny Glow',
    badge: 'Best',
    gradient: 'from-amber-200 via-rose-100 to-pink-200',
    css: 'linear-gradient(135deg, #fde68a 0%, #ffe4e6 50%, #fbcfe8 100%)',
    description: 'Warm, optimistic gradient with soft highlights — great for headers and onboarding moments.'
  },
  {
    key: 'neon-night',
    name: 'Neon Night',
    gradient: 'from-fuchsia-600 via-violet-700 to-indigo-900',
    css: 'linear-gradient(135deg, #c026d3 0%, #6d28d9 50%, #312e81 100%)',
    description: 'High-contrast neon for cyberpunk vibes. Perfect for hero covers and bold CTAs.'
  },
  {
    key: 'aurora-mist',
    name: 'Aurora Mist',
    badge: 'Best',
    gradient: 'from-emerald-200 via-teal-200 to-cyan-200',
    css: 'linear-gradient(135deg, #a7f3d0 0%, #99f6e4 50%, #a5f3fc 100%)',
    description: 'Soft polar glow with airy hues. Ideal for wellness, productivity, and calm landing pages.'
  },
  {
    key: 'ocean-depths',
    name: 'Ocean Depths',
    gradient: 'from-sky-900 via-blue-900 to-slate-950',
    css: 'linear-gradient(135deg, #0c4a6e 0%, #1e3a8a 60%, #020617 100%)',
    description: 'Deep navy gradient that gives cinematic depth behind light content.'
  },
  {
    key: 'glass-frost',
    name: 'Glass Frost',
    gradient: 'from-white via-slate-100 to-slate-200',
    css: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #e2e8f0 100%)',
    description: 'Clean glassmorphism base. Adds clarity for dashboards and B2B tools.'
  },
  {
    key: 'velvet-sunset',
    name: 'Velvet Sunset',
    gradient: 'from-rose-300 via-pink-300 to-purple-300',
    css: 'linear-gradient(135deg, #fda4af 0%, #f9a8d4 50%, #d8b4fe 100%)',
    description: 'Romantic dusk tones with velvet softness — great for portfolios and storytelling.'
  },
  {
    key: 'cyber-grid',
    name: 'Cyber Grid',
    gradient: 'from-slate-900 via-slate-950 to-black',
    css: 'linear-gradient(135deg, #0f172a 0%, #020617 60%, #000000 100%)',
    description: 'Ultra-dark base to make neon elements and 3D scenes pop.'
  },
  {
    key: 'storm-surge',
    name: 'Storm Surge',
    gradient: 'from-indigo-600 via-slate-800 to-slate-950',
    css: 'linear-gradient(135deg, #4f46e5 0%, #1f2937 60%, #020617 100%)',
    description: 'Brooding storm palette that pairs well with motion blur and parallax.'
  },
  {
    key: 'stardust',
    name: 'Stardust',
    badge: 'Best',
    gradient: 'from-slate-900 via-indigo-900 to-fuchsia-900',
    css: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #701a75 100%)',
    description: 'Cosmic gradient for starry, particle-heavy scenes and immersive hero sections.'
  },
  {
    key: 'prism-wave',
    name: 'Prism Wave',
    gradient: 'from-cyan-200 via-sky-200 to-indigo-200',
    css: 'linear-gradient(135deg, #a5f3fc 0%, #bae6fd 50%, #c7d2fe 100%)',
    description: 'Bright, modern look that reads well with black typography.'
  },
  {
    key: 'glacier-blue',
    name: 'Glacier Blue',
    gradient: 'from-blue-200 via-indigo-100 to-white',
    css: 'linear-gradient(135deg, #bfdbfe 0%, #e0e7ff 50%, #ffffff 100%)',
    description: 'Icy clarity that pairs well with glass cards and thin outlines.'
  },
  {
    key: 'sakura-breeze',
    name: 'Sakura Breeze',
    gradient: 'from-rose-100 via-rose-200 to-pink-200',
    css: 'linear-gradient(135deg, #ffe4e6 0%, #fecdd3 50%, #fbcfe8 100%)',
    description: 'Playful, floral tones for gentle, friendly interfaces.'
  },
  {
    key: 'ember-fade',
    name: 'Ember Fade',
    gradient: 'from-orange-600 via-amber-500 to-rose-500',
    css: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 50%, #f43f5e 100%)',
    description: 'Fiery gradient that brings energy to banners and promo moments.'
  },
  {
    key: 'midnight',
    name: 'Midnight Focus',
    gradient: 'from-slate-800 via-slate-900 to-slate-950',
    css: 'linear-gradient(135deg, #1f2937 0%, #0f172a 50%, #020617 100%)',
    description: 'Minimal, focused darkness for content-first layouts.'
  },
  {
    key: 'tropical-pop',
    name: 'Tropical Pop',
    gradient: 'from-lime-200 via-emerald-200 to-teal-200',
    css: 'linear-gradient(135deg, #d9f99d 0%, #a7f3d0 50%, #99f6e4 100%)',
    description: 'Fresh, juicy colors that feel fun and inviting.'
  },
  {
    key: 'mono-focus',
    name: 'Mono Focus',
    gradient: 'from-white via-slate-100 to-slate-200',
    css: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #e2e8f0 100%)',
    description: 'Monochrome base that lets typography and imagery shine.'
  },
  {
    key: 'royal-bloom',
    name: 'Royal Bloom',
    gradient: 'from-purple-400 via-violet-500 to-indigo-600',
    css: 'linear-gradient(135deg, #c084fc 0%, #8b5cf6 50%, #4f46e5 100%)',
    description: 'Regal vibrance for premium product sections.'
  },
  {
    key: 'mystic-plum',
    name: 'Mystic Plum',
    gradient: 'from-fuchsia-300 via-purple-400 to-violet-500',
    css: 'linear-gradient(135deg, #f0abfc 0%, #c084fc 50%, #8b5cf6 100%)',
    description: 'Dreamy hues with a friendly, modern feel.'
  },
  {
    key: 'citrus-burst',
    name: 'Citrus Burst',
    gradient: 'from-yellow-200 via-orange-200 to-rose-200',
    css: 'linear-gradient(135deg, #fef08a 0%, #fed7aa 50%, #fecdd3 100%)',
    description: 'Lively citrus tones that energize CTAs and onboarding.'
  },
  {
    key: 'arctic-dawn',
    name: 'Arctic Dawn',
    gradient: 'from-cyan-100 via-sky-100 to-indigo-100',
    css: 'linear-gradient(135deg, #cffafe 0%, #e0f2fe 50%, #e0e7ff 100%)',
    description: 'Frosty morning light with pristine clarity for minimalist UIs.'
  }
]

function useBackgroundSetter() {
  return useMemo(() => ({
    apply: (css) => {
      const el = document.documentElement
      el.style.backgroundImage = css
      el.style.backgroundAttachment = 'fixed'
      el.style.backgroundSize = 'cover'
      el.style.backgroundRepeat = 'no-repeat'
    },
    reset: () => {
      const el = document.documentElement
      el.style.backgroundImage = ''
      el.style.backgroundAttachment = ''
      el.style.backgroundSize = ''
      el.style.backgroundRepeat = ''
    }
  }), [])
}

function EffectCard({ effect, onApply }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
      {effect.badge && (
        <span className="absolute right-3 top-3 rounded-full border border-pink-400/30 bg-pink-500/20 px-2 py-0.5 text-xs font-medium text-pink-200">{effect.badge}</span>
      )}
      <div className={`h-28 w-full rounded-xl bg-gradient-to-br ${effect.gradient}`} />
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-white">{effect.name}</h3>
          <p className="mt-1 text-sm text-white/70">{effect.description}</p>
        </div>
        <div className="shrink-0">
          <button onClick={() => onApply(effect.css)} className="rounded-lg bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-white">Use</button>
        </div>
      </div>
    </div>
  )
}

export default function EffectsGallery() {
  const bg = useBackgroundSetter()

  return (
    <section id="gallery" className="relative w-full bg-slate-950 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="bg-gradient-to-br from-white via-pink-100 to-purple-200 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">UI Background Gallery</h2>
            <p className="mt-3 max-w-2xl text-white/70">Browse 20 hand-tuned backgrounds. Tap Use to apply it to the whole page instantly. Each entry includes a short note about when it shines best.</p>
          </div>
          <button onClick={bg.reset} className="rounded-xl border border-white/30 bg-white/10 px-4 py-2 font-semibold text-white backdrop-blur transition hover:bg-white/20">Reset background</button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {EFFECTS.map((e) => (
            <EffectCard key={e.key} effect={e} onApply={bg.apply} />
          ))}
        </div>
      </div>
    </section>
  )
}
