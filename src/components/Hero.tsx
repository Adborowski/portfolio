import { motion } from "framer-motion";
import { useIsMobile } from "../hooks/useIsMobile";
import KineticHeadline from "./KineticHeadline";
import HeroBackground from "./HeroBackground";
import { PROFILE } from "../data/cv";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const SKILLS = [
  "React",
  "TypeScript",
  "Next.js",
  "React Native",
  "Tailwind",
  "Vite",
  "Node.js",
  "Figma",
];

export default function Hero() {
  const isMobile = useIsMobile();

  return (
    <section
      style={{
        padding: isMobile ? "48px 0 64px" : "104px 0 112px",
        overflowX: "clip",
        position: "relative",
        background:
          "radial-gradient(60% 70% at 85% 0%, var(--accent-bg), transparent 70%)",
      }}
    >
      <HeroBackground />
      <div
        style={{
          position: "relative",
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        {/* Identity row */}
        <motion.div
          {...fadeUp(0)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: isMobile ? 28 : 40,
          }}
        >
          <img
            src="/profile-picture.jpg"
            alt="Adam Borowski"
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid var(--border)",
            }}
          />
          <div>
            <p
              style={{ color: "var(--text-h)", fontWeight: 600, fontSize: 15 }}
            >
              Adam Borowski
            </p>
            <p style={{ color: "var(--text)", fontSize: 14 }}>
              Frontend Developer · Warsaw
            </p>
          </div>
        </motion.div>

        {/* Statement: letters swell under the cursor (see KineticHeadline) */}
        <motion.div {...fadeUp(0.08)} style={{ marginBottom: 28 }}>
          <KineticHeadline
            text="Versatile frontend developer with agentic skills"
            accentWords={["agentic"]}
            style={{
              fontSize: isMobile
                ? "clamp(40px, 11vw, 52px)"
                : "clamp(56px, 6.4vw, 92px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              maxWidth: 1040,
            }}
          />
        </motion.div>

        <motion.p
          {...fadeUp(0.16)}
          style={{
            fontSize: isMobile ? 16 : 19,
            lineHeight: 1.65,
            color: "var(--text)",
            maxWidth: 560,
            marginBottom: 36,
          }}
        >
          4+ years building production React, TypeScript and Next.js apps across
          fintech and cybersecurity. Lately I ship full-stack projects end to end
          with AI-assisted workflows — four of them are below.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.24)}
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 40,
          }}
        >
          <a
            href="/#projects"
            className="btn btn-primary"
            style={{
              fontSize: 15,
              fontWeight: 500,
              padding: "11px 24px",
              borderRadius: 8,
              background: "var(--accent)",
              color: "var(--accent-contrast)",
            }}
          >
            See my work →
          </a>
          <a
            href="/cv"
            className="btn btn-ghost"
            style={{
              fontSize: 15,
              fontWeight: 500,
              padding: "11px 24px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              color: "var(--text-h)",
            }}
          >
            View CV
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
            style={{
              fontSize: 15,
              fontWeight: 500,
              padding: "11px 24px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              color: "var(--text-h)",
            }}
          >
            See GitHub ↗
          </a>
        </motion.div>

        <motion.p
          {...fadeUp(0.3)}
          style={{ fontSize: 14, color: "var(--text)", opacity: 0.75 }}
        >
          {SKILLS.join("  ·  ")}
        </motion.p>
      </div>
    </section>
  );
}
