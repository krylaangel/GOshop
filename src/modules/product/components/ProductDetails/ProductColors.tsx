import { useState } from 'react'

const colorOptions = [
  { name: 'Black', className: 'bg-[var(--colorItemBlack)]' },
  { name: 'White', className: 'bg-[var(--colorItemWhite)]' },
  { name: 'Red', className: 'bg-[var(--colorItemRed)]' },
  { name: 'Green', className: 'bg-[var(--colorItemGreen)]' },
  { name: 'Blue', className: 'bg-[var(--colorItemBlue)]' },
  { name: 'Purple', className: 'bg-[var(--colorItemPurple)]' },
]

export default function ProductColors() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  return (
    <div className="col-span-1 flex flex-col gap-y-2">
      <h2 className="font-normal text-[20px] leading-[140%] text-black tracking-normal">
        Колір:
      </h2>
      <div className="flex gap-2 flex-wrap">
        {colorOptions.map(color => (
          <div
            key={color.name}
            onClick={() => setSelectedColor(color.name)}
            className={`product-items ${color.className}  ${selectedColor === color.name ? 'border-black scale-110' : 'border-transparent'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
