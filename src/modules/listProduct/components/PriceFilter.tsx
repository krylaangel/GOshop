import React, { useState } from 'react'
import { Range } from 'react-range'

const MIN = 0
const MAX = 50000
const STEP = 100

function PriceFilter() {
  const [values, setValues] = useState([MIN, MAX])
  const [inputMin, setInputMin] = useState(String(MIN))
  const [inputMax, setInputMax] = useState(String(MAX))

  const onRangeChange = (vals: number[]) => {
    setValues(vals)
    setInputMin(String(vals[0]))
    setInputMax(String(vals[1]))
  }

  const onMinBlur = () => {
    let val = Number(inputMin)
    if (Number.isNaN(val))
      val = MIN
    if (val < MIN)
      val = MIN
    if (val > values[1])
      val = values[1]
    setValues([val, values[1]])
    setInputMin(String(val))
  }

  const onMaxBlur = () => {
    let val = Number(inputMax)
    if (Number.isNaN(val))
      val = MAX
    if (val > MAX)
      val = MAX
    if (val < values[0])
      val = values[0]
    setValues([values[0], val])
    setInputMax(String(val))
  }

  return (
    <div className="flex flex-col border-b border-[var(--hoverBorder)] pb-6">
      <h1 className="text-lg font-light text-[var(--colorMenu)] my-2">Ціна</h1>
      <div className="flex justify-between mb-2">
        <input
          type="number"
          value={inputMin}
          min={MIN}
          max={MAX}
          onChange={e => setInputMin(e.target.value)}
          onBlur={onMinBlur}
          placeholder="від"
          className="no-spinner flex-center w-[109px] h-[42px] border rounded-[10px] px-2 py-1 border
              border-[var(--inputField)] placeholder-[var(--inputField)] text-[var(--inputField)] focus:outline-none"
        />
        <input
          type="number"
          value={inputMax}
          min={MIN}
          max={MAX}
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
        onChange={onRangeChange}
        renderTrack={({ props, children }) => {
          const { ...rest } = props
          return (
            <div
              {...rest}
              className="h-[3px] bg-[var(--hoverBorder)] my-4 cursor-pointer! outline-none
"
            >
              {children}
            </div>
          )
        }}
        renderThumb={({ props }) => {
          const { key, ...rest } = props
          return <div key={key} {...rest} className="w-[30px] h-[30px] rounded-full bg-[var(--hoverBorder)] cursor-pointer! outline-none" />
        }}
      />
    </div>
  )
}

export default PriceFilter
