import Nav from './components/Nav'
import Hero from './components/Hero'
import FeaturedProject from './components/FeaturedProject'
import ProjectCard from './components/ProjectCard'
import ExperienceSection from './components/ExperienceSection'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import { useIsMobile } from './hooks/useIsMobile'
import './App.css'

export default function App() {
  const isMobile = useIsMobile()

  return (
    <>
      <Nav />
      <main>
        <Hero />

        <section id="projects" style={{ padding: isMobile ? '56px 0 64px' : '80px 0 96px', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
            <p style={{
              color: 'var(--accent)',
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}>
              Projects
            </p>
            <h2 style={{ fontSize: isMobile ? 26 : 32, marginBottom: 40 }}>Selected work</h2>

            <FeaturedProject />

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20, marginTop: 20 }}>
              <ProjectCard
                name="Sejmograf.pl"
                tagline="Parliament attendance tracker"
                description="Tracks voting attendance for all 460 Polish MPs, updated daily via a GitHub Actions data pipeline pulling from the official Sejm API. Features a ranked leaderboard, party comparison charts, individual MP profiles with attendance trend data, and user reviews via Firebase Auth."
                tech={['Next.js', 'Firebase', 'Tailwind v4', 'Recharts', 'Vercel', 'GitHub Actions']}
                screenshot="/projects/sejmograf/sejmograf-1.png"
                screenshotAlt="Sejmograf leaderboard showing MP attendance rankings"
                liveUrl="https://sejmograf.pl"
                badge="Live product"
              />
              <ProjectCard
                name="Warszapka"
                tagline="React Native city exploration game"
                description="GPS-based location game for discovering Warsaw's 1,900+ parks and monuments across 18 districts. Custom geospatial utilities handle proximity detection (Haversine distance), viewport culling keeps 1,636 markers performant, and anonymous-first Firebase auth provides immediate access with optional Google sign-in."
                tech={['React Native', 'Expo', 'TypeScript', 'Zustand', 'Firebase', 'expo-location']}
                screenshot="/projects/warszapka/IMG_2823.jpeg"
                screenshotAlt="Warszapka map view with district markers"
                badge="Mobile"
              />
            </div>
          </div>
        </section>

        <ExperienceSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  )
}
