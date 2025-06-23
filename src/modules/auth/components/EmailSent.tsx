import Button from '@shared/components/Button/Button'
import getImageURL from '@shared/utils/imageUtils'

function EmailSent({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, rgba(2, 0, 66, 0.1), rgba(2, 0, 66, 0.3)),
            url(${getImageURL('aut-img.png')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className="w-[480px] text-white flex-center p-8 sm:p-15 mb-10"
    >
      <p className="text-base font-normal">
        Електронний лист надіслано на вашу адресу email@domain.com. Перевірте
        наявність електронного листа.
      </p>
      <Button className="button__auth" onClick={onNavigate}>
        Повернутись на головну
      </Button>
    </div>
  )
}

export default EmailSent
