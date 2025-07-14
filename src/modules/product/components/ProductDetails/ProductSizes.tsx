import { useState } from 'react'
import Icons from '~/assets/images/icon-sprite.svg'
import Button from '~/shared/components/Button/Button'
import SizeGuide from '../modalWindows/SizeGuide'

interface ProductSizesProps {
  sizeOptions?: string[]
}

export default function ProductSizes({
  sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
}: ProductSizesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  return (
    <div className="col-span-1 flex flex-col gap-y-2">
      <h2 className="font-normal text-[20px] leading-[140%] text-black tracking-normal">
        Розміри:
      </h2>
      <div className="flex gap-x-2">
        <div className="flex gap-x-2 gap-y-2 flex-wrap breakpoints-product w-full">
          {sizeOptions.map(size => (
            <Button
              key={size}
              onClick={() => setSelectedSize(size)}
              variant="secondary"
              state={selectedSize === size ? 'selected' : ''}
              className="product-items product-items__text"
            >
              {size}
            </Button>
          ))}
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex-center max-w-[152px] group cursor-pointer gap-x-2 [@media(min-width:1186px)]:ml-auto"
          >
            <svg className="h-[11px] w-[19px] stroke-[var(--hoverColor)] group-hover:stroke-black">
              <use href={`${Icons}#product_size-table`} />
            </svg>
            <p className="whitespace-nowrap text-[var(--buttonColor)] font-medium text-sm group-hover:text-black">
              Таблиця розмірів
            </p>
          </div>
          <SizeGuide
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </div>
  )
}
