import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'
import { TileType } from '../lib/types'

interface Props {
  onClose: () => void
}

export default function AddTileForm({ onClose }: Props) {
  const [name, setName] = useState('')
  const [type, setType] = useState<TileType>('project')
  const [line, setLine] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [importance, setImportance] = useState(3)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const { error } = await supabase.from('tiles').insert({
      name,
      type,
      line,
      description,
      url,
      importance,
      is_constant: false,
      published_at: new Date().toISOString(),
    })
    setBusy(false)
    if (error) {
      setError(error.message)
      return
    }
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
      <motion.form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.2, 0.9, 0.25, 1] }}
        className="max-h-[86vh] w-full max-w-lg overflow-y-auto rounded-md border border-border bg-surface p-9"
      >
        <div className="mb-2 flex items-start justify-between">
          <p className="font-display text-xl text-text">New entry</p>
          <button type="button" onClick={onClose} className="text-xl leading-none text-textDim hover:text-accent">
            &times;
          </button>
        </div>

        <label className="mb-1.5 mt-5 block text-[12px] text-textDim">Title</label>
        <input
          required
          maxLength={70}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-sm border border-border bg-ink px-3 py-2.5 text-[13.5px] text-text outline-none focus:border-accent"
        />

        <div className="mt-4 flex gap-4">
          <div className="flex-1">
            <label className="mb-1.5 block text-[12px] text-textDim">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as TileType)}
              className="w-full rounded-sm border border-border bg-ink px-3 py-2.5 text-[13.5px] text-text outline-none focus:border-accent"
            >
              <option value="project">Project</option>
              <option value="ai">AI project</option>
              <option value="post">Journal</option>
              <option value="brand">Brand</option>
              <option value="doc">Document</option>
              <option value="note">Currently</option>
            </select>
          </div>
          <div className="w-28">
            <label className="mb-1.5 block text-[12px] text-textDim">Importance</label>
            <input
              type="number"
              min={1}
              max={5}
              value={importance}
              onChange={(e) => setImportance(Number(e.target.value))}
              className="w-full rounded-sm border border-border bg-ink px-3 py-2.5 text-[13.5px] text-text outline-none focus:border-accent"
            />
          </div>
        </div>

        <label className="mb-1.5 mt-4 block text-[12px] text-textDim">One-liner</label>
        <input
          required
          maxLength={100}
          value={line}
          onChange={(e) => setLine(e.target.value)}
          className="w-full rounded-sm border border-border bg-ink px-3 py-2.5 text-[13.5px] text-text outline-none focus:border-accent"
        />

        <label className="mb-1.5 mt-4 block text-[12px] text-textDim">Full detail (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full rounded-sm border border-border bg-ink px-3 py-2.5 text-[13.5px] text-text outline-none focus:border-accent"
        />

        <label className="mb-1.5 mt-4 block text-[12px] text-textDim">Link (optional)</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://…"
          className="w-full rounded-sm border border-border bg-ink px-3 py-2.5 text-[13.5px] text-text outline-none focus:border-accent"
        />

        {error && <p className="mt-3 text-[12px] text-burgundy">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="mt-7 w-full rounded-sm bg-accent py-2.5 text-[13px] font-medium text-ink disabled:opacity-50"
        >
          {busy ? 'Publishing…' : 'Publish entry'}
        </button>
      </motion.form>
    </motion.div>
  )
}
