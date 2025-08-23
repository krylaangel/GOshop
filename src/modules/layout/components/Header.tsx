import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icons from '~/assets/images/icon-sprite.svg'
import { useAuthStore } from '~/store/useAuth'
import NavigationComponent from './Navigation/Navigation'

function HeaderComponent() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const navigate = useNavigate()
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

  const handleProfileClick = () => {
    navigate(isAuthenticated ? '/profile' : '/auth')
  }
  const handleCartClick = () => {
    navigate('/cart')
  }
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
        <button onClick={handleCartClick}>
          <svg className="icons__states header__icons">
            <use href={`${Icons}#header_cart`} />
          </svg>
        </button>
        <button>
          <svg className="icons__states header__icons">
            <use href={`${Icons}#header_heart`} />
          </svg>
        </button>
        <button onClick={handleProfileClick}>
          <svg className="icons__states header__icons">
            <use href={`${Icons}#header_profile`} />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default HeaderComponent
