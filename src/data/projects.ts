export interface Screenshot {
  src: string
  alt: string
}

export interface Project {
  slug: string
  name: string
  tagline: string
  description: string
  /** One-line version for the PDF CV. */
  cvSummary: string
  highlight: { label: string; text: string }
  tech: string[]
  liveUrl: string
  githubUrl: string
  /** First entry is the hero shot; the rest are selectable thumbnails. */
  desktop: Screenshot[]
  mobile: Screenshot
  tint: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'sejmograf',
    name: 'Sejmograf.pl',
    tagline: 'Polish Parliament, in numbers',
    description:
      "Tracks the work of all 460 members of the Polish Sejm: attendance, party loyalty, speeches and parliamentary questions, plus a searchable archive of nearly 5,000 votes and a ranking of how quickly each ministry answers MPs. A daily GitHub Actions pipeline scrapes the official Sejm API, aggregates tens of megabytes of voting records and loads them into Firestore, so every chart stays up to date without anyone touching it.",
    cvSummary:
      "Full-stack Next.js app tracking all 460 Polish MPs: attendance, party loyalty, speeches and ~5,000 votes, fed by a daily GitHub Actions pipeline that scrapes the official Sejm API.",
    highlight: {
      label: 'Large data sets',
      text: 'Tens of thousands of individual votes condensed into rankings, trend charts and per-MP profiles that load fast and read at a glance.',
    },
    tech: ['Next.js', 'TypeScript', 'Firebase', 'Recharts', 'Tailwind v4', 'GitHub Actions', 'Resend'],
    liveUrl: 'https://www.sejmograf.pl',
    githubUrl: 'https://github.com/Adborowski/sejmograf2',
    desktop: [
      { src: '/projects/sejmograf/desktop-home.jpg', alt: 'Sejmograf home page with headline stats and attendance ranking' },
      { src: '/projects/sejmograf/desktop-mp-profile.jpg', alt: 'MP profile with per-sitting attendance chart' },
      { src: '/projects/sejmograf/desktop-ministries.jpg', alt: 'Ranking of ministries by response time to parliamentary questions' },
    ],
    mobile: { src: '/projects/sejmograf/mobile-home.jpg', alt: 'Sejmograf home page on mobile' },
    tint: 'rgba(225, 29, 72, 0.08)',
  },
  {
    slug: 'voter-trip',
    name: 'Wycieczka Wyborcza',
    tagline: 'Election trip planner',
    description:
      "Built for Poland's 2023 parliamentary election. Seats are spread unevenly across the 41 electoral districts, so a vote in Elbląg can weigh far more than one in Warsaw. You pick your city, and the app plans a trip to the nearby district where your vote is most likely to swing a seat. It's built on district data scraped from the National Electoral Commission (PKW), a precomputed driving-distance matrix between cities, and seat-swing calculations based on polling.",
    cvSummary:
      "Google Maps trip planner for the 2023 Polish election: scraped electoral data and seat-swing maths route voters to where their vote counts most.",
    highlight: {
      label: 'Maps & scraping',
      text: 'Electoral data scraped from government sources, joined with routing data, and rendered as an interactive Google Maps trip.',
    },
    tech: ['Next.js', 'TypeScript', 'Google Maps API', 'Sass', 'Web scraping'],
    liveUrl: 'https://voter-trip-git-main-adborowskis-projects.vercel.app',
    githubUrl: 'https://github.com/Adborowski/voter-trip',
    desktop: [
      { src: '/projects/voter-trip/desktop-map.jpg', alt: 'Planned trip from Warsaw to Lublin on a Google map, with seat-swing details' },
      { src: '/projects/voter-trip/desktop-landing.jpg', alt: 'Landing page with a map of Polish electoral districts' },
    ],
    mobile: { src: '/projects/voter-trip/mobile-landing.jpg', alt: 'Wycieczka Wyborcza landing page on mobile' },
    tint: 'rgba(22, 128, 74, 0.08)',
  },
  {
    slug: 'broncalc',
    name: 'BronCalc',
    tagline: 'Glaze slurry calculator for potters',
    description:
      "A tool for a niche few developers ever look at: ceramic glaze chemistry. Potters weigh a known volume of glaze slurry, and BronCalc uses Brongniart's formula to work out how much powder and water it holds and exactly how much to add to hit a target specific gravity. It can import recipes from Glazy.org through a proxy, computes the powder's density from a curated materials dataset, and prints a studio-ready A4 plan or a laminated bucket label with a QR code.",
    cvSummary:
      "Glaze slurry calculator for potters built on Brongniart's formula, with Glazy.org recipe import, a curated materials dataset, unit-tested maths and printable studio plans.",
    highlight: {
      label: 'Domain deep dive',
      text: 'Learned the ceramics maths from the ground up and turned it into a tool working potters can trust, backed by unit-tested formulas.',
    },
    tech: ['React', 'TypeScript', 'Vite', 'Vitest', 'Vercel rewrites'],
    liveUrl: 'https://broncalc.vercel.app',
    githubUrl: 'https://github.com/Adborowski/broncalc',
    desktop: [
      { src: '/projects/broncalc/desktop-advanced.jpg', alt: 'BronCalc in Advanced mode with an imported Glazy recipe' },
    ],
    mobile: { src: '/projects/broncalc/mobile-advanced.jpg', alt: 'BronCalc on mobile' },
    tint: 'rgba(180, 83, 9, 0.08)',
  },
  {
    slug: 'central-rental',
    name: 'Central Rental',
    tagline: 'Website for an apartment rental business',
    description:
      'A full redesign and rebuild for a small apartment rental business in Białystok (8 apartments, rated 4.93 by Airbnb guests). I worked with the owner directly and handled everything myself: requirements, design, build and deployment. The site has trilingual content (PL/EN/RU), an apartment catalogue with galleries, an OpenStreetMap location map and a direct booking engine integration.',
    cvSummary:
      "Solo, end-to-end rebuild of an apartment rental business's website: trilingual (PL/EN/RU), apartment catalogue, OpenStreetMap locations and booking engine integration.",
    highlight: {
      label: 'Solo, end to end',
      text: 'One developer, one client: from first conversation to a deployed, multilingual site with real booking integration.',
    },
    tech: ['Next.js', 'TypeScript', 'next-intl', 'Leaflet', 'Tailwind v4'],
    liveUrl: 'https://central-rental-redo.vercel.app/en',
    githubUrl: 'https://github.com/Adborowski/central-rental-redo',
    desktop: [
      { src: '/projects/central-rental/desktop-home.jpg', alt: 'Central Rental home page hero' },
      { src: '/projects/central-rental/desktop-apartments.jpg', alt: 'Apartment catalogue with Booking.com and Airbnb ratings' },
    ],
    mobile: { src: '/projects/central-rental/mobile-home.jpg', alt: 'Central Rental home page on mobile' },
    tint: 'rgba(21, 94, 52, 0.08)',
  },
]
