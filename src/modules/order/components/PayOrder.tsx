import React, { useState } from 'react'
interface PayOrderProps {
    selected: string
    setSelected: (method: string) => void
}

export function PayOrder({ selected, setSelected }: PayOrderProps) {
  const payMethod = ['Оплата при отриманні', 'Оплатити зараз']

  const [checkedTel, setCheckedTel] = useState(false)
  return (
    <div className="gap-6 flex flex-col mb-8">
      <h2 className="w-full bg-[var(--hoverBorder)] rounded-lg p-3 ">3. Оплата:</h2>
      <div className="flex gap-4 flex-wrap justify-between flex-col">

        {payMethod.map(p => (
          <label
            key={p}
            className="flex items-center text-lg font-light gap-2 cursor-pointer flex-nowrap"
          >
            <input
              type="radio"
              name="valuePay"
              value={p}
              checked={selected === p}
              onChange={() => setSelected(p)}
              className="w-5 h-5 accent-[var(--hoverColor)]"
            />
            {p}
          </label>
        ))}

      </div>
      <label className="block font-light text-lg leading-[1.4] text-[var(--secondarColorMenu)]">
        <input
          type="checkbox"
          checked={checkedTel}
          className="rounded-[2px] border
                   mr-[10px] w-4 h-4 border-[var(--hoverBorder)!]"
        />
        Не телефонувати для підтвердження
        {' '}
      </label>
    </div>
  )
}
