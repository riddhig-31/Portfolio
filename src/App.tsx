import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { supabase } from './lib/supabaseClient'
import { Tile } from './lib/types'
import Header from './components/Header'
import TileGrid from './components/TileGrid'
import TileModal from './components/TileModal'
import AddTileForm from './components/AddTileForm'
import AuthBar from './components/AuthBar'

export default function App() {
  const [tiles, setTiles] = useState<Tile[]>([])
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(false)
  const [selected, setSelected] = useState<Tile | null>(null)
  const [adding, setAdding] = useState(false)

  useEffect(() => {
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

  return (
    <div className="min-h-screen">
      <Header />
      {!loading && <TileGrid tiles={tiles} onOpen={setSelected} />}

      <footer className="border-t border-border px-[6vw] py-8 text-center text-[11px] text-textDim">
        Updated in real time · built and edited entirely with Claude
      </footer>

      <AuthBar session={session} onAdd={() => setAdding(true)} />

      <AnimatePresence>
        {selected && (
          <TileModal tile={selected} canEdit={session} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>{adding && <AddTileForm onClose={() => setAdding(false)} />}</AnimatePresence>
    </div>
  )
}
