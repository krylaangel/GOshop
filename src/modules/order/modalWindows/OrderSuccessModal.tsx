import type { JSX } from 'react'
import Button from '@shared/components/Button/Button'
import getImageURL from '@shared/utils/imageUtils'
import { useNavigate } from 'react-router-dom'

interface OrderSuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export function OrderSuccessModal({ isOpen, onClose }: OrderSuccessModalProps): JSX.Element | null {
  if (!isOpen)
    return null

  const navigate = useNavigate()

  return (
    <div
      className="fixed inset-0 z-50  bg-black/70 h-full w-full flex-center"
    >
      <div
        className="flex items-center justify-center flex-col gap-y-4 p-6 rounded-lg m-2"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(2, 0, 66, 0.1), rgba(2, 0, 66, 0.3)),
            url(${getImageURL('aut-img.png')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <p className="text-lg font-light text-white">✅ Ваше замовлення успішно створено!</p>
        <p className="text-white text-base font-extralight mb-6">
          Ви будете перенаправлені на головну
          сторінку...
        </p>
        <Button
          variant="secondary"
          onClick={() => {
            onClose()
            navigate('/')
          }}
          className="px-4 py-2"
        >
          На головну
        </Button>
      </div>

    </div>
  )
}
