'use client'

import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver'

interface Skill {
  name: string
  category: string
  level: number // 0-100
  icon?: string
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'Frontend', level: 95 },
  { name: 'TypeScript', category: 'Frontend', level: 90 },
  { name: 'Next.js', category: 'Frontend', level: 88 },
  { name: 'HTML5/CSS3', category: 'Frontend', level: 92 },
  { name: 'Redux', category: 'Frontend', level: 85 },
  { name: 'Web3', category: 'Frontend', level: 80 },
  
  // Backend
  { name: 'Node.js', category: 'Backend', level: 90 },
  { name: 'Express.js', category: 'Backend', level: 88 },
  { name: 'NestJS', category: 'Backend', level: 75 },
  { name: 'GraphQL', category: 'Backend', level: 80 },
  { name: 'RESTful APIs', category: 'Backend', level: 92 },
  
  // Databases
  { name: 'MongoDB', category: 'Database', level: 85 },
  { name: 'PostgreSQL', category: 'Database', level: 80 },
  { name: 'SQL', category: 'Database', level: 85 },
  
  // DevOps & Cloud
  { name: 'AWS', category: 'DevOps', level: 75 },
  { name: 'Docker', category: 'DevOps', level: 70 },
  { name: 'CI/CD', category: 'DevOps', level: 80 },
  { name: 'Git', category: 'DevOps', level: 95 },
  { name: 'Firebase', category: 'DevOps', level: 75 },
  
  // Testing
  { name: 'Jest', category: 'Testing', level: 85 },
  { name: 'E2E Testing', category: 'Testing', level: 80 },
  { name: 'TDD', category: 'Testing', level: 75 },
]

const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Testing']

export default function Skills() {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  const getSkillsByCategory = (category: string) => {
    return skills.filter((skill) => skill.category === category)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
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
      id="skills"
      ref={elementRef as React.RefObject<HTMLElement>}
      className="py-20 md:py-32 bg-bg-primary relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent-tertiary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4 text-accent-primary text-glow-green">
            Skills & Expertise
          </h2>
          <p className="text-lg md:text-xl text-text-secondary font-sans max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {categories.map((category) => {
            const categorySkills = getSkillsByCategory(category)
            return (
              <motion.div
                key={category}
                variants={categoryVariants}
                className="bg-bg-secondary rounded-lg p-6 md:p-8 border border-accent-primary/10 hover:border-accent-primary/30 transition-all duration-300"
              >
                <h3 className="text-2xl md:text-3xl font-bold font-mono mb-6 text-accent-secondary">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorySkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        hasIntersected
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0, x: -20 }
                      }
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-bg-tertiary p-4 rounded border border-accent-primary/10 hover:border-accent-primary/50 transition-all duration-300"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-mono text-text-primary font-medium">
                          {skill.name}
                        </span>
                        <span className="text-sm font-mono text-accent-primary">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-bg-secondary rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={
                            hasIntersected ? { width: `${skill.level}%` } : { width: 0 }
                          }
                          transition={{
                            delay: index * 0.05 + 0.3,
                            duration: 0.8,
                            ease: 'easeOut',
                          }}
                          className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full relative"
                        >
                          <motion.div
                            animate={{
                              boxShadow: [
                                '0 0 5px rgba(0, 255, 65, 0.5)',
                                '0 0 10px rgba(0, 255, 65, 0.8)',
                                '0 0 5px rgba(0, 255, 65, 0.5)',
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                            className="absolute inset-0"
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
