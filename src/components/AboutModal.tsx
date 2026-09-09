import { motion } from 'framer-motion'

interface Props {
  onClose: () => void
}

export default function AboutModal({ onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-6 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 10, rotate: 1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        onClick={(e) => e.stopPropagation()}
        transition={{ duration: 0.25 }}
        className="max-h-[82vh] w-full max-w-lg overflow-y-auto border-2 border-ink bg-paper p-9 text-ink shadow-[8px_8px_0_rgba(225,27,34,0.9)]"
      >
        <div className="mb-4 flex items-start justify-between">
          <span className="inline-block -rotate-2 border border-ink bg-ink px-3 py-1 text-[11px] font-semibold tracking-wide text-accent">
            ABOUT ME
          </span>
          <button onClick={onClose} className="text-xl leading-none text-ink/60 hover:text-accent">
            &times;
          </button>
        </div>
        <p className="font-display text-[38px] leading-[0.9] tracking-wide">Placeholder bio</p>
        <p className="mt-4 text-[14px] leading-relaxed text-ink/70">
          This is dummy about-me copy — swap it out for your real story whenever
          you're ready. A few lines on who you are, what you're building toward,
          and why this site exists usually does the job.
        </p>
      </motion.div>
    </motion.div>
  )
}
