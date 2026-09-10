import { motion } from 'framer-motion'
import { Tile, TYPE_LABEL, isRecent } from '../lib/types'

interface Props {
  tile: Tile
  index: number
  onOpen: (t: Tile) => void
  onNavigate?: (path: string) => void
}

function StatLine({ text }: { text: string }) {
  const match = text.match(/^(\S+)\s+(.*)$/)
  if (!match) return <p className="text-[13px] text-textDim">{text}</p>
  return (
    <p className="text-[13.5px] text-textDim">
      <span className="font-display text-[22px] text-accent">{match[1]}</span>{' '}
      {match[2]}
    </p>
  )
}

export default function TileCard({ tile, index, onOpen, onNavigate }: Props) {
  const delay = 0.08 + Math.min(index, 10) * 0.06

  const isAbout = tile.type === 'about'
  const isStats = tile.type === 'stats'
  const isContact = tile.type === 'contact'

  function handleClick() {
    if (isAbout && onNavigate) {
      onNavigate('/about')
      return
    }
    onOpen(tile)
  }

  return (
    <motion.button
      onClick={handleClick}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.45, delay, ease: [0.2, 0.65, 0.3, 1] }}
      className="mb-5 block w-full break-inside-avoid rounded-[8px] border border-border bg-surface p-6 text-left shadow-[0_1px_2px_rgba(34,31,28,0.06)] transition-shadow duration-200 ease-out hover:shadow-[0_6px_18px_rgba(34,31,28,0.10)]"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-[11px] font-medium uppercase tracking-wide text-accent">
          {TYPE_LABEL[tile.type]}
        </span>
        {isRecent(tile) && !tile.is_constant && (
          <span className="text-[10px] font-medium uppercase tracking-wide text-textDim">New</span>
        )}
      </div>

      <p className="mt-4 font-display text-[24px] font-medium leading-[1.1] text-ink">
        {tile.name}
      </p>

      {isStats || isContact ? (
        <div className="mt-4 space-y-2">
          {(tile.description ?? '').split('\n').filter(Boolean).map((line, i) => (
            <StatLine key={i} text={line} />
          ))}
        </div>
      ) : (
        <p className="mt-2.5 text-[13.5px] leading-snug text-textDim">{tile.line}</p>
      )}

      {isAbout && (
        <span className="mt-4 inline-block border-b border-accent text-[12.5px] text-accent transition-colors duration-200 hover:text-ink">
          Read more →
        </span>
      )}
    </motion.button>
  )
}
