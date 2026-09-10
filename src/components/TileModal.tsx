import { motion } from 'framer-motion'
import { Tile, TYPE_LABEL } from '../lib/types'
import { supabase } from '../lib/supabaseClient'

interface Props {
  tile: Tile
  canEdit: boolean
  onClose: () => void
}

export default function TileModal({ tile, canEdit, onClose }: Props) {
  async function remove() {
    if (!confirm(`Remove "${tile.name}"?`)) return
    await supabase.from('tiles').delete().eq('id', tile.id)
    onClose()
  }

  const isDoc = tile.type === 'doc'

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
        exit={{ opacity: 0, y: 6, scale: 0.98 }}
        onClick={(e) => e.stopPropagation()}
        transition={{ duration: 0.25, ease: [0.2, 0.65, 0.3, 1] }}
        className="max-h-[82vh] w-full max-w-xl overflow-y-auto rounded-[8px] border border-border bg-surface p-10 shadow-[0_20px_50px_rgba(34,31,28,0.18)]"
      >
        <div className="mb-6 flex items-start justify-between">
          <span className="text-[11px] font-medium uppercase tracking-wide text-accent">
            {TYPE_LABEL[tile.type]}
          </span>
          <button onClick={onClose} className="text-xl leading-none text-textDim hover:text-accent">
            &times;
          </button>
        </div>
        <p className="font-display text-[32px] font-medium leading-tight text-ink">{tile.name}</p>
        <p className="mt-3 font-display text-[15px] italic text-accent">{tile.line}</p>
        {tile.description && (
          <p className="mt-6 whitespace-pre-wrap text-[14.5px] leading-relaxed text-textDim">
            {tile.description}
          </p>
        )}
        {tile.url && (
          <a
            href={tile.url}
            target="_blank"
            rel="noopener noreferrer"
            download={isDoc}
            className="mt-7 inline-block border-b border-accent text-[13px] text-accent transition-colors duration-200 hover:text-ink"
          >
            {isDoc ? 'Download resume →' : 'Open link →'}
          </a>
        )}
        {canEdit && !tile.is_constant && (
          <button
            onClick={remove}
            className="mt-8 block rounded-[6px] border border-burgundy px-4 py-2 text-[12px] text-burgundy hover:bg-burgundy/10"
          >
            Remove entry
          </button>
        )}
      </motion.div>
    </motion.div>
  )
}
