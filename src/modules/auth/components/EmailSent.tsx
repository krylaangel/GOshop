import Button from '@shared/components/Button/Button'

function EmailSent({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div
      className="flex flex-col"
    >
      <p className="text-lg font-light leading-[140%]">
        Лист було надіслано на вашу електронну адресу. Будь ласка, перевірте пошту для підтвердження реєстрації.
      </p>
      <Button className="button__auth px-4 py-2" onClick={onNavigate}>
        Повернутись на головну
      </Button>
    </div>
  )
}

export default EmailSent
