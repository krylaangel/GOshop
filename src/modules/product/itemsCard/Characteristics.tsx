import CharacteristicRow from './CharacteristicRow'
import ProductMiniCard from './ProductMiniCard'

interface CharacteristicsProps {
  brandName: string

}
export default function Characteristics({ brandName }: CharacteristicsProps) {
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
      <ProductMiniCard brandName={brandName} />
    </div>
  )
}
