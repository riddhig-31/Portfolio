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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-6 backdrop-blur-sm"
    >
      <motion.div
        layoutId={`tile-${tile.id}`}
        onClick={(e) => e.stopPropagation()}
        transition={{ duration: 0.32, ease: [0.2, 0.9, 0.25, 1] }}
        className="max-h-[82vh] w-full max-w-xl overflow-y-auto rounded-md border border-border bg-surface p-10"
      >
        <div className="mb-6 flex items-start justify-between">
          <span className="inline-block rounded-sm border border-border px-2.5 py-1 text-[10px] tracking-wide text-accent">
            {TYPE_LABEL[tile.type]}
          </span>
          <button onClick={onClose} className="text-xl leading-none text-textDim hover:text-accent">
            &times;
          </button>
        </div>
        <p className="font-display text-[32px] font-medium leading-tight text-text">{tile.name}</p>
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
            className="mt-7 inline-block border-b border-accent text-[13px] text-accent"
          >
            Open link →
          </a>
        )}
        {canEdit && !tile.is_constant && (
          <button
            onClick={remove}
            className="mt-8 block rounded-sm border border-burgundy px-4 py-2 text-[12px] text-burgundy hover:bg-burgundy/10"
          >
            Remove entry
          </button>
        )}
      </motion.div>
    </motion.div>
  )
}
