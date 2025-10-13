import type { Brand, UUID } from '@api/types'
import { brandService } from '@api/services/brandService'
import React, { useEffect, useState } from 'react'
import Icons from '~/assets/images/icon-sprite.svg'
import { useBrandStore } from '~/store/useBrandStore'

interface BrandFilterProps {
  selectedBrands: UUID[]
  onSelectedBrandsChange: (brands: UUID[]) => void
  currentCategoryId: UUID
}

function BrandFilter({ selectedBrands, onSelectedBrandsChange, currentCategoryId }: BrandFilterProps) {
  const [search, setSearch] = useState('')
  const [brands, setBrands] = useState<Brand[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const allBrands = useBrandStore(state => state.allBrands)
  const setAllBrands = useBrandStore(state => state.setAllBrands)
  const pageSize = 10

  const fetchBrands = async (pageToLoad: number, searchTerm: string) => {
    setLoading(true)
    try {
      const response = await brandService.get(searchTerm, pageToLoad, pageSize)
      if (pageToLoad === 1) {
        if (!searchTerm)
          setAllBrands?.(response.data)
        setBrands(response.data)
      }
      else {
        const newBrands = [...allBrands, ...response.data]
        setAllBrands?.(newBrands)
        setBrands(newBrands)
      }
      setHasMore(response.data.length === pageSize)
    }
    catch (error) {
      console.error('Помилка завантаження брендів', error)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(1)
    setHasMore(true)
    fetchBrands(1, search)
  }, [search, currentCategoryId])

  const loadMore = () => {
    if (isOpen) {
      setBrands(allBrands.slice(0, pageSize))
      setIsOpen(false)
      return
    }
    if (brands.length < allBrands.length) {
      setBrands(allBrands)
    }
    else if (hasMore) {
      const nextPage = page + 1
      fetchBrands(nextPage, search)
      setPage(nextPage)
    }
    setIsOpen(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value as UUID
    if (selectedBrands.includes(id)) {
      onSelectedBrandsChange(selectedBrands.filter(b => b !== id))
    }
    else {
      onSelectedBrandsChange([...selectedBrands, id])
    }
  }

  return (
    <div>
      <h1 className="text-lg font-light text-[var(--colorMenu)] my-2">Brand</h1>
      <input
        type="search"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Пошук..."
        className="rounded w-full px-3 py-2 border rounded-[10px] border
              border-[var(--inputField)] placeholder-[var(--inputField)] text-[var(--inputField)] focus:outline-none"
        aria-label="Search"
      />
      <div className="flex flex-col gap-y-3 mt-2">
        {brands.map(brand => (
          <label key={brand.id} className="block font-light text-lg leading-[1.4] text-[var(--secondarColorMenu)]">
            <input
              className="rounded-[2px] border
                   mr-[10px] w-4 h-4 border-[var(--hoverBorder)!]"
              type="checkbox"
              checked={selectedBrands.includes(brand.id)}
              value={brand.id}
              onChange={handleChange}
            />
            {brand.name}
          </label>
        ))}
        {!search && (
          <div onClick={loadMore} className="cursor-pointer flex justify-between">
            <p className="text-sm font-light text-[var(--baseColorText)]">{isOpen ? 'Свернути' : 'Показати ще'}</p>
            <svg
              className={`w-[11px] h-[7px] fill-current text-[var(--baseColorText)] m-[7px] transition-transform duration-300 ${
                isOpen ? 'rotate-180' : ''
              }`}
            >
              <use href={`${Icons}#header_arrow-open`} />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

export default BrandFilter
