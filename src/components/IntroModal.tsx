import { motion } from 'framer-motion'

interface Props {
  onClose: () => void
}

export default function IntroModal({ onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-6 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 16, rotate: -1.5, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, rotate: -1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.2, 0.9, 0.25, 1] }}
        className="w-full max-w-md border-2 border-ink bg-paper p-9 text-ink shadow-[10px_10px_0_rgba(225,27,34,0.9)]"
      >
        <span className="inline-block -rotate-2 border border-ink bg-ink px-3 py-1 text-[11px] font-semibold tracking-wide text-accent">
          NOW SHOWING
        </span>
        <p className="mt-5 font-display text-[46px] leading-[0.9] tracking-wide">
          Hi, I'm Riddhi.
        </p>
        <p className="mt-4 text-[14px] leading-relaxed text-ink/70">
          This is a placeholder introduction — replace this with your real one whenever
          you're ready. For now: architect turned product person, currently building
          things worth putting on a wall. Have a look around.
        </p>
        <button
          onClick={onClose}
          className="mt-7 border-2 border-ink bg-accent px-6 py-2.5 text-[13px] font-semibold tracking-wide text-text transition-transform hover:-translate-y-0.5"
        >
          ENTER
        </button>
      </motion.div>
    </motion.div>
  )
}
