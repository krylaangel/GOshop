import Button from '@shared/components/Button/Button'
import getImageURL from '@shared/utils/imageUtils'
import { useCartStore } from '~/store/useCartStore'
import { useFavoriteStore } from '~/store/useFavoriteStore'

export function CartItem() {
  const removeFromCart = useCartStore(state => state.removeFromCart)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const defaultImage = getImageURL('default-product-card.png')
  const cart = useCartStore(state => state.cart)
  const isFavorite = useFavoriteStore(state => state.isFavorite)

  return (
    <div className="flex flex-col mt-[30px]">
      {cart.map((item) => {
        const price = item.price
        const salePrice = item.salePrice
        const hasDiscount = salePrice < price
        const currentPrice = hasDiscount ? salePrice : price
        const total = currentPrice * item.quantity
        const favorite = isFavorite(item.id)
        console.log(item.id, favorite)

        return (
          <div
            key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
            className="py-6 px-4 w-full border-b border-[var(--hoverBorder)] justify-between flex gap-x-10 gap-y-10 flex-wrap"
          >
            <div className="flex justify-center gap-3 w-full lg:flex-1">
              <div className="w-[92px]">
                <img
                  src={item.images?.[0]?.imageUrl || defaultImage}
                  alt={item.name || undefined}
                />
              </div>
              <p className="font-light text:sm sm:text-xl text-[var(--secondarColorMenu)] w-full">{item.name}</p>
              <div className="flex items-end flex-col gap-y-[6px]">
                <p className="text-xs font-normal text-[var(--secondaryColorText)]">Розмір</p>
                <div className="border-[var(--colorQuantityInput)] border flex">
                  <Button
                    variant="secondary"
                    className="w-[38px] h-[38px] text-[var(--inputField)] text-xs"
                  >
                    {item.selectedSize}
                  </Button>
                </div>
              </div>
              <div className="flex items-end flex-col gap-y-[6px]">
                <p className="text-xs font-normal text-[var(--secondaryColorText)]">Колір</p>
                <div className="border-[var(--colorQuantityInput)] border flex">
                  <div
                    className={`w-[38px] h-[38px] border ${item.selectedColor?.className || ''}`}
                  >
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-between flex gap-x-3 md:gap-x-10 w-full lg:w-fit">

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
              <div className="flex items-end flex-col gap-[6px] ">
                <p className="text-xs font-normal text-[var(--secondaryColorText)]">Кількість</p>
                <div className="border-[var(--colorQuantityInput)] border flex">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                    className="px-2 py-1 disabled:opacity-50 text-[var(--inputField)] text-xs"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text:sm sm:text-xl font-normal">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                    className="px-2 py-1 text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-end flex-col gap-[6px]">
                <p
                  className="text-xs font-normal text-[var(--secondaryColorText)]"
                >
                  Сума
                </p>
                <p className="whitespace-nowrap font-bold text:sm sm:text-xl leading-[140%] tracking-normal flex justify-center items-end flex-col">
                  {total}
                  {' '}
                  грн
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className={`py-4 hidden sm:flex items-end flex-col gap-[6px] `}
                >
                  <svg
                    viewBox="0 0 36 36"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-9 h-9"
                  >
                    <path
                      d="M18 30.49L16.3444 29.0016C13.8579 26.7459 11.8016 24.8075 10.1756 23.1865C8.54962 21.5652 7.26113 20.1224 6.31013 18.8579C5.35913 17.5936 4.69475 16.4402 4.317 15.3977C3.939 14.3555 3.75 13.2979 3.75 12.2249C3.75 10.0961 4.46775 8.31385 5.90325 6.8781C7.339 5.4426 9.12125 4.72485 11.25 4.72485C12.5595 4.72485 13.797 5.0311 14.9625 5.6436C16.128 6.2561 17.1405 7.13448 18 8.27873C18.8595 7.13448 19.872 6.2561 21.0375 5.6436C22.203 5.0311 23.4405 4.72485 24.75 4.72485C26.8787 4.72485 28.661 5.4426 30.0968 6.8781C31.5323 8.31385 32.25 10.0961 32.25 12.2249C32.25 13.2979 32.061 14.3555 31.683 15.3977C31.3053 16.4402 30.6409 17.5936 29.6899 18.8579C28.7389 20.1224 27.4528 21.5652 25.8315 23.1865C24.2105 24.8075 22.1519 26.7459 19.6556 29.0016L18 30.49ZM18 27.4499C20.4 25.2904 22.375 23.4394 23.925 21.8969C25.475 20.3546 26.7 19.0147 27.6 17.8772C28.5 16.7397 29.125 15.7296 29.475 14.8469C29.825 13.9644 30 13.0904 30 12.2249C30 10.7249 29.5 9.47485 28.5 8.47485C27.5 7.47485 26.25 6.97485 24.75 6.97485C23.5655 6.97485 22.4708 7.31085 21.4657 7.98285C20.461 8.6551 19.6654 9.59023 19.0789 10.7882H16.9211C16.3249 9.58048 15.5268 8.64298 14.5268 7.97573C13.5268 7.30848 12.4345 6.97485 11.25 6.97485C9.7595 6.97485 8.51188 7.47485 7.50712 8.47485C6.50237 9.47485 6 10.7249 6 12.2249C6 13.0904 6.175 13.9644 6.525 14.8469C6.875 15.7296 7.5 16.7397 8.4 17.8772C9.3 19.0147 10.525 20.3522 12.075 21.8897C13.625 23.4272 15.6 25.2806 18 27.4499Z"
                      fill={favorite ? 'var(--hoverColor)' : 'var(--baseColorText)'}
                    />
                  </svg>

                </button>

                <button
                  className="py-5 flex items-end flex-col  cursor-pointer"
                  onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                >
                  <svg
                    width="24"
                    height="26"
                    viewBox="0 0 24 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.96163 25.7213C4.21362 25.7213 3.57463 25.4564 3.04463 24.9267C2.51488 24.3967 2.25 23.7577 2.25 23.0097V3.97128H0.75V1.72128H7.5V0.394531H16.5V1.72128H23.25V3.97128H21.75V23.0097C21.75 23.7674 21.4875 24.4088 20.9625 24.9338C20.4375 25.4588 19.7961 25.7213 19.0384 25.7213H4.96163ZM19.5 3.97128H4.5V23.0097C4.5 23.1444 4.54325 23.255 4.62975 23.3415C4.71625 23.428 4.82688 23.4713 4.96163 23.4713H19.0384C19.1539 23.4713 19.2596 23.4232 19.3556 23.3269C19.4519 23.2309 19.5 23.1252 19.5 23.0097V3.97128ZM8.106 20.4713H10.3556V6.97128H8.106V20.4713ZM13.6444 20.4713H15.894V6.97128H13.6444V20.4713Z"
                      fill="#636F7B"
                    />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        )
      })}
    </div>
  )
}
