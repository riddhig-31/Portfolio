import { motion } from 'framer-motion'
import { Tile, TYPE_LABEL, TileSize, isRecent } from '../lib/types'

interface Props {
  tile: Tile
  size: TileSize
  onOpen: (t: Tile) => void
}

const SIZE_CLASS: Record<TileSize, string> = {
  hero: 'md:col-span-2 md:row-span-2',
  wide: 'md:col-span-2',
  tall: 'md:row-span-2',
  normal: '',
}

export default function TileCard({ tile, size, onOpen }: Props) {
  return (
    <motion.button
      layoutId={`tile-${tile.id}`}
      onClick={() => onOpen(tile)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.28, ease: [0.2, 0.9, 0.25, 1] }}
      className={`group relative flex min-h-[150px] flex-col justify-end overflow-hidden rounded-md border border-border bg-gradient-to-br from-raised to-surface p-6 text-left transition-colors hover:border-accent/70 ${SIZE_CLASS[size]}`}
    >
      {isRecent(tile) && (
        <span className="absolute right-5 top-5 text-[10px] tracking-wide text-accent">
          New
        </span>
      )}

      <span className="mb-auto inline-block w-fit rounded-sm border border-border px-2.5 py-1 text-[10px] tracking-wide text-accent">
        {TYPE_LABEL[tile.type]}
      </span>

      <div className="mt-5">
        <p
          className={`font-display font-medium leading-tight text-text ${
            size === 'hero' ? 'text-[30px] md:text-[38px]' : 'text-[19px] md:text-[22px]'
          }`}
        >
          {tile.name}
        </p>
        <p className="mt-2 max-h-0 overflow-hidden text-[13px] leading-snug text-textDim opacity-0 transition-all duration-300 ease-out group-hover:max-h-20 group-hover:opacity-100">
          {tile.line}
        </p>
      </div>
    </motion.button>
  )
}
