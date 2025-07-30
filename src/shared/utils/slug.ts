// types.ts

export interface MenuItem {
  label: string
  href: string
  children: Category[]
}

export interface Category {
  heading: string
  submenu: SubCategory[]
}

export interface SubCategory {
  label: string
  href: string
}

export interface ProductPath {
  label: string
  fullPath: string // eg. /forher/boots
  category: string // eg. 'ДЛЯ НЕЇ'
  section: string // eg. 'ВЗУТТЯ'
}

export default function normalizeMenu(menuData: any[]): ProductPath[] {
  const result: ProductPath[] = []

  for (const menu of menuData) {
    for (const category of menu.children) {
      for (const sub of category.submenu) {
        const fullPath = sub.href.startsWith('/')
          ? sub.href
          : `${menu.href}/${sub.href.replace(/^#/, '')}`

        result.push({
          label: sub.label,
          fullPath,
          category: menu.label,
          section: category.heading,
        })
      }
    }
  }

  return result
}
