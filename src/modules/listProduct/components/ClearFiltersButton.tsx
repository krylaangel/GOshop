import Button from '@shared/components/Button/Button'

interface ClearFiltersButtonProps {
  hasActiveFilters: boolean
  onClear: () => void
}
export function ClearFiltersButton({ hasActiveFilters, onClear }: ClearFiltersButtonProps) {
  if (!hasActiveFilters)
    return null
  return (
    <div className="flex items-center">
      <Button
        variant="secondary"
        className="p-2 rounded text-sm font-medium text-[var(--buttonColor)]"
        onClick={onClear}
      >
        <span>Очистити все</span>
        <span
          aria-label="Remove"
          className="p-2 rounded text-xl font-medium text-[var(--buttonColor)]"
        >
          ×
        </span>
      </Button>
    </div>
  )
}
