import type { Brand } from '@api/types'
import { brandService } from '@api/services/brandService'
import React, { useEffect, useState } from 'react'

function BrandFilter() {
  const [search, setSearch] = useState('')
  const [brands, setBrands] = useState<Brand[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const fetchBrands = async () => {
    try {
      const response = await brandService.get(search)
      setBrands(response.data)
    }
    catch (error) {
      console.error('Помилка при завантаженні брендів:', error)
    }
  }
  useEffect(() => {
    fetchBrands()
  }, [search])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value
    setSelectedBrands(prev => prev.includes(id) ? prev.filter(catId => catId !== id) : [...prev, id])
  }

  return (
    <div>
      <h1 className="text-lg font-light text-[var(--colorMenu)] my-2">Brand</h1>
      <input
        onChange={e => setSearch(e.target.value)}
        value={search}
        type="search"
        placeholder="Пошук..."
        className="border rounded w-full px-3 py-2 w-full border rounded-[10px] border
              border-[var(--inputField)] placeholder-[var(--inputField)] text-[var(--inputField)] focus:outline-none"
        aria-label="Search"
      />
      <div className="flex flex-col gap-y-3 mt-2">
        {brands.map(brand => (
          <label key={brand.id} className="block font-light text-lg leading-[1.4] text-[var(--secondarColorMenu)] uppercase">
            <input onChange={handleChange} checked={selectedBrands.includes(brand.id)} type="checkbox"
                   className="rounded-[2px] border
                   mr-[10px] w-4 h-4 border-[var(--hoverBorder)!]" value={brand.id} />
            {brand.name}

          </label>

        ))}
      </div>

    </div>
  )
}

export default BrandFilter
