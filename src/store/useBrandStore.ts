import type { Brand } from '@api/types'
import { create } from 'zustand'

interface BrandState {
  allBrands: Brand[]
  setAllBrands: (brands: Brand[] | ((prev: Brand[]) => Brand[])) => void
}

export const useBrandStore = create<BrandState>(set => ({
  allBrands: [],
  setAllBrands: brands =>
    set(state => ({
      allBrands: typeof brands === 'function' ? brands(state.allBrands) : brands,
    })),
}))
