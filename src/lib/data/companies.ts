export interface Company {
  id: string
  name: string
  role: string
  location: {
    city: string
    country: string
    countryCode: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  period: {
    start: string // "YYYY-MM"
    end: string | 'Present'
  }
  impact: string[]
  type: 'remote' | 'onsite'
  technologies: string[]
}

export const companies: Company[] = [
  {
    id: 'tech-enabled-tt',
    name: 'Spin and Drive Tennis Gym',
    role: 'Founder – CTO',
    location: {
      city: 'Port Harcourt',
      country: 'Nigeria',
      countryCode: 'NG',
      coordinates: { lat: 4.8070, lng: 7.0311 },
    },
    period: { start: '2025-03', end: 'Present' },
    impact: [
      'Architected full-stack membership platform, onboarding 100+ members',
      'Built QR code check-in system, reducing operational overhead by 80%',
      'Achieved 99.5% payment success rate with automated billing',
      'Designed real-time reservation system with 95% booking accuracy',
    ],
    type: 'onsite',
    technologies: ['React', 'Nest.js', 'Prisma', 'PostgreSQL', 'TypeScript', 'Paystack'],
  },
  {
    id: 'yester',
    name: 'Yester DIY',
    role: 'Freelance Developer',
    location: {
      city: 'Washington',
      country: 'United States',
      countryCode: 'US',
      coordinates: { lat: 47.6062, lng: -122.3321 },
    },
    period: { start: '2025-11', end: 'Present' },
    impact: [
      'Architected a high-performance MVP for a DIY marketplace, enabling seamless matching between users and professionals with 95% accuracy',
      'Engineered a smart ranking engine utilizing availability and review data, increasing successful matches by 40% within the first month',
      'Implemented a secure end-to-end payment system and real-time chat infrastructure, reducing booking friction by 30%',
      'Integrated automated SMS notification systems, ensuring 99.9% delivery rate for mission-critical service updates',
    ],
    type: 'remote',
    technologies: ['Bubble.io', 'TypeScript', 'Twilio', 'Stripe', 'AWS'],
  },
  {
    id: 'skiapp',
    name: 'LetsSkiapp',
    role: 'Freelance Developer',
    location: {
      city: 'Remote',
      country: 'Germany',
      countryCode: 'DE',
      coordinates: { lat: 52.5200, lng: 13.4050 },
    },
    period: { start: '2025-08', end: '2025-10' },
    impact: [
      'Engineered a resilient offline-first architecture within a no-code ecosystem using IndexedDB and Custom Service Workers',
      'Ensured 100% application accessibility for users in subterranean/zero-connectivity environments (basements/remote zones)',
      'Implemented custom data-sync protocols, reducing data loss incidents to 0% during transition between connectivity states',
      'Synthesized high-performance storage solutions, enabling 65% faster application reloads via intelligent local caching',
    ],
    type: 'remote',
    technologies: ['Bubble.io', 'Xano', 'IndexedDB', 'Service Workers', 'TypeScript'],
  },
  {
    id: 'proveo',
    name: 'Proveo Automations',
    role: 'Senior Software Engineer – Full Stack Developer',
    location: {
      city: 'Remote',
      country: 'United States',
      countryCode: 'US',
      coordinates: { lat: 38.9072, lng: -77.0369 },
    },
    period: { start: '2022-05', end: '2025-08' },
    impact: [
      'Developed financial calculation engines, reducing errors by 99%',
      'Led loan servicing platform with complex payment workflows',
      'Pioneered JavaScript solutions in Bubble.io no-code environment',
    ],
    type: 'remote',
    technologies: ['React', 'Express', 'AWS', 'Bubble.io', 'JavaScript', 'Xano'],
  },
  {
    id: 'conversional',
    name: 'Conversional GmbH',
    role: 'Senior Front-End Engineer',
    location: {
      city: 'Stuttgart',
      country: 'Germany',
      countryCode: 'DE',
      coordinates: { lat: 48.7758, lng: 9.1829 },
    },
    period: { start: '2022-02', end: '2023-08' },
    impact: [
      'Led front-end development for SaaS startup growth',
      'Transitioned codebase from JavaScript to TypeScript increasing code maintainability',
      'Migrated from ReduxThunk/Sagas to RTK Query increasing performance by 20%',
    ],
    type: 'remote',
    technologies: ['React', 'TypeScript', 'Redux', 'RTK Query', 'Webpack'],
  },
  {
    id: 'dominium',
    name: 'Dominium',
    role: 'React Web3 Engineer (Contract)',
    location: {
      city: 'Seattle',
      country: 'United States',
      countryCode: 'US',
      coordinates: { lat: 47.65, lng: -122.40 },
    },
    period: { start: '2022-01', end: '2022-03' },
    impact: [
      'Developed client-facing applications for financial startup',
      'Connected front-end to smart contracts',
      'Improved UI/UX for ICO and staking features',
    ],
    type: 'remote',
    technologies: ['React', 'Web3', 'Smart Contracts', 'Blockchain', 'ethers.js'],
  },
  {
    id: 'neu',
    name: 'Neu',
    role: 'Software Engineer',
    location: {
      city: 'Seattle',
      country: 'United States',
      countryCode: 'US',
      coordinates: { lat: 47.55, lng: -122.25 },
    },
    period: { start: '2021-02', end: '2021-12' },
    impact: [
      'Improved UI/UX, leading to 20% increase in users',
      'Refactored legacy code to modern architecture',
      'Led major process improvements',
    ],
    type: 'remote',
    technologies: ['React', 'JavaScript', 'UI/UX', 'Node.js', 'Express', 'PostgreSQL'],
  },
  {
    id: 'olla-systems',
    name: 'Olla Systems',
    role: 'UI Engineer',
    location: {
      city: 'Lagos',
      country: 'Nigeria',
      countryCode: 'NG',
      coordinates: { lat: 6.5244, lng: 3.3792 },
    },
    period: { start: '2020-08', end: '2020-12' },
    impact: [
      "Redesigned all pages of company's digital solution",
      'Refactored code to improve functionality',
      'Developed authentication and vendor pages',
    ],
    type: 'onsite',
    technologies: ['HTML', 'CSS', 'JavaScript', 'UI/UX', 'Frontend'],
  }
]
