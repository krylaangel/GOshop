import type { UUID } from '@api/types'
import { menuData } from '@layout/components/Navigation/menuData'
import Button from '@shared/components/Button/Button'
import { useNavigate } from 'react-router-dom'

interface SubcategoriesComponentProps {
  parentCategoryId?: UUID
}

export function SubcategoriesComponent({ parentCategoryId }: SubcategoriesComponentProps) {
  const navigate = useNavigate()

  const parentCategory = menuData.find((menu) => {
    const hrefMap: Record<string, UUID> = {
      '/forher': '5582d88b-cf73-41ad-9b96-2505c7ae674a' as UUID,
      '/forhim': 'c209f70d-3d66-4a79-8724-7309726eba25' as UUID,
      '/accessories': '8dad40f8-af15-4478-a60e-22f6ffc6717e' as UUID,
    }
    return parentCategoryId === hrefMap[menu.href]
  })

  if (!parentCategory)
    return null

  return (
    <div className="flex flex-col gap-4 mb-6 mt-6">
      {parentCategory.children.map(section =>
        section.submenu.map(sub => (
          <Button
            variant="secondary"
            key={sub.href}
            onClick={() => navigate(sub.href)}
            className="border p-2 rounded hover:bg-gray-100"
          >
            {sub.label}
          </Button>
        )),
      )}
    </div>
  )
}
