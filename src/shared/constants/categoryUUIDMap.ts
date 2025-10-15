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
  'cholovichyi-odyag': 'a829fece-13bb-462a-b610-8cf0324dbd5d' as UUID,
  'cholovichi-maiky': 'a3e09447-02b5-4172-9d9a-1a6acd87d54c' as UUID,
  'vzuttia-choloviche': 'd0c82585-31b3-4d1f-a17f-8a286b257dfe' as UUID,
  'cherevyky-cholovichi': 'c1b2a934-573f-4b5d-ba2a-5f91acc4ad67' as UUID,
  'krosivky-cholovichi': '68b1652b-c3f9-4247-917a-bf849eee9c91' as UUID,
  'kedy-cholovichi': 'ecc84637-8482-43e6-87f2-eaec308f7ec9' as UUID,
  'kurtky-cholovichi': 'a8279d35-e8bd-4596-9dc5-1201943933c6' as UUID,
  'bezrukavky-cholovichi': '31eeaff3-ed10-455c-af9f-164bd470d89c' as UUID,
  'svitshoty-cholovichi': 'f8bc0dbf-de78-4733-ba01-457d119dfd0a' as UUID,
  'shorty-cholovichi': '67644745-bb40-44b9-ad56-520c9f173804' as UUID,
  'pukhovyky-cholovichi': '80508e2c-a7f9-4b97-bbd4-5b08f0569e73' as UUID,
  'shtany-cholovichi': '4dba1732-7a6a-4857-9c9a-77634f3bdac7' as UUID,
  'futbolky-cholovichi': '32d29692-2fbf-42b6-98f7-8f337426c65a' as UUID,
  'lehinsy-cholovichi': '5652e154-365b-4477-a17e-cee75b8157d7' as UUID,
  'vitrovky-cholovichi': '64e06e57-119f-427a-a854-f06e89a7f192' as UUID,
  'ustilky2': '5218c850-c11a-4f1f-9879-9fed97849717' as UUID,



  'accessories': '8dad40f8-af15-4478-a60e-22f6ffc6717e' as UUID,
  'riukzaky': '9f15c23e-be7b-4c03-b8c0-1b33f4db8734' as UUID,
  'hamantsi': 'fa56a42c-1438-4856-b12e-27c16a51b102' as UUID,
  'sharfy': 'fd675211-8b39-4c46-9736-4aaf9ddbfef2' as UUID,
  'shapky': 'ee881e54-2beb-4e87-a8fd-4dc190c46020' as UUID,
  'pliashky': 'fcd9f83d-183f-43a0-bc4e-724510d896e3' as UUID,
  'shkarpetky': '5c99e62d-92f8-4b04-9f03-9401fe0948c1' as UUID,
  'rushnyky': '75f5ced3-84a0-45a7-99f0-a55912b0761a' as UUID,
  'rukavychky': '33b6b67a-58ac-44e2-ae06-b0c9b466b7ac' as UUID,
  'holovni-ubory': '9fcb2796-1eff-4e22-8f92-b31db776858f' as UUID,
  'ustilky': 'eff495f4-2e47-4ce9-aea8-bd5b4bec2bbf' as UUID,
  'sumky': 'd2839d6b-9b33-48a6-9188-d4fccde7da3e' as UUID,
  'termosy': '8dad40f8-af15-4478-a60e-22f6ffc6717e' as UUID,
}
export const categorySlugMap: Record<UUID, string> = Object.entries(categoryUUIDMap).reduce(
  (acc, [slug, uuid]) => {
    acc[uuid] = slug
    return acc
  },
  {} as Record<UUID, string>,
)
