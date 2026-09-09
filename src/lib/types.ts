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
