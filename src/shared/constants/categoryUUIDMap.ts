import type { UUID } from '@api/types'

export const categoryUUIDMap: Record<string, UUID> = {
  'zhinochi-boots': 'b8e7e4bd-bd9e-41f8-bb5f-b6d5f68bc619' as UUID,
  'zhinochi-kedi': 'a5e968cb-1a88-4ad2-b511-72de43d68488' as UUID,
  'zhinochi-krosivki': '64cefc88-53e2-4f1b-84a9-870ff5a861a9' as UUID,
  'forher': '5582d88b-cf73-41ad-9b96-2505c7ae674a' as UUID,
  'forhim': 'c209f70d-3d66-4a79-8724-7309726eba25' as UUID,
  'accessories': '8dad40f8-af15-4478-a60e-22f6ffc6717e' as UUID,
}
export const categorySlugMap: Record<UUID, string> = Object.entries(categoryUUIDMap).reduce(
  (acc, [slug, uuid]) => {
    acc[uuid] = slug
    return acc
  },
  {} as Record<UUID, string>,
)
