import { motion } from 'framer-motion'
import { Tile, TYPE_LABEL } from '../lib/types'

interface Props {
  tile: Tile
  onOpen: (t: Tile) => void
}

export default function HeroTile({ tile, onOpen }: Props) {
  return (
    <motion.button
      onClick={() => onOpen(tile)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, ease: [0.2, 0.65, 0.3, 1] }}
      className="mb-5 block w-full rounded-[8px] border border-border bg-raised p-8 text-left shadow-[0_1px_2px_rgba(34,31,28,0.06)] transition-shadow duration-200 ease-out hover:shadow-[0_8px_22px_rgba(34,31,28,0.10)] md:p-10"
    >
      <span className="text-[11px] font-medium uppercase tracking-wide text-accent">
        {TYPE_LABEL[tile.type]}
      </span>
      <p className="mt-4 font-display text-[42px] font-medium leading-[1.05] text-ink md:text-[52px]">
        {tile.name}
      </p>
      <p className="mt-3 max-w-lg text-[14.5px] leading-relaxed text-textDim">{tile.line}</p>
    </motion.button>
  )
}
