import type { Product, ProductAttribute, UUID } from '~/api/types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { brandService } from '~/api/services/brandService'
import {
  productAttributesService,
  productAttributeValuesService,
  productService,
} from '~/api/services/productService'

interface ProductViewState {
  product: Product | null
  isLoading: boolean
  error: string | null
}

interface ProductAttributeState {
  colorOptions?: string[]
  sizeOptions?: string[]
  selectedColor?: string
  selectedSize?: string
}

function useProductView(
  isFetchProductAttributes = false,
  isFetchBrandName = false,
  isFetchSimilarProducts = false,
) {
  const { id } = useParams() as { id: UUID }
  const [productViewState, setProductViewState] = useState<ProductViewState>({
    product: null,
    isLoading: true,
    error: null,
  })

  const [brandName, setBrandName] = useState<string>('Невідомий бренд')
  const [attributes, setProductAttributes] = useState<ProductAttributeState>({
    colorOptions: [],
    sizeOptions: [],
    selectedColor: '',
    selectedSize: '',
  })

  const [similarProducts, setSimilarProducts] = useState<Product[]>([])

  useEffect(() => {
    if (!id) {
      setProductViewState({
        product: null,
        isLoading: false,
        error: 'Product ID is missing',
      })
      return
    }

    async function fetchAll() {
      try {
        const response = await productService.getById(id)
        if (response.isError) {
          throw new Error(response.errorMessage || 'Failed to fetch product')
        }

        const product = response.data
        setProductViewState({
          product,
          isLoading: false,
          error: null,
        })

        if (isFetchProductAttributes) {
          fetchProductAttributes(product.id)
        }

        if (isFetchBrandName) {
          getBrandName(product.brandId)
        }

        if (isFetchSimilarProducts) {
          getSimilarProducts(product.id)
        }
      }
      catch (error: any) {
        setProductViewState({
          product: null,
          isLoading: false,
          error: error.message || 'Something went wrong',
        })
      }
    }

    fetchAll()
  }, [id])

  async function fetchProductAttributes(productId: UUID) {
    const attributesResponse = await productAttributesService.getById(productId)
    if (attributesResponse.isError) {
      throw new Error(attributesResponse.errorMessage || 'Failed to fetch attributes')
    }

    const attributes: ProductAttribute[] = attributesResponse.data
    const colorAttr = attributes.find(attr => attr.name === 'color')
    const sizeAttr = attributes.find(attr => attr.name === 'size')

    if (!colorAttr || !sizeAttr) {
      throw new Error('Color or size attribute is missing')
    }

    const colorRes = await productAttributeValuesService.getById(colorAttr.id)
    const sizeRes = await productAttributeValuesService.getById(sizeAttr.id)

    if (colorRes.isError || sizeRes.isError) {
      throw new Error(colorRes.errorMessage || sizeRes.errorMessage || 'Failed to fetch attribute values')
    }

    const colorOptions = Object.values(colorRes.data.value ?? {})
    const sizeOptions = Object.values(sizeRes.data.value ?? {})

    setProductAttributes({
      colorOptions,
      sizeOptions,
      selectedColor: colorOptions[0],
      selectedSize: sizeOptions[0],
    })
  }

  async function getBrandName(brandId: UUID | null) {
    if (!brandId) {
      setBrandName('Невідомий бренд')
      return
    }
    const response = await brandService.getById(brandId)
    if (response.isError || !response.data?.name) {
      throw new Error(response.errorMessage || 'Failed to fetch brand name')
    }
    setBrandName(response.data.name)
  }

  async function getSimilarProducts(productId: UUID) {
    const response = await productService.getSimilar(productId)
    if (response.isError) {
      throw new Error(response.errorMessage || 'Failed to fetch similar products')
    }
    setSimilarProducts(response.data)
  }

  const handleColorChange = (color: string) => {
    setProductAttributes(prev => ({ ...prev, selectedColor: color }))
  }

  const handleSizeChange = (size: string) => {
    setProductAttributes(prev => ({ ...prev, selectedSize: size }))
  }

  return {
    ...productViewState,
    handleColorChange,
    handleSizeChange,
    brandName,
    attributes,
    similarProducts,
  }
}

export default useProductView
