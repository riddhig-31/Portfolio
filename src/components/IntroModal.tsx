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
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/50 p-6 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.2, 0.65, 0.3, 1] }}
        className="w-full max-w-md rounded-[8px] border border-border bg-surface p-9 shadow-[0_20px_50px_rgba(34,31,28,0.18)]"
      >
        <span className="text-[11px] font-medium uppercase tracking-wide text-accent">
          Now showing
        </span>
        <p className="mt-4 font-display text-[34px] font-medium leading-tight text-ink">
          Hi, I'm Riddhi.
        </p>
        <p className="mt-4 text-[14px] leading-relaxed text-textDim">
          This is a placeholder introduction — replace this with your real one whenever
          you're ready. For now: architect turned product person, currently building
          things worth putting on a wall. Have a look around.
        </p>
        <button
          onClick={onClose}
          className="mt-7 rounded-[6px] bg-accent px-6 py-2.5 text-[13px] font-medium text-paper transition-transform duration-200 hover:-translate-y-0.5"
        >
          Enter
        </button>
      </motion.div>
    </motion.div>
  )
}
