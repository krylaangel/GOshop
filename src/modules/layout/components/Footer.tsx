import { useNavigate } from 'react-router-dom'
import Icons from '~/assets/images/icon-sprite.svg'
import Button from '~/shared/components/Button/Button'
import getImageURL from '~/shared/utils/imageUtils'

function FooterComponent() {
  const navigate = useNavigate()

  return (
    <footer
      style={{
        backgroundImage: `linear-gradient(to right, rgba(2, 0, 66, 0.5), rgba(2, 0, 66, 0.5)),
            url(${getImageURL('footer-bg.png')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className="clamp py-8 lg:py-12"
    >
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-3">
        <svg className="col-span-1 w-12 h-10 sm:w-[73px] sm:h-[42px]">
          <use href={`${Icons}#logo`}></use>
        </svg>

        <div className="font-medium col-span-2 md:col-span-1 justify-self-start">
          <h4 className="footer-text footer-title pb-3 pt-6 sm:pt-0 sm:pb-4 ">
            Інформація для покупців
          </h4>
          <div className="flex flex-col items-start gap-y-2">
            <Button
              variant="tertiary_light"
              className="footer-text footer-links"
              onClick={() => navigate('/about')}
            >
              Про компанію
            </Button>

            <Button
              variant="tertiary_light"
              className="footer-text footer-links"
              onClick={() => navigate('/deliveryAndPayment')}
            >
              Оплата і доставка
            </Button>
            <Button
              variant="tertiary_light"
              className="footer-text footer-links"
              onClick={() => navigate('/returnOfGoods')}
            >
              Повернення товару
            </Button>
            <Button
              variant="tertiary_light"
              className="footer-text footer-links"
              onClick={() => navigate('/chooseSize')}
            >
              Як обрати розмір
            </Button>

            <Button
              variant="tertiary_light"
              className="footer-text footer-links"
              onClick={() => navigate('/userAgreement')}
            >
              Угода користувача
            </Button>

            <Button
              variant="tertiary_light"
              className="footer-text footer-links"
              onClick={() => navigate('/privacyPolicy')}
            >
              Політика конфіденційності
            </Button>
          </div>

        </div>
        <div className="font-medium col-span-1 justify-self-start md:justify-self-end">
          <h4 className="footer-text footer-title pb-4 pt-4 sm:pt-0">
            Гаряча лінія
          </h4>
          <div className="flex items-center text-center gap-4">
            <svg width="18" height="18">
              <use href={`${Icons}#footer_phone`}></use>
            </svg>
            <a
              href="tel:+380674478103"
              className="footer-text footer-links whitespace-nowrap"
            >
              +38(067) 000-00-00
            </a>
          </div>
          <h4 className="footer-text footer-title pt-4 sm:pt-[34px] pb-2 whitespace-nowrap">
            Ми у соціальних мережах
          </h4>
          <div className="flex flex-row gap-x-5">
            <Button
              variant="tertiary_light"
              className="w-6 h-6"
              onClick={() => navigate('#')}
            >
              <svg fill="currentColor" className="w-6 h-6">
                <use href={`${Icons}#footer_facebook`}></use>
              </svg>
            </Button>
            <Button
              variant="tertiary_light"
              className="w-6 h-6"
              onClick={() => navigate('#')}
            >
              <svg fill="currentColor" className="w-6 h-6">
                <use href={`${Icons}#footer_instagram`}></use>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent
