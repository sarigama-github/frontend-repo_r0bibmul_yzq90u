import Spline from '@splinetool/react-spline';

function Hero({ onExplore }) {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden">
      {/* Spline 3D background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/kqB-rdL4TCJ7pyGb/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlays for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-pink-500/10 via-purple-700/20 to-slate-900/70" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm text-white/90 backdrop-blur">
          <span className="h-2 w-2 animate-pulse rounded-full bg-pink-400" />
          Live, animated weather backgrounds
        </div>
        <h1 className="mt-6 bg-gradient-to-br from-white via-pink-100 to-purple-200 bg-clip-text text-5xl font-extrabold leading-tight text-transparent md:text-6xl">
          Dynamic Weather App
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/80 md:text-xl">
          Rain, snow, and sun — beautifully animated with smooth transitions for instant UI wow-effect.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button onClick={onExplore} className="rounded-xl bg-white/90 px-5 py-3 font-semibold text-slate-900 shadow-sm transition hover:bg-white">
            Explore the effects
          </button>
          <a href="#how-it-works" className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20">
            How it works
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
