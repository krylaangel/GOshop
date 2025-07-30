import { menuData } from '@layout/components/Navigation/menuData'

interface Breadcrumb {
  label: string
  href: string
}
export default function findBreadcrumbPath(
  slug: string,
  menu = menuData,
  parentPath: Breadcrumb[] = [],
): Breadcrumb[] | null {
  for (const item of menu) {
    if (item.href.endsWith(slug)) {
      return [...parentPath, { label: item.label, href: item.href }]
    }

    if (item.children) {
      for (const child of item.children) {
        for (const sub of child.submenu) {
          if (sub.href.endsWith(slug)) {
            return [
              ...parentPath,
              { label: item.label, href: item.href },
              { label: child.heading, href: '' },
              { label: sub.label, href: sub.href },
            ]
          }
        }
      }
    }
  }

  return null
}
