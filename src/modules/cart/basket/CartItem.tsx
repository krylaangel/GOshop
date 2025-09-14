import Button from '@shared/components/Button/Button'
import getImageURL from '@shared/utils/imageUtils'
import Icons from '~/assets/images/icon-sprite.svg'
import { useCartStore } from '~/store/useCartStore'

export function CartItem() {
  const removeFromCart = useCartStore(state => state.removeFromCart)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const defaultImage = getImageURL('default-product-card.png')
  const cart = useCartStore(state => state.cart)

  return (
    <div className="flex flex-col mt-[30px]">
      {cart.map((item) => {
        const price = item.price
        const salePrice = item.salePrice
        const hasDiscount = salePrice < price
        const currentPrice = hasDiscount ? salePrice : price
        const total = currentPrice * item.quantity
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
                <button className=" py-4 hidden sm:flex items-end flex-col gap-[6px]">
                  <svg className="icons__states w-9 h-9">
                    <use href={`${Icons}#header_heart`} />
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
