import Nav from './components/Nav'
import Hero from './components/Hero'
import ProjectShowcase from './components/ProjectShowcase'
import ExperienceSection from './components/ExperienceSection'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import { PROJECTS } from './data/projects'
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
              color: 'var(--accent-text)',
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}>
              Projects
            </p>
            <h2 style={{ fontSize: isMobile ? 34 : 44, marginBottom: 12 }}>Selected work</h2>
            <p style={{ color: 'var(--text)', fontSize: 15, marginBottom: 40, maxWidth: 560 }}>
              Four independent projects, each live and open source: civic data, electoral maps,
              a niche scientific tool and a site for a real business.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 24 : 32 }}>
              {PROJECTS.map((project, i) => (
                <ProjectShowcase key={project.slug} project={project} index={i} />
              ))}
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
