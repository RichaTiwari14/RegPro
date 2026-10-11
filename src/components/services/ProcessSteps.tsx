import { motion } from 'motion/react';

/** Numbered steps joined by a gold line that draws in as the row scrolls into view. */
export function ProcessSteps({ steps, light = false }: { steps: { title: string; text: string }[]; light?: boolean }) {
  return (
    <motion.ol
      className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.14 } } }}
    >
      <motion.span
        className={`absolute left-6 right-[12%] top-6 hidden h-px origin-left lg:block ${light ? 'bg-sage-300/60' : 'bg-sage-400'}`}
        variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1, transition: { duration: 1.4, ease: [0.65, 0, 0.35, 1] } } }}
        aria-hidden="true"
      />
      {steps.map((s, i) => (
        <motion.li
          key={s.title}
          className="relative"
          variants={{ hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
        >
          <span
            className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border font-display text-lg ${
              light ? 'border-sage-300/60 bg-forest-900 text-sage-300' : 'border-sage-400 bg-ivory text-forest-600'
            }`}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className={`mt-5 font-display text-xl ${light ? 'text-white' : 'text-forest-800'}`}>{s.title}</h3>
          <p className={`mt-2 text-sm leading-relaxed ${light ? 'text-white/65' : 'text-muted'}`}>{s.text}</p>
        </motion.li>
      ))}
    </motion.ol>
  );
}
