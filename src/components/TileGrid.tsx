import { Tile, computeScore, sizeForRank } from '../lib/types'
import TileCard from './TileCard'

interface Props {
  tiles: Tile[]
  onOpen: (t: Tile) => void
}

export default function TileGrid({ tiles, onOpen }: Props) {
  const sorted = [...tiles].sort((a, b) => computeScore(b) - computeScore(a))

  if (sorted.length === 0) {
    return (
      <div className="px-[6vw] py-24 text-center text-[13px] text-textDim">
        Nothing published yet. Sign in as the owner to add the first entry.
      </div>
    )
  }

  return (
    <main className="grid auto-rows-[150px] grid-cols-1 gap-5 px-[6vw] py-9 md:grid-cols-4">
      {sorted.map((tile, i) => (
        <TileCard key={tile.id} tile={tile} size={sizeForRank(i)} onOpen={onOpen} />
      ))}
    </main>
  )
}
