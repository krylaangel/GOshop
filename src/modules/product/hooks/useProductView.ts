import type { Product, ProductAttribute } from '~/api/types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { brandService } from '~/api/services/brandService'
import { productAttributesService, productAttributeValuesService, productService } from '~/api/services/productService'

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

function useProductView(isFetchProductAttributes: boolean = false) {
  const { id } = useParams()
  const [productViewState, setProductViewState] = useState<ProductViewState>({
    product: null,
    isLoading: true,
    error: null,
  })
  const [attributes, setProductAttributes] = useState<ProductAttributeState>({
    colorOptions: [],
    sizeOptions: [],
    selectedColor: '',
    selectedSize: '',
  })
  async function fetchProduct() {
    if (id === undefined) {
      setProductViewState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Product ID is missing',
      }))
      return
    }
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
    }
    catch (error: any) {
      setProductViewState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Something went wrong',
      }))
    }
  }
  async function fetchProductAttributes() {
    if (!productViewState.product?.id) {
      throw new Error('Product ID is missing')
    }
    const attributesResponse = await productAttributesService.getById(productViewState.product.id)
    if (attributesResponse.isError) {
      throw new Error(attributesResponse.errorMessage || 'Failed to fetch attributes')
    }
    const attributes: ProductAttribute[] = attributesResponse.data

    const colorAttribute = attributes.find(attr => attr.name === 'color')
    const sizeAttribute = attributes.find(attr => attr.name === 'size')
    if (!colorAttribute || !sizeAttribute) {
      throw new Error('Color or size attribute is missing for this product')
    }
    const colorOptionsResponse = await productAttributeValuesService.getById(colorAttribute.id)
    const sizeOptionsResponse = await productAttributeValuesService.getById(sizeAttribute.id)

    if (colorOptionsResponse.isError || sizeOptionsResponse.isError) {
      throw new Error(colorOptionsResponse.errorMessage || sizeOptionsResponse.errorMessage || 'Failed to fetch attribute values')
    }
    if (!colorOptionsResponse.data.value || !sizeOptionsResponse.data.value) {
      throw new Error('Color or size options are not available for this product')
    }

    const colorOptions = Object.values(colorOptionsResponse.data.value)
    const sizeOptions = Object.values(sizeOptionsResponse.data.value)

    setProductAttributes({
      colorOptions,
      sizeOptions,
      selectedColor: colorOptions[0],
      selectedSize: sizeOptions[0],
    })
  }
  async function getBrandName() {
    const brandId = productViewState.product?.brandId
    if (!brandId) {
      throw new Error('Brand ID is missing')
    }
    const response = await brandService.getById(brandId)
    if (response.isError || !response.data || !response.data.name) {
      throw new Error(response.errorMessage || 'Failed to fetch brand name')
    }
    return response.data.name
  }
  useEffect(() => {
    fetchProduct()
    if (isFetchProductAttributes) {
      fetchProductAttributes()
    }
  }, [id])
  async function getSimilarProducts() {
    if (!productViewState.product?.id) {
      throw new Error('Product ID is missing for similar products')
    }
    const response = await productService.getSimilar(productViewState.product.id)
    if (response.isError) {
      throw new Error(response.errorMessage || 'Failed to fetch similar products')
    }
    return response.data
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
    getBrandName,
    attributes,
    getSimilarProducts,
  }
}

export default useProductView
