import Button from '@shared/components/Button/Button'
import { useNavigate } from 'react-router-dom'

export interface CartMiniProps {
  totalSum: number
}
export function CartFooterMini({ totalSum }: CartMiniProps) {
  const navigate = useNavigate()
  const sale = 0
  const finishResult = totalSum - sale
  return (
    <div className="mt-6 w-full flex flex-col justify-between items-end">
      <Button variant="tertiary_dark" onClick={() => navigate('/cart')} className="px-2 py-4 text-sm">Редагувати</Button>
      <div className="flex justify-between w-full">
        <p className="text-base font-medium flex flex-wrap w-[71px]">Вартість доставки</p>
        <p className="text-sm font-light flex flex-wrap w-[87px]">за тарифами перевізника</p>
      </div>
      <div className="bg-[var(--hoverBorder)] rounded-[10px] py-6 px-3 flex flex-col gap-2 w-full">
        <div className="flex justify-between w-full">
          <p className="font-medium text-base text-[var(--colorMenu)]">Вартість товарів</p>
          <p className="font-bold text-lg text-[var(--colorMenu)]">
            {totalSum}
            {' '}
            грн
          </p>
        </div>
        <div className="flex justify-between w-full border-b border-[var(--hoverColor)] pb-[6px]">
          <p className="font-medium text-base text-[var(--colorMenu)]">Знижка</p>
          <p className="font-bold text-lg text-[var(--colorMenu)]">
            {sale}
            {' '}
            грн
          </p>
        </div>
        <div className="flex justify-between w-full pb-[6px]">
          <p className="font-medium text-base text-[var(--colorMenu)]">До оплати</p>
          <p className="font-bold text-lg text-[var(--colorMenu)]">
            {finishResult.toFixed(2)}
            {' '}
            грн
          </p>
        </div>
      </div>
    </div>
  )
}
