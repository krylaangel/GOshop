import type { ColorsOption } from '@shared/constants/colors'
import { COLORS_OPTIONS } from '@shared/constants/colors'

interface ProductColorsProps {
  colorsOptions?: readonly ColorsOption[]
  selectedColor: ColorsOption | null
  setSelectedColor: (color: ColorsOption | null) => void
}

export default function ProductColors({ colorsOptions = COLORS_OPTIONS, selectedColor, setSelectedColor }: ProductColorsProps) {
  const handleSelectColors = (color: ColorsOption) => {
    setSelectedColor(selectedColor === color ? null : color)
  }
  return (
    <div className="col-span-1 flex flex-col gap-y-2">
      <h2 className="font-normal text-[20px] leading-[140%] text-black tracking-normal">
        Колір:
      </h2>
      <div className="flex gap-2 flex-wrap">
        {colorsOptions.map(color => (
          <div
            key={color.name}
            onClick={() => handleSelectColors(color)}
            className={`product-items ${color.className}  ${selectedColor === color ? 'border-black scale-110' : 'border-transparent'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
