import { motion } from 'framer-motion'

interface Props {
  onBack: () => void
}

const PARAGRAPHS = [
  `So here's the plot twist nobody saw coming: I became an architect because I wanted to do something creative.`,
  `Turns out, real-world architecture is about as creative as Monica is messy. Somewhere between AutoCAD and existential crisis, I fell into tech instead — and it actually stuck.`,
  `I ended up as a Product Manager at Softtech Engineers, building tools for the construction industry — specifically a BIM-based building permit checker. Spent 3.5 years making sure buildings don't accidentally break the law before they're even built. Learned more about how the built world actually works than four years of architecture school ever taught me.`,
  `Somewhere in there, a new itch showed up: I wanted to build something, not manage someone else's product. So I did the sensible thing — spent two years applying to US b-schools, got in, got great admits.`,
  `And then I didn't go.`,
  `Instead I came to Master's Union, because I wanted the 'build something real' part now, not after two more years of theory. Two months in, I've already started a perfume brand — unOkhi — sold out twice. Still figuring it out. Having a great time doing it.`,
]

export default function AboutPage({ onBack }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-2xl px-[6vw] py-16"
    >
      <button
        onClick={onBack}
        className="text-[13px] text-textDim transition-colors duration-200 hover:text-accent"
      >
        ← Back
      </button>
      <p className="mt-8 text-[11px] font-medium uppercase tracking-wide text-accent">About</p>
      <h1 className="mt-3 font-display text-[40px] font-medium leading-[1.05] text-ink md:text-[52px]">
        Riddhi Gupta
      </h1>
      <div className="mt-8 space-y-5">
        {PARAGRAPHS.map((p, i) => (
          <p key={i} className="text-[15.5px] leading-relaxed text-ink/80">
            {p}
          </p>
        ))}
      </div>
    </motion.div>
  )
}
