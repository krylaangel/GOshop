import Expanded from '@shared/components/Expanded'
import Icons from '~/assets/images/icon-sprite.svg'

export default function ProductDescription() {
  const description = ' Спортивний костюм від бренду Puma відтворює новий погляд на розкішний\n'
    + '          одяг для відпочинку, поєднуючи в собі стиль, комфорт та\n'
    + '          універсальність. Вона виготовлена з м\'якого мікрофлісу, який у\n'
    + '          поєднанні з технологією Therma-Fit контролюватиме природним теплом\n'
    + '          Вашого тіла, даруючи відчуття даруючи відчуття комфорту навіть у прохолодні дні.\n'
    + '          Костюм ідеально підходить як для активного способу життя, так і для затишного відпочинку вдома.\n'
    + '          Його сучасний крій, еластичні манжети та продуманий дизайн підкреслюють силует, а класичне брендоване лого\n'
    + '          Puma додає стильного акценту.\n'
    + '          Цей костюм стане незамінним елементом Вашого гардеробу в будь-яку пору року.'
  return (
    <div className="col-span-1 flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-[var(--colorMenu)] font-normal text-[20px] leading-[140%] tracking-wide">
          Опис товару
        </h2>

        <Expanded className="tracking-wide font-light text-sm leading-[140%]">
          {description}
        </Expanded>
      </div>
      <div className="flex flex-col gap-y-2 justify-end">
        <div className="flex gap-x-2">
          <svg className="icons__states w-6 h-6">
            <use href={`${Icons}#product_payProduct`} />
          </svg>
          <h2 className="text-[var(--colorMenu)] font-medium text-base leading-[140%] tracking-wide">
            Оплата
          </h2>
        </div>
        <p className="product-pay">
          Банківські картки (Visa, MasterCard, Maestro)
        </p>
        <p className="product-pay">
          Електронні гаманці (PayPal, Apple Pay, Google Pay)
        </p>
        <p className="product-pay">Банківський переказ</p>
        <p className="product-pay">Оплата при отриманні (п післяплата)</p>
      </div>
      <div className="flex flex-col gap-y-2 justify-end">
        <div className="flex gap-x-2">
          <svg className="icons__states w-6 h-4">
            <use href={`${Icons}#product_deliveryProduct`} />
          </svg>
          <h2 className="text-[var(--colorMenu)] font-medium text-base leading-[140%] tracking-wide">
            Доставка
          </h2>
        </div>
        <p className="product-delivery">Кур'єр Нова Пошта</p>
        <p className="product-delivery">Відділення Нова Пошта</p>
        <p className="product-delivery">Поштомат Нова Пошта</p>
        <p className="product-delivery">Самовивіз</p>
      </div>
    </div>
  )
}
