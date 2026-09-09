import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { supabase } from './lib/supabaseClient'
import { Tile } from './lib/types'
import NavBar from './components/NavBar'
import TileGrid from './components/TileGrid'
import TileModal from './components/TileModal'
import AddTileForm from './components/AddTileForm'
import AddButton from './components/AddButton'
import LoginModal from './components/LoginModal'
import IntroModal from './components/IntroModal'
import AboutModal from './components/AboutModal'
import MeetModal from './components/MeetModal'

export default function App() {
  const [tiles, setTiles] = useState<Tile[]>([])
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(false)
  const [selected, setSelected] = useState<Tile | null>(null)
  const [adding, setAdding] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showMeet, setShowMeet] = useState(false)
  const [showIntro, setShowIntro] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('intro-seen')) {
      setShowIntro(true)
    }

    supabase
      .from('tiles')
      .select('*')
      .order('published_at', { ascending: false })
      .then(({ data }) => {
        setTiles(data ?? [])
        setLoading(false)
      })

    const channel = supabase
      .channel('tiles-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tiles' }, () => {
        supabase
          .from('tiles')
          .select('*')
          .order('published_at', { ascending: false })
          .then(({ data }) => setTiles(data ?? []))
      })
      .subscribe()

    supabase.auth.getSession().then(({ data }) => setSession(!!data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(!!s))

    return () => {
      supabase.removeChannel(channel)
      sub.subscription.unsubscribe()
    }
  }, [])

  function dismissIntro() {
    localStorage.setItem('intro-seen', '1')
    setShowIntro(false)
  }

  return (
    <div className="min-h-screen">
      <NavBar
        session={session}
        onLogin={() => setLoggingIn(true)}
        onLogout={() => supabase.auth.signOut()}
        onAbout={() => setShowAbout(true)}
        onMeet={() => setShowMeet(true)}
      />
      {!loading && <TileGrid tiles={tiles} onOpen={setSelected} />}

      <footer className="border-t-2 border-ink px-[6vw] py-8 text-center text-[11px] tracking-wide text-textDim">
        UPDATED IN REAL TIME · BUILT AND EDITED ENTIRELY WITH CLAUDE
      </footer>

      {session && <AddButton onClick={() => setAdding(true)} />}

      <AnimatePresence>{showIntro && <IntroModal onClose={dismissIntro} />}</AnimatePresence>
      <AnimatePresence>{showAbout && <AboutModal onClose={() => setShowAbout(false)} />}</AnimatePresence>
      <AnimatePresence>{showMeet && <MeetModal onClose={() => setShowMeet(false)} />}</AnimatePresence>
      <AnimatePresence>{loggingIn && <LoginModal onClose={() => setLoggingIn(false)} />}</AnimatePresence>
      <AnimatePresence>
        {selected && <TileModal tile={selected} canEdit={session} onClose={() => setSelected(null)} />}
      </AnimatePresence>
      <AnimatePresence>{adding && <AddTileForm onClose={() => setAdding(false)} />}</AnimatePresence>
    </div>
  )
}
