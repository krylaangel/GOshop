import type { ColorsOption } from '@shared/constants/colors'
import type { SizesOption } from '@shared/constants/sizes'
import CharacteristicRow from './CharacteristicRow'
import ProductMiniCard from './ProductMiniCard'

interface CharacteristicsProps {
  brandName: string
  selectedSize: SizesOption | null
  selectedColor: ColorsOption | null
  setSelectedColor: (color: ColorsOption | null) => void
  setSelectedSize: (size: SizesOption | null) => void
}
export default function Characteristics({ brandName, selectedSize, selectedColor, setSelectedSize, setSelectedColor }: CharacteristicsProps) {
  return (
    <div className="flex justify-between w-full gap-x-11 pt-6">
      <div className="grid grid-cols-[auto_150px] grid-rows-7 flex-grow">
        <CharacteristicRow label="Матеріал" values={['Бавовна', 'Поліестер']} />
        <CharacteristicRow
          label="Склад"
          values={['80% бавовна', '20% поліестер']}
        />
        <CharacteristicRow label="Колір" values={['Чорний']} />
        <CharacteristicRow
          label="Призначення"
          values={['Для залу', 'Повсякденні']}
        />
        <CharacteristicRow
          label="Особливості"
          values={['З кишенями', 'Утеплений']}
        />
        <CharacteristicRow label="Бренд" values={['Puma']} />
        <CharacteristicRow label="Країна виробник" values={['Китай']} />
      </div>
      <ProductMiniCard
        brandName={brandName}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        setSelectedSize={setSelectedSize}
        setSelectedColor={setSelectedColor}
      />
    </div>
  )
}
