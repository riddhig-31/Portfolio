import { motion } from 'framer-motion'

interface Props {
  session: boolean
  onLogin: () => void
  onLogout: () => void
  onAbout: () => void
  onMeet: () => void
  onHome: () => void
}

export default function NavBar({ session, onLogin, onLogout, onAbout, onMeet, onHome }: Props) {
  return (
    <header className="flex items-center justify-between border-b border-border px-[6vw] py-6">
      <div className="overflow-hidden">
        <motion.button
          onClick={onHome}
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[26px] font-medium tracking-tight text-ink"
        >
          Riddhi Gupta
        </motion.button>
      </div>
      <nav className="flex items-center gap-7 text-[13px] font-medium">
        <button
          onClick={onAbout}
          className="text-textDim transition-colors duration-200 hover:text-accent"
        >
          About me
        </button>
        <button
          onClick={onMeet}
          className="text-textDim transition-colors duration-200 hover:text-accent"
        >
          Let's meet
        </button>
        {session ? (
          <button
            onClick={onLogout}
            className="rounded-[6px] border border-accent px-4 py-2 text-accent transition-colors duration-200 hover:bg-accent hover:text-paper"
          >
            Sign out
          </button>
        ) : (
          <button
            onClick={onLogin}
            className="rounded-[6px] border border-accent px-4 py-2 text-accent transition-colors duration-200 hover:bg-accent hover:text-paper"
          >
            Login
          </button>
        )}
      </nav>
    </header>
  )
}
