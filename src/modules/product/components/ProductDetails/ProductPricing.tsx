interface ProductPricingProps {
  price: number
  salePrice: number
}

export default function ProductPricing({ price, salePrice }: ProductPricingProps) {
  const hasDiscount = salePrice < price

  return (
    <p className="justify-flex-start items-center flex whitespace-nowrap gap-x-[10px] col-span-1 font-bold text-[36px] leading-[140%] tracking-normal">
      {hasDiscount
        ? (
            <>
              <span className="font-light text-xl leading-[110%] tracking-normal line-through text-[var(--secondaryColorText)]">
                {price.toFixed(2)}
                {' '}
                грн
              </span>
              <span>
                {salePrice.toFixed(2)}
                {' '}
                грн
              </span>
            </>
          )
        : (
            `${price.toFixed(2)} грн`
          )}
    </p>
  )
}
