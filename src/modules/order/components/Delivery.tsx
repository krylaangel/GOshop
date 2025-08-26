import { useState } from 'react'

interface Addresses {
    city: string
    street: string
    numberBuilding: string
    flat: string
    flor: string
    frontDoor: string
}

interface DeliveryProps {
    selected: string
    setSelected: (method: string) => void
    addresses: Addresses
    setAddresses: (addresses: Addresses) => void
}
export function Delivery({ selected, setSelected, addresses, setAddresses }: DeliveryProps) {
  const deliveryMethod = ['Самовивіз', 'Відділення Нова Пошта', 'Кур\'єр Нова Пошта', 'Поштомат Нова Пошта']
  return (
    <div className="flex gap-6 flex-col my-8">
      <h2 className="w-full bg-[var(--hoverBorder)] rounded-lg p-3 ">2. Доставка:</h2>
      <input
        className="border rounded-lg px-3 py-2 w-full input-field input-field-styles"
        value={addresses.city}
        placeholder="Місто"
        onChange={e => setAddresses({...addresses, city: e.target.value})}
      />
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
            {`${num}`}
          </label>
        ))}
        {selected === 'Самовивіз' && (
          <div>
            <div className="flex gap-[10px] items-center">
              <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.50008 10.4997C9.073 10.4997 9.56345 10.2957 9.97144 9.8877C10.3794 9.47971 10.5834 8.98926 10.5834 8.41634C10.5834 7.84343 10.3794 7.35297 9.97144 6.94499C9.56345 6.537 9.073 6.33301 8.50008 6.33301C7.92716 6.33301 7.43671 6.537 7.02873 6.94499C6.62074 7.35297 6.41675 7.84343 6.41675 8.41634C6.41675 8.98926 6.62074 9.47971 7.02873 9.8877C7.43671 10.2957 7.92716 10.4997 8.50008 10.4997ZM8.50008 18.1559C10.6181 16.2115 12.1893 14.445 13.2136 12.8564C14.2379 11.2679 14.7501 9.85731 14.7501 8.62467C14.7501 6.73231 14.1468 5.18283 12.9402 3.97624C11.7336 2.76964 10.2536 2.16634 8.50008 2.16634C6.74661 2.16634 5.26657 2.76964 4.05998 3.97624C2.85338 5.18283 2.25008 6.73231 2.25008 8.62467C2.25008 9.85731 2.76223 11.2679 3.78654 12.8564C4.81085 14.445 6.38203 16.2115 8.50008 18.1559ZM8.50008 20.9163C5.70494 18.5379 3.61727 16.3287 2.23706 14.2887C0.856852 12.2488 0.166748 10.3608 0.166748 8.62467C0.166748 6.02051 1.00442 3.94586 2.67977 2.40072C4.35512 0.855577 6.29522 0.0830078 8.50008 0.0830078C10.7049 0.0830078 12.645 0.855577 14.3204 2.40072C15.9957 3.94586 16.8334 6.02051 16.8334 8.62467C16.8334 10.3608 16.1433 12.2488 14.7631 14.2887C13.3829 16.3287 11.2952 18.5379 8.50008 20.9163Z" fill="#5D79BE" />
              </svg>
              <p className="text-lg font-light">Вінниця, вул. Коцюбинського, 22</p>
            </div>
            <div className="flex gap-[10px] items-center">
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.8853 3.20801C13.5208 3.20801 13.2126 3.08214 12.9609 2.8304C12.7091 2.57867 12.5833 2.27051 12.5833 1.90592C12.5833 1.54134 12.7091 1.23318 12.9609 0.981445C13.2126 0.729709 13.5208 0.603841 13.8853 0.603841C14.2499 0.603841 14.5581 0.729709 14.8098 0.981445C15.0616 1.23318 15.1874 1.54134 15.1874 1.90592C15.1874 2.27051 15.0616 2.57867 14.8098 2.8304C14.5581 3.08214 14.2499 3.20801 13.8853 3.20801ZM13.8853 20.3955C13.5208 20.3955 13.2126 20.2696 12.9609 20.0179C12.7091 19.7662 12.5833 19.458 12.5833 19.0934C12.5833 18.7288 12.7091 18.4207 12.9609 18.1689C13.2126 17.9172 13.5208 17.7913 13.8853 17.7913C14.2499 17.7913 14.5581 17.9172 14.8098 18.1689C15.0616 18.4207 15.1874 18.7288 15.1874 19.0934C15.1874 19.458 15.0616 19.7662 14.8098 20.0179C14.5581 20.2696 14.2499 20.3955 13.8853 20.3955ZM18.052 6.85384C17.6874 6.85384 17.3793 6.72797 17.1275 6.47624C16.8758 6.2245 16.7499 5.91634 16.7499 5.55176C16.7499 5.18717 16.8758 4.87902 17.1275 4.62728C17.3793 4.37554 17.6874 4.24967 18.052 4.24967C18.4166 4.24967 18.7247 4.37554 18.9765 4.62728C19.2282 4.87902 19.3541 5.18717 19.3541 5.55176C19.3541 5.91634 19.2282 6.2245 18.9765 6.47624C18.7247 6.72797 18.4166 6.85384 18.052 6.85384ZM18.052 16.7497C17.6874 16.7497 17.3793 16.6238 17.1275 16.3721C16.8758 16.1203 16.7499 15.8122 16.7499 15.4476C16.7499 15.083 16.8758 14.7748 17.1275 14.5231C17.3793 14.2714 17.6874 14.1455 18.052 14.1455C18.4166 14.1455 18.7247 14.2714 18.9765 14.5231C19.2282 14.7748 19.3541 15.083 19.3541 15.4476C19.3541 15.8122 19.2282 16.1203 18.9765 16.3721C18.7247 16.6238 18.4166 16.7497 18.052 16.7497ZM19.6145 11.8018C19.2499 11.8018 18.9418 11.6759 18.69 11.4242C18.4383 11.1724 18.3124 10.8643 18.3124 10.4997C18.3124 10.1351 18.4383 9.82693 18.69 9.5752C18.9418 9.32346 19.2499 9.19759 19.6145 9.19759C19.9791 9.19759 20.2872 9.32346 20.539 9.5752C20.7907 9.82693 20.9166 10.1351 20.9166 10.4997C20.9166 10.8643 20.7907 11.1724 20.539 11.4242C20.2872 11.6759 19.9791 11.8018 19.6145 11.8018ZM10.4999 20.9163C9.05895 20.9163 7.70478 20.6429 6.43742 20.096C5.17006 19.5492 4.06763 18.807 3.13013 17.8695C2.19263 16.932 1.45044 15.8295 0.903565 14.5622C0.356689 13.2948 0.083252 11.9406 0.083252 10.4997C0.083252 9.0587 0.356689 7.70454 0.903565 6.43717C1.45044 5.16981 2.19263 4.06738 3.13013 3.12988C4.06763 2.19238 5.17006 1.4502 6.43742 0.90332C7.70478 0.356445 9.05895 0.0830078 10.4999 0.0830078V2.16634C8.17353 2.16634 6.20304 2.97363 4.58846 4.58822C2.97388 6.2028 2.16659 8.17329 2.16659 10.4997C2.16659 12.8261 2.97388 14.7966 4.58846 16.4111C6.20304 18.0257 8.17353 18.833 10.4999 18.833V20.9163ZM13.9374 15.3955L9.45825 10.9163V5.29134H11.5416V10.083L15.3958 13.9372L13.9374 15.3955Z"
                  fill="#5D79BE"
                />
              </svg>
              <p className="text-lg font-light">Пн-Нд з 09:00 до 19:00</p>
            </div>
          </div>
        )}
        {selected === 'Кур\'єр Нова Пошта' && (
          <div className="gap-6 flex flex-col w-full">
            <input
              className="border rounded-lg px-3 py-2 w-full input-field input-field-styles"
              value={addresses.street}
              placeholder="Вулиця*"
              onChange={e => setAddresses({...addresses, street: e.target.value})}


            />
            <div className="flex gap-6">
              <input
                className="border rounded-lg px-3 py-2 input-field input-field-styles"
                value={addresses.numberBuilding}
                onChange={e => setAddresses({...addresses, numberBuilding: e.target.value})}

                placeholder="Номер будинку*"
              />
              <input
                className="border rounded-lg px-3 py-2 input-field input-field-styles"
                value={addresses.flat}
                onChange={e => setAddresses({...addresses, flat: e.target.value})}

                placeholder="Номер квартири"
              />
            </div>
            <div className="flex gap-6">
              <input
                className="border rounded-lg px-3 py-2 input-field input-field-styles"
                value={addresses.frontDoor}
                placeholder="Під'їзд"
                onChange={e => setAddresses({...addresses, frontDoor: e.target.value})}

              />

              <input
                className="border rounded-lg px-3 py-2 input-field input-field-styles"
                value={addresses.flor}
                placeholder="Поверх"
                onChange={e => setAddresses({...addresses, flor: e.target.value})}

              />
            </div>

          </div>
        )}
        {selected === 'Відділення Нова Пошта' && (
          <div className="w-full">
            <input
              className="border rounded-lg px-3 py-2 w-full input-field input-field-styles"
              value={addresses.street}
              placeholder="Виберіть відповідне відділення"
              onChange={e => setAddresses({...addresses, street: e.target.value})}


            />
          </div>
        )}
        {selected === 'Поштомат Нова Пошта' && (
          <div className="w-full">
            <input
              className="border rounded-lg px-3 py-2 w-full input-field input-field-styles"
              value={addresses.street}
              placeholder="Виберіть відповідний поштомат"
              onChange={e => setAddresses({...addresses, street: e.target.value})}

            />
          </div>
        )}
      </div>
    </div>
  )
}
