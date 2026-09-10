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
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-6 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        transition={{ duration: 0.25 }}
        className="w-full max-w-sm rounded-[8px] border border-border bg-surface p-8 shadow-[0_20px_50px_rgba(34,31,28,0.18)]"
      >
        {sent ? (
          <>
            <p className="font-display text-2xl text-ink">Check your inbox</p>
            <p className="mt-3 text-[13px] leading-relaxed text-textDim">
              A sign-in link has been sent to {email}. Open it on this device to enter edit mode.
            </p>
          </>
        ) : (
          <form onSubmit={sendLink}>
            <p className="font-display text-2xl text-ink">Owner sign in</p>
            <p className="mt-2 text-[13px] text-textDim">
              Enter the email tied to this site's Supabase project.
            </p>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-5 w-full rounded-[6px] border border-border bg-paper px-3 py-2.5 text-[13px] text-ink outline-none focus:border-accent"
            />
            <button
              type="submit"
              disabled={busy}
              className="mt-4 w-full rounded-[6px] bg-accent py-2.5 text-[13px] font-medium text-paper disabled:opacity-50"
            >
              {busy ? 'Sending…' : 'Send magic link'}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}
