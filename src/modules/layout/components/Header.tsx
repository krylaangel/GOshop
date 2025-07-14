import { useEffect, useState } from 'react'
import Icons from '~/assets/images/icon-sprite.svg'
import { ROUTES } from '~/shared/constants/routes'
import NavigationComponent from './Navigation/Navigation'

function HeaderComponent() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  useEffect(() => {
    if (isNavOpen) {
      document.body.classList.add('overflow-hidden')
    }
    else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isNavOpen])
  return (
    <header className="h-[68px] sm:h-[136px] items-center clamp relative flex justify-between">
      <div className="flex">
        <button
          id="burgerButton"
          className={`h-9 w-9 lg:hidden flex items-center justify-center ${
            isNavOpen
              ? 'absolute right-4 [@media(min-width:480px)]:right-[clamp(20px,8vw,200px)] order-last ml-auto'
              : ''
          }`}
          onClick={() => setIsNavOpen(prev => !prev)}
          type="button"
        >
          <svg className="icons__states w-5 h-5 sm:w-7 sm:h-7">
            <use
              href={`${Icons}#${isNavOpen ? 'header_burger-close' : 'header_burger'}`}
            />
          </svg>
        </button>
        <a className="flex-center pe-12" href="/">
          <svg className="w-[43px] h-7 sm:w-[73px]! sm:h-[42px]!">
            <use href={`${Icons}#logo`} />
          </svg>
        </a>
      </div>
      <NavigationComponent isOpen={isNavOpen} onCloseMenu={() => setIsNavOpen(false)} />
      <div
        className={`py-1 gap-2 whitespace-nowrap
        ${isNavOpen ? 'hidden lg:flex' : 'flex'}`}
      >
        <button>
          <svg className="icons__states header__icons">
            <use href={`${Icons}#header_search`} />
          </svg>
        </button>
        <button>
          <svg className="icons__states header__icons">
            <use href={`${Icons}#header_cart`} />
          </svg>
        </button>
        <button>
          <svg className="icons__states header__icons">
            <use href={`${Icons}#header_heart`} />
          </svg>
        </button>
        <a href={ROUTES.AUTH_ROUTE}>
          <svg className="icons__states header__icons">
            <use href={`${Icons}#header_profile`} />
          </svg>
        </a>
      </div>
    </header>
  )
}

export default HeaderComponent
