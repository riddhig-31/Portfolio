import { motion } from 'framer-motion'
import { Tile, TYPE_LABEL } from '../lib/types'

interface Props {
  tile: Tile
  onOpen: (t: Tile) => void
}

export default function HeroTile({ tile, onOpen }: Props) {
  return (
    <motion.button
      layoutId={`tile-${tile.id}`}
      onClick={() => onOpen(tile)}
      initial={{ rotate: -1.2 }}
      whileHover={{ rotate: 0, y: -6 }}
      transition={{ duration: 0.3, ease: [0.2, 0.9, 0.25, 1] }}
      className="mb-10 block w-full rounded-sm border-2 border-ink bg-accent p-8 text-left shadow-[10px_10px_0_rgba(0,0,0,0.55)] md:p-12"
    >
      <span className="inline-block rotate-1 border border-ink bg-ink px-3 py-1.5 text-[12px] font-semibold tracking-wide text-accent">
        {TYPE_LABEL[tile.type].toUpperCase()}
      </span>
      <p className="mt-6 font-display text-[56px] leading-[0.9] tracking-wide text-text md:text-[88px]">
        {tile.name}
      </p>
      <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/80">{tile.line}</p>
    </motion.button>
  )
}
