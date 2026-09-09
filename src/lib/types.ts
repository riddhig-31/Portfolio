export type TileType = 'project' | 'ai' | 'post' | 'brand' | 'doc' | 'note'

export interface Tile {
  id: string
  name: string
  type: TileType
  line: string
  description: string | null
  url: string | null
  importance: number
  is_constant: boolean
  published_at: string
  created_at: string
}

export const TYPE_LABEL: Record<TileType, string> = {
  project: 'Project',
  ai: 'AI project',
  post: 'Journal',
  brand: 'Brand',
  doc: 'Document',
  note: 'Currently',
}

export function computeScore(t: Pick<Tile, 'importance' | 'published_at'>): number {
  const days = (Date.now() - new Date(t.published_at).getTime()) / 86_400_000
  const recencyBoost = Math.max(0, 30 - days) / 30 * 2.4
  return t.importance + recencyBoost
}

export function isRecent(t: Pick<Tile, 'published_at'>): boolean {
  const days = (Date.now() - new Date(t.published_at).getTime()) / 86_400_000
  return days >= 0 && days <= 10
}

const SIZE_PATTERN = [
  'hero',
  'wide',
  'tall',
  'normal',
  'normal',
  'wide',
  'normal',
  'tall',
  'normal',
  'normal',
] as const

export type TileSize = (typeof SIZE_PATTERN)[number]

export function sizeForRank(rank: number): TileSize {
  return SIZE_PATTERN[rank % SIZE_PATTERN.length]
}

// Poster-block palette: black, red, cream — cycled with a nudge so it
// never falls into an obvious repeating pattern.
export type BlockTone = 'ink' | 'accent' | 'paper'
const TONE_CYCLE: BlockTone[] = ['ink', 'accent', 'paper', 'ink', 'paper', 'accent', 'ink']

export function toneForIndex(i: number): BlockTone {
  return TONE_CYCLE[i % TONE_CYCLE.length]
}

function hashId(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i++) {
    h = (h << 5) - h + id.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

// Deterministic tilt in degrees, between -4 and 4, alternating sign by index.
export function tiltForTile(id: string, index: number): number {
  const magnitude = 1.5 + (hashId(id) % 25) / 10 // 1.5–4
  return index % 2 === 0 ? magnitude : -magnitude
}
