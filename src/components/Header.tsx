import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="flex flex-col items-start justify-between gap-8 border-b border-border px-[6vw] pb-9 pt-16 md:flex-row md:items-end">
      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display text-[13vw] font-medium leading-[0.94] text-text md:text-[64px]"
        >
          Riddhi Gupta
        </motion.h1>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="max-w-xs text-[14px] leading-relaxed text-textDim"
      >
        Architect by training, product and strategy by trade. An evolving
        record of what I'm building, writing, and working toward.
      </motion.p>
    </header>
  )
}
