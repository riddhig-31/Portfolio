import { motion } from 'framer-motion'

interface Props {
  onClose: () => void
}

export default function MeetModal({ onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-6 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        transition={{ duration: 0.25 }}
        className="max-h-[82vh] w-full max-w-md overflow-y-auto rounded-[8px] border border-border bg-surface p-9 shadow-[0_20px_50px_rgba(34,31,28,0.18)]"
      >
        <div className="mb-4 flex items-start justify-between">
          <span className="text-[11px] font-medium uppercase tracking-wide text-accent">
            Let's meet
          </span>
          <button onClick={onClose} className="text-xl leading-none text-textDim hover:text-accent">
            &times;
          </button>
        </div>
        <p className="font-display text-[28px] font-medium text-ink">Placeholder</p>
        <p className="mt-4 text-[14px] leading-relaxed text-textDim">
          Drop your real scheduling link, email, or Calendly embed here once
          it's ready. For now this is a stand-in.
        </p>
      </motion.div>
    </motion.div>
  )
}
