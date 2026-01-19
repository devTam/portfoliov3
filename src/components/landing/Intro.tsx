'use client'

import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver'

const stats = [
  { label: 'Years of Experience', value: '5+' },
  { label: 'Companies Worked', value: '7+' },
  { label: 'Projects Delivered', value: '50+' },
  { label: 'Technologies', value: '20+' },
]

const techStack = [
  'React',
  'TypeScript',
  'Node.js',
  'Next.js',
  'Express',
  'MongoDB',
  'PostgreSQL',
  'AWS',
  'Docker',
  'GraphQL',
  'Redux',
  'Web3',
]

export default function Intro() {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section
      id="intro"
      ref={elementRef as React.RefObject<HTMLElement>}
      className="py-20 md:py-32 bg-bg-secondary relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto"
        >
          {/* Bio Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-mono mb-6 text-accent-primary text-glow-green">
              About Me
            </h2>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-sans mb-4">
              An analytical, results-driven and collaborative software developer with
              experience providing strategic support and guidance at all levels of the
              software development lifecycle.
            </p>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-sans">
              With 5+ years of experience as a Senior Software Engineer, I specialize in
              Full-Stack JavaScript applications, Front-End (React & Web3), Back-End
              (NodeJS), and relational and non-relational databases. I'm passionate about
              building scalable solutions and leading teams toward innovative solutions.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold font-mono mb-8 text-text-primary">
              By The Numbers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    hasIntersected
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="bg-bg-tertiary p-6 rounded-lg border border-accent-primary/20 hover:border-accent-primary/50 transition-all duration-300 hover:box-glow-green"
                >
                  <div className="text-3xl md:text-4xl font-bold font-mono text-accent-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-text-secondary font-sans">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl md:text-3xl font-bold font-mono mb-8 text-text-primary">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    hasIntersected
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0 }
                  }
                  transition={{
                    delay: index * 0.05 + 0.8,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 bg-bg-tertiary border border-accent-secondary/30 rounded-full text-text-secondary font-mono text-sm md:text-base hover:border-accent-secondary hover:text-accent-secondary hover:box-glow-cyan transition-all duration-300 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
