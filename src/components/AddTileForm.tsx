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
  const [file, setFile] = useState<File | null>(null)
  const [importance, setImportance] = useState(3)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')

    let finalUrl = url

    if (file) {
      const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const { error: uploadError } = await supabase.storage.from('tile-files').upload(path, file)
      if (uploadError) {
        setBusy(false)
        setError(uploadError.message)
        return
      }
      const { data } = supabase.storage.from('tile-files').getPublicUrl(path)
      finalUrl = data.publicUrl
    }

    const { error } = await supabase.from('tiles').insert({
      name,
      type,
      line,
      description,
      url: finalUrl,
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-6 backdrop-blur-sm"
    >
      <motion.form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.2, 0.9, 0.25, 1] }}
        className="max-h-[86vh] w-full max-w-lg overflow-y-auto rounded-[8px] border border-border bg-surface p-9 shadow-[0_20px_50px_rgba(34,31,28,0.18)]"
      >
        <div className="mb-2 flex items-start justify-between">
          <p className="font-display text-xl text-ink">New entry</p>
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
          className="w-full rounded-[6px] border border-border bg-paper px-3 py-2.5 text-[13.5px] text-ink outline-none focus:border-accent"
        />

        <div className="mt-4 flex gap-4">
          <div className="flex-1">
            <label className="mb-1.5 block text-[12px] text-textDim">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as TileType)}
              className="w-full rounded-[6px] border border-border bg-paper px-3 py-2.5 text-[13.5px] text-ink outline-none focus:border-accent"
            >
              <option value="project">Project</option>
              <option value="ai">AI project</option>
              <option value="post">Journal</option>
              <option value="brand">Brand</option>
              <option value="doc">Document</option>
              <option value="note">Currently</option>
              <option value="about">About</option>
              <option value="stats">Snapshot / stats</option>
              <option value="contact">Contact</option>
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
              className="w-full rounded-[6px] border border-border bg-paper px-3 py-2.5 text-[13.5px] text-ink outline-none focus:border-accent"
            />
          </div>
        </div>

        <label className="mb-1.5 mt-4 block text-[12px] text-textDim">One-liner</label>
        <input
          required
          maxLength={100}
          value={line}
          onChange={(e) => setLine(e.target.value)}
          className="w-full rounded-[6px] border border-border bg-paper px-3 py-2.5 text-[13.5px] text-ink outline-none focus:border-accent"
        />

        <label className="mb-1.5 mt-4 block text-[12px] text-textDim">Full detail (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full rounded-[6px] border border-border bg-paper px-3 py-2.5 text-[13.5px] text-ink outline-none focus:border-accent"
        />

        <label className="mb-1.5 mt-4 block text-[12px] text-textDim">Link (optional, skip if uploading a file)</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://…"
          className="w-full rounded-[6px] border border-border bg-paper px-3 py-2.5 text-[13.5px] text-ink outline-none focus:border-accent"
        />

        <label className="mb-1.5 mt-4 block text-[12px] text-textDim">Or upload a file (PPT, PDF, image…)</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="w-full rounded-[6px] border border-border bg-paper px-3 py-2.5 text-[13px] text-textDim outline-none focus:border-accent"
        />
        {file && <p className="mt-1.5 text-[11.5px] text-textDim">Selected: {file.name}</p>}

        {error && <p className="mt-3 text-[12px] text-burgundy">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="mt-7 w-full rounded-[6px] bg-accent py-2.5 text-[13px] font-medium text-paper disabled:opacity-50"
        >
          {busy ? (file ? 'Uploading…' : 'Publishing…') : 'Publish entry'}
        </button>
      </motion.form>
    </motion.div>
  )
}
