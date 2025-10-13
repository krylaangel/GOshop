import getImageURL from '@shared/utils/imageUtils'
import { useCartStore } from '~/store/useCartStore'

export function CartItemMini() {
  const defaultImage = getImageURL('default-product-card.png')
  const cart = useCartStore(state => state.cart)

  return (
    <div className="flex flex-col">
      {cart.map((item, index) => {
        const price = item.price
        const salePrice = item.salePrice
        const hasDiscount = salePrice < price
        const currentPrice = hasDiscount ? salePrice : price
        const total = currentPrice * item.quantity
        let imageUrls = item.images?.map(img => img.imageUrl)

        if (!imageUrls || imageUrls.length === 0) {
          imageUrls = [defaultImage]
        }
        return (
          <div
            key={`${item.id}-${index}`}
            className="py-6 md:px-4 h-[184px] w-full border-b border-[var(--colorQuantityInput)] justify-between flex flex-col gap-x-10"
          >
            <div className="flex gap-3 full">
              <div className="w-[104px]">
                <img
                  src={item.images?.[0]?.imageUrl || defaultImage}
                  alt={item.name || undefined}
                />
              </div>
              <div className="w-full flex flex-col">
                <p className="font-light text-lg text-[var(--secondarColorMenu)] w-full">{item.name}</p>
                <div className="flex w-full justify-between">
                  <div className="flex items-end flex-col gap-[6px]">
                    <p className="text-xs font-normal text-[var(--secondaryColorText)]">Ціна</p>
                    <p
                      className="whitespace-nowrap font-bold text:sm sm:text-xl leading-[140%] tracking-normal flex justify-center items-end flex-col"
                    >
                      {hasDiscount
                        ? (
                            <>
                              <span className="">
                                {salePrice.toFixed(2)}
                                {' '}
                                грн
                              </span>
                              <span
                                className="font-light text-sm leading-[110%] tracking-normal line-through text-[var(--secondaryColorText)]"
                              >
                                {price.toFixed(2)}
                                {' '}
                                грн
                              </span>
                            </>
                          )
                        : (
                            `${price.toFixed(2)} грн`
                          )}
                    </p>
                  </div>
                  <div className="flex items-center md:items-end flex-col gap-[6px] w-[81px]">
                    <p className="text-xs font-normal text-[var(--secondaryColorText)]">Кількість</p>
                    <p className="flex text:sm sm:text-xl font-normal">{item.quantity}</p>
                  </div>
                  <div className="flex items-end flex-col gap-[6px]">
                    <p
                      className="text-xs font-normal text-[var(--secondaryColorText)]"
                    >
                      Сума
                    </p>
                    <p className="whitespace-nowrap font-bold text:sm sm:text-xl leading-[140%] tracking-normal flex justify-center items-end flex-col">
                      {total}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )
      })}
    </div>
  )
}
