import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'

interface Props {
  onClose: () => void
}

export default function LoginModal({ onClose }: Props) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  async function sendLink(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    await supabase.auth.signInWithOtp({ email })
    setBusy(false)
    setSent(true)
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
        initial={{ opacity: 0, y: 12, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        onClick={(e) => e.stopPropagation()}
        transition={{ duration: 0.25 }}
        className="w-full max-w-sm border-2 border-ink bg-surface p-8 shadow-[8px_8px_0_rgba(225,27,34,0.9)]"
      >
        {sent ? (
          <>
            <p className="font-display text-3xl tracking-wide text-text">Check your inbox</p>
            <p className="mt-3 text-[13px] leading-relaxed text-textDim">
              A sign-in link has been sent to {email}. Open it on this device to enter edit mode.
            </p>
          </>
        ) : (
          <form onSubmit={sendLink}>
            <p className="font-display text-3xl tracking-wide text-text">Owner sign in</p>
            <p className="mt-2 text-[13px] text-textDim">
              Enter the email tied to this site's Supabase project.
            </p>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-5 w-full border border-border bg-ink px-3 py-2.5 text-[13px] text-text outline-none focus:border-accent"
            />
            <button
              type="submit"
              disabled={busy}
              className="mt-4 w-full border-2 border-ink bg-accent py-2.5 text-[13px] font-semibold tracking-wide text-text disabled:opacity-50"
            >
              {busy ? 'SENDING…' : 'SEND MAGIC LINK'}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}
