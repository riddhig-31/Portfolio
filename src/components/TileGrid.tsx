import { Tile, computeScore } from '../lib/types'
import TileCard from './TileCard'
import HeroTile from './HeroTile'

interface Props {
  tiles: Tile[]
  onOpen: (t: Tile) => void
  onNavigate: (path: string) => void
}

export default function TileGrid({ tiles, onOpen, onNavigate }: Props) {
  const sorted = [...tiles].sort((a, b) => computeScore(b) - computeScore(a))

  if (sorted.length === 0) {
    return (
      <div className="px-[6vw] py-24 text-center text-[13px] text-textDim">
        Nothing published yet. Sign in as the owner to add the first entry.
      </div>
    )
  }

  const [hero, ...rest] = sorted

  return (
    <main className="px-[6vw] py-10">
      <HeroTile tile={hero} onOpen={onOpen} />
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {rest.map((tile, i) => (
          <TileCard key={tile.id} tile={tile} index={i} onOpen={onOpen} onNavigate={onNavigate} />
        ))}
      </div>
    </main>
  )
}
