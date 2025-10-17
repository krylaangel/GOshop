interface Addresses {
  city: string
  street: string
  numberBuilding: string
  flat: string
  flor: string
  frontDoor: string
  numberDelivery: string
}

interface DeliveryProps {
  selected: string
  setSelected: (method: string) => void
  addresses: Addresses
  setAddresses: (addresses: Addresses) => void
  errors?: Partial<Addresses>
}
export function Delivery({ selected, setSelected, addresses, setAddresses, errors }: DeliveryProps) {
  const deliveryMethod = ['Самовивіз', 'Відділення Нова Пошта', 'Кур\'єр Нова Пошта', 'Поштомат Нова Пошта']

  return (
    <div className="flex gap-6 flex-col my-8">
      <h2 className="w-full bg-[var(--hoverBorder)] rounded-lg p-3 ">2. Доставка:</h2>

      {/* Город */}
      {selected !== 'Самовивіз' && (
        <div className="flex flex-col gap-1">
          <input
            className="border rounded-lg px-3 py-2 w-full input-field input-field-styles"
            value={addresses.city}
            placeholder="Місто*"
            onChange={e => setAddresses({ ...addresses, city: e.target.value })}
          />
          {errors?.city && <p className="error__auth py-4">{errors.city}</p>}
        </div>
      )}

      {/* Выбор метода доставки */}
      <div className="flex gap-4 flex-wrap justify-between">
        {deliveryMethod.map(num => (
          <label key={num} className="flex items-center text-lg font-light gap-2 cursor-pointer flex-nowrap">
            <input
              type="radio"
              name="circle"
              value={num}
              checked={selected === String(num)}
              onChange={() => setSelected(String(num))}
              className="w-5 h-5 accent-[var(--hoverColor)]"
            />
            {num}
          </label>
        ))}
      </div>

      {/* Самовывоз */}
      {selected === 'Самовивіз' && (
        <div className="flex flex-col gap-2 mt-4">
          <p>Вінниця, вул. Коцюбинського, 22</p>
          <p>Пн-Нд з 09:00 до 19:00</p>
        </div>
      )}

      {/* Курьерская доставка */}
      {selected === 'Кур\'єр Нова Пошта' && (
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex flex-col gap-1">
            <input
              className="border rounded-lg px-3 py-2 input-field input-field-styles"
              value={addresses.street}
              placeholder="Вулиця*"
              onChange={e => setAddresses({ ...addresses, street: e.target.value })}
            />
            {errors?.street && <p className="error__auth py-4">{errors.street}</p>}
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-1 flex-1">
              <input
                className="border rounded-lg px-3 py-2 input-field input-field-styles"
                value={addresses.numberBuilding}
                placeholder="Номер будинку*"
                onChange={e => setAddresses({ ...addresses, numberBuilding: e.target.value })}
              />
              {errors?.numberBuilding && <p className="error__auth py-4">{errors.numberBuilding}</p>}
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <input
                onChange={e => setAddresses({ ...addresses, flat: e.target.value })}
                className="border rounded-lg px-3 py-2 input-field input-field-styles"
                value={addresses.flat}
                placeholder="Номер квартири"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-1 flex-1">
              <input
                className="border rounded-lg px-3 py-2 input-field input-field-styles"
                value={addresses.frontDoor}
                placeholder="Під'їзд"
                onChange={e => setAddresses({ ...addresses, frontDoor: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <input
                className="border rounded-lg px-3 py-2 input-field input-field-styles"
                value={addresses.flor}
                placeholder="Поверх"
                onChange={e => setAddresses({ ...addresses, flor: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}

      {/* Отделение НП и Поштомат */}
      {['Відділення Нова Пошта', 'Поштомат Нова Пошта'].includes(selected) && (
        <div className="flex flex-col gap-1 mt-4">
          <input
            className="border rounded-lg px-3 py-2 w-full input-field input-field-styles"
            value={addresses.numberDelivery}
            placeholder={selected === 'Відділення Нова Пошта' ? 'Виберіть відділення' : 'Виберіть поштомат'}
            onChange={e => setAddresses({ ...addresses, numberDelivery: e.target.value })}
          />
          {errors?.numberDelivery && <p className="error__auth py-4">{errors.numberDelivery}</p>}
        </div>
      )}
    </div>
  )
}
