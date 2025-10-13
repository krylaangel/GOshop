import type { UUID } from '@api/types'

export const categoryUUIDMap: Record<string, UUID> = {
  'forher': '5582d88b-cf73-41ad-9b96-2505c7ae674a' as UUID,
  'zhinochyi-vzuttya': '86961b2f-e3aa-4af7-a6b0-69bb53dd3422' as UUID,
  'zhinochyi-kedi': 'a5e968cb-1a88-4ad2-b511-72de43d68488' as UUID,
  'zhinochyi-krosivky': '64cefc88-53e2-4f1b-84a9-870ff5a861a9' as UUID,
  'zhinochyi-cherevyky': 'b8e7e4bd-bd9e-41f8-bb5f-b6d5f68bc619' as UUID,

  'zhinochyi-odyag': '70c24ab5-0389-47b6-a3a2-cc92f408be4f' as UUID,
  'zhinochyi-topy': '46f8f9aa-6a7c-4344-9c56-91a8a1757b9e' as UUID,
  'zhinochyi-losyny': '56a33e92-8344-4d36-9740-9e378119280c' as UUID,
  'zhinochyi-vitrovky': 'e7621902-1760-460e-81d0-b1a62af2711a' as UUID,
  'zhinochyi-shorty': 'cadfbda4-65d0-42d4-92bd-c1571cd41c91' as UUID,
  'zhinochyi-svitshoty': 'b6dce74a-d77a-4ef6-b2ec-d5c55cf1b6d3' as UUID,
  'zhinochyi-futbolky': '1cbbf264-201b-4273-880c-ddb1d9eb56d6' as UUID,
  'zhinochyi-shtany': '02207ef3-f209-4c85-8d28-fb7343fbd198' as UUID,
  'zhinochyi-zhylety': '7485dd49-d3cf-4c47-b724-19a2c730433b' as UUID,
  'zhinochyi-kurtky': '73f9bbb6-1e37-41bf-93fb-5244fd70c874' as UUID,
  'zhinochyi-pukhovyky': '8e01c3e5-5abc-41ac-88ef-740741cf3829' as UUID,




  'forhim': 'c209f70d-3d66-4a79-8724-7309726eba25' as UUID,
  'cholovichyi-odyag': '5d48249b-a139-4dc3-9252-8bdaad41450a' as UUID,
  'cholovichi-maiky': 'fcfa2c4f-ee4f-4284-9bc2-140de33ebf1f' as UUID,



  'accessories': '8dad40f8-af15-4478-a60e-22f6ffc6717e' as UUID,
}
export const categorySlugMap: Record<UUID, string> = Object.entries(categoryUUIDMap).reduce(
  (acc, [slug, uuid]) => {
    acc[uuid] = slug
    return acc
  },
  {} as Record<UUID, string>,
)
