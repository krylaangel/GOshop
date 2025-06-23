import Button from '~/shared/components/Button/Button'
import getImageURL from '~/shared/utils/imageUtils'

function NotFoundPage() {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${getImageURL('aut-img.png')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className="flex-center flex-col min-h-screen h-full w-full clamp"
    >
      <h1 className="font-bold text-[32px]">
        Схоже, ми не можемо знайти цю сторінку
      </h1>
      <p
        className="text-[145px] font-black text-[var(--buttonColor)] my-[10px] leading-none
            [text-shadow:_-1px_-1px_0_#fff,_1px_-1px_0_#fff,_-1px_1px_0_#fff,_1px_1px_0_#fff]"
      >
        404
      </p>
      <p className="text-xl font-normal leading-[140%]">
        Запрошуємо Вас на основні розділи сайту
      </p>
      <Button
        variant="primary"
        className="mt-8 px-11 py-2 text-sm font-medium"
        onClick={() => (window.location.href = '/')}
      >
        Повернутись на головну
      </Button>
    </div>
  )
}

export default NotFoundPage
