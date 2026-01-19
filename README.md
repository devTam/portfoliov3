# Portfolio Website

A highly animated, interactive portfolio website with a hacker/video game aesthetic, featuring a 3D interactive globe, AI assistant, and optimized performance.

## Tech Stack

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **Three.js** with React Three Fiber for 3D graphics
- **Framer Motion** & **GSAP** for animations
- **OpenAI API** for AI assistant

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Fill in your environment variables in `.env.local`

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
portfolio/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── lib/             # Utilities and helpers
│   ├── styles/          # Global styles
│   └── types/           # TypeScript types
├── public/              # Static assets
└── ...
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Development Phases

- ✅ **Phase 1**: Project Setup & Foundation
- ⏳ **Phase 2**: Landing Section
- ⏳ **Phase 3**: Globe Implementation
- ⏳ **Phase 4**: AI Assistant
- ⏳ **Phase 5**: CTA & Contact
- ⏳ **Phase 6**: Polish & Optimization
- ⏳ **Phase 7**: Testing & Deployment

## Design System

### Colors

- **Primary Background**: `#0a0a0a` (Deep black)
- **Accent Primary**: `#00ff41` (Matrix green)
- **Accent Secondary**: `#00d4ff` (Cyan blue)
- **Accent Tertiary**: `#ff0080` (Hot pink)

### Fonts

- **Monospace**: JetBrains Mono (for headings, code)
- **Sans-serif**: Inter (for body text)

## License

Private project - All rights reserved
