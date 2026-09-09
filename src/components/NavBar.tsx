import { motion } from 'framer-motion'

interface Props {
  session: boolean
  onLogin: () => void
  onLogout: () => void
  onAbout: () => void
  onMeet: () => void
}

export default function NavBar({ session, onLogin, onLogout, onAbout, onMeet }: Props) {
  return (
    <header className="flex items-center justify-between border-b-2 border-ink px-[6vw] py-6">
      <div className="overflow-hidden">
        <motion.p
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[13vw] tracking-wide text-accent md:text-[42px]"
        >
          RIDDHI GUPTA
        </motion.p>
      </div>
      <nav className="flex items-center gap-6 text-[13px] font-medium tracking-wide">
        <button onClick={onAbout} className="text-textDim hover:text-accent">
          ABOUT ME
        </button>
        <button onClick={onMeet} className="text-textDim hover:text-accent">
          LET'S MEET
        </button>
        {session ? (
          <button onClick={onLogout} className="border border-accent px-4 py-2 text-accent hover:bg-accent hover:text-text">
            SIGN OUT
          </button>
        ) : (
          <button onClick={onLogin} className="border border-accent px-4 py-2 text-accent hover:bg-accent hover:text-text">
            LOGIN
          </button>
        )}
      </nav>
    </header>
  )
}
