import { motion } from 'framer-motion'
import { Tile, TYPE_LABEL, isRecent, BlockTone, tiltForTile } from '../lib/types'

interface Props {
  tile: Tile
  index: number
  tone: BlockTone
  onOpen: (t: Tile) => void
}

const TONE_BG: Record<BlockTone, string> = {
  ink: 'bg-surface',
  accent: 'bg-accent',
  paper: 'bg-paper',
}
const TONE_TEXT: Record<BlockTone, string> = {
  ink: 'text-text',
  accent: 'text-text',
  paper: 'text-ink',
}
const TONE_SUBTEXT: Record<BlockTone, string> = {
  ink: 'text-textDim',
  accent: 'text-white/75',
  paper: 'text-ink/60',
}
const TONE_BADGE: Record<BlockTone, string> = {
  ink: 'border-accent text-accent',
  accent: 'border-ink bg-ink text-accent',
  paper: 'border-ink text-ink',
}

export default function TileCard({ tile, index, tone, onOpen }: Props) {
  const tilt = tiltForTile(tile.id, index)

  return (
    <motion.button
      layoutId={`tile-${tile.id}`}
      onClick={() => onOpen(tile)}
      initial={{ rotate: tilt }}
      whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.2, 0.9, 0.25, 1] }}
      className={`mb-6 block w-full break-inside-avoid rounded-sm border-2 border-ink/80 p-6 text-left shadow-[6px_6px_0_rgba(0,0,0,0.5)] ${TONE_BG[tone]}`}
      style={{ transformOrigin: 'center' }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-block -rotate-2 border px-2.5 py-1 text-[11px] font-semibold tracking-wide ${TONE_BADGE[tone]}`}
        >
          {TYPE_LABEL[tile.type].toUpperCase()}
        </span>
        {isRecent(tile) && (
          <span className={`text-[10px] font-semibold tracking-wide ${TONE_SUBTEXT[tone]}`}>NEW</span>
        )}
      </div>

      <p className={`mt-5 font-display text-[34px] leading-[0.92] tracking-wide ${TONE_TEXT[tone]}`}>
        {tile.name}
      </p>
      <p className={`mt-3 text-[13.5px] leading-snug ${TONE_SUBTEXT[tone]}`}>{tile.line}</p>
    </motion.button>
  )
}
