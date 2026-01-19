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
    name: 'Tech-Enabled Table Tennis Facility',
    role: 'Founder – CTO',
    location: {
      city: 'Remote',
      country: 'Global',
      countryCode: 'XX',
      coordinates: { lat: 0, lng: 0 }, // Update with actual location
    },
    period: { start: '2025-03', end: 'Present' },
    impact: [
      'Architected full-stack membership platform, onboarding 70+ members',
      'Built QR code check-in system, reducing operational overhead by 80%',
      'Achieved 99.5% payment success rate with automated billing',
      'Designed real-time reservation system with 95% booking accuracy',
    ],
    type: 'onsite',
    technologies: ['React', 'Node.js', 'TypeScript', 'Payment Processing'],
  },
  {
    id: 'washington-capital',
    name: 'Washington Capital Partners',
    role: 'Senior Software Engineer – Full Stack Developer',
    location: {
      city: 'Remote',
      country: 'United States',
      countryCode: 'US',
      coordinates: { lat: 38.9072, lng: -77.0369 }, // Washington DC
    },
    period: { start: '2022-05', end: 'Present' },
    impact: [
      'Developed financial calculation engines, reducing errors by 99%',
      'Led loan servicing platform with complex payment workflows',
      'Pioneered JavaScript solutions in Bubble.io no-code environment',
    ],
    type: 'remote',
    technologies: ['React', 'Express', 'AWS', 'Bubble.io', 'JavaScript'],
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
      'Transitioned codebase from JavaScript to TypeScript',
      'Migrated from ReduxThunk/Sagas to RTK Query',
    ],
    type: 'onsite',
    technologies: ['React', 'TypeScript', 'Redux', 'RTK Query'],
  },
  {
    id: 'dominium',
    name: 'Dominium',
    role: 'React Web3 Engineer (Contract)',
    location: {
      city: 'Seattle',
      country: 'United States',
      countryCode: 'US',
      coordinates: { lat: 47.6062, lng: -122.3321 },
    },
    period: { start: '2022-01', end: '2022-03' },
    impact: [
      'Developed client-facing applications for financial startup',
      'Connected front-end to smart contracts',
      'Improved UI/UX for ICO and staking features',
    ],
    type: 'onsite',
    technologies: ['React', 'Web3', 'Smart Contracts', 'Blockchain'],
  },
  {
    id: 'neu',
    name: 'Neu',
    role: 'Software Engineer',
    location: {
      city: 'Seattle',
      country: 'United States',
      countryCode: 'US',
      coordinates: { lat: 47.6062, lng: -122.3321 },
    },
    period: { start: '2021-02', end: '2021-12' },
    impact: [
      'Improved UI/UX, leading to 20% increase in users',
      'Refactored legacy code to modern architecture',
      'Led major process improvements',
    ],
    type: 'onsite',
    technologies: ['React', 'JavaScript', 'UI/UX'],
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
    technologies: ['React', 'UI/UX', 'Frontend'],
  },
  {
    id: 'google-africa',
    name: 'Google Africa Development Scholarship',
    role: 'Mobile Web Specialist',
    location: {
      city: 'Remote',
      country: 'Africa',
      countryCode: 'AF',
      coordinates: { lat: 8.7832, lng: 34.5085 }, // Central Africa
    },
    period: { start: '2020-05', end: '2020-11' },
    impact: [
      'Built fully responsive Progressive Weather Web App',
      'Deployed app to Firebase',
      'Improved performance and accessibility',
    ],
    type: 'remote',
    technologies: ['PWA', 'Firebase', 'Mobile Web'],
  },
]
