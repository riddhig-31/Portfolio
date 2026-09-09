import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'

interface Props {
  session: boolean
  onAdd: () => void
}

export default function AuthBar({ session, onAdd }: Props) {
  const [open, setOpen] = useState(false)
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

  if (session) {
    return (
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        <button
          onClick={onAdd}
          className="rounded-sm bg-accent px-5 py-3 text-[13px] font-medium text-ink transition-transform hover:-translate-y-0.5"
        >
          + New entry
        </button>
        <button
          onClick={() => supabase.auth.signOut()}
          className="text-[11px] text-textDim underline decoration-border underline-offset-4 hover:text-text"
        >
          Sign out
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={() => setOpen(true)}
        className="text-[11px] text-textDim underline decoration-border underline-offset-4 hover:text-accent"
      >
        Owner sign in
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.2, 0.9, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-md border border-border bg-surface p-8"
            >
              {sent ? (
                <>
                  <p className="font-display text-xl text-text">Check your inbox</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-textDim">
                    A sign-in link has been sent to {email}. Open it on this device to enter edit mode.
                  </p>
                </>
              ) : (
                <form onSubmit={sendLink}>
                  <p className="font-display text-xl text-text">Owner sign in</p>
                  <p className="mt-2 text-[13px] text-textDim">
                    Enter the email tied to this site's Supabase project.
                  </p>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-5 w-full rounded-sm border border-border bg-ink px-3 py-2.5 text-[13px] text-text outline-none focus:border-accent"
                  />
                  <button
                    type="submit"
                    disabled={busy}
                    className="mt-4 w-full rounded-sm bg-accent py-2.5 text-[13px] font-medium text-ink disabled:opacity-50"
                  >
                    {busy ? 'Sending…' : 'Send magic link'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
