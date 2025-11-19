import { useRef } from 'react'
import Hero from './components/Hero'
import WeatherShowcase from './components/WeatherShowcase'
import EffectsGallery from './components/EffectsGallery'
import Footer from './components/Footer'

function App() {
  const howRef = useRef(null)
  const scrollToShowcase = () => {
    const el = document.querySelector('#how-it-works')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <Hero onExplore={scrollToShowcase} />
      <WeatherShowcase ref={howRef} />
      <EffectsGallery />
      <Footer />
    </div>
  )
}

export default App
