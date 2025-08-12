import type { UUID } from '@api/types'
import Button from '@shared/components/Button/Button'

interface ClearBrandFilterButtonProps {
  selectedBrands: Brand[]
  onRemoveBrand: (id: UUID) => void
}
interface Brand {
  id: UUID
  name: string
}

export function ClearBrandFilterButton({ selectedBrands, onRemoveBrand }: ClearBrandFilterButtonProps) {
  if (selectedBrands.length === 0)
    return null

  return (
    <div className="flex flex-wrap">
      {selectedBrands.map(brand => (
        <Button
          key={brand.id}
          variant="secondary"
          onClick={() => onRemoveBrand(brand.id)}
          className="ml-5 p-2 rounded text-sm font-medium text-[var(--buttonColor)]"
        >
          <span>{brand.name}</span>
          <span aria-label="Remove" className="p-2 rounded text-xl font-medium text-[var(--buttonColor)]">×</span>
        </Button>
      ))}
    </div>
  )
}
