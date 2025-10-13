import React, { useEffect, useState } from 'react'
import { Range } from 'react-range'

const MIN = 0
const MAX = 50000
const STEP = 100

interface PriceFilterProps {
  priceRange: [number, number]
  onPriceChange: (range: [number, number]) => void
}

function PriceFilter({ priceRange, onPriceChange }: PriceFilterProps) {
  const [values, setValues] = useState<[number, number]>(priceRange)
  const [inputMin, setInputMin] = useState(String(priceRange[0]))
  const [inputMax, setInputMax] = useState(String(priceRange[1]))

  useEffect(() => {
    setValues(priceRange)
    setInputMin(String(priceRange[0]))
    setInputMax(String(priceRange[1]))
  }, [priceRange])

  const updateRange = (vals: [number, number]) => {
    setValues(vals)
    setInputMin(String(vals[0]))
    setInputMax(String(vals[1]))
    onPriceChange(vals)
  }

  const onMinBlur = () => {
    const val = Math.max(MIN, Math.min(Number(inputMin) || MIN, values[1]))
    updateRange([val, values[1]])
  }

  const onMaxBlur = () => {
    const val = Math.min(MAX, Math.max(Number(inputMax) || MAX, values[0]))
    updateRange([values[0], val])
  }

  return (
    <div className="flex flex-col border-b border-[var(--hoverBorder)] pb-6">
      <h1 className="text-lg font-light text-[var(--colorMenu)] my-2">Ціна</h1>
      <div className="flex justify-between mb-2">
        <input
          type="number"
          value={inputMin}
          onChange={e => setInputMin(e.target.value)}
          onBlur={onMinBlur}
          placeholder="від"
          className="no-spinner flex-center w-[109px] h-[42px] border rounded-[10px] px-2 py-1 border
              border-[var(--inputField)] placeholder-[var(--inputField)] text-[var(--inputField)] focus:outline-none"
        />
        <input
          type="number"
          value={inputMax}
          onChange={e => setInputMax(e.target.value)}
          onBlur={onMaxBlur}
          placeholder="до"
          className="no-spinner flex-center w-[109px] h-[42px] border rounded-[10px] px-2 py-1 border
              border-[var(--inputField)] placeholder-[var(--inputField)] text-[var(--inputField)] focus:outline-none"
        />
      </div>

      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        values={values}
        onChange={vals => updateRange(vals as [number, number])}
        renderTrack={({ props, children }) => (
          <div {...props} className="h-[3px] bg-[var(--hoverBorder)] my-4 cursor-pointer! outline-none mx-4">
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div {...props} className="w-[30px] h-[30px] rounded-full bg-[var(--hoverBorder)]" />
        )}
      />
    </div>
  )
}

export default PriceFilter
