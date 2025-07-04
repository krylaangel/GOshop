import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useWindowsSize } from '~/hooks/useWindowsSize'
import DropdownMenu from './DropdownMenu'
import { menuData } from './menuData'
import NavigationItem from './NavigationItem'

interface NavigationProps {
  isOpen: boolean
}

const NavigationComponent: React.FC<NavigationProps> = ({ isOpen }) => {
  const location = useLocation()
  const [activeIndex, setActiveIndex] = useState <number | null> (null)
  const [isDesktop, setIsDesktop] = useState <boolean> (window.innerWidth >= 1024)
  const [openMobileIndex, setOpenMobileIndex] = useState <number | null> (null)
  const { width } = useWindowsSize()
  useEffect(() => {
    const index = menuData.findIndex(menu => location.pathname.startsWith(menu.href))
    setActiveIndex(index !== -1 ? index : null)
  }, [location.pathname])

  useEffect(() => {
    setIsDesktop(width >= 1024)
    setOpenMobileIndex(null)
  }, [width])

  return (
    <nav
      className={`left-0 z-10 top-full w-full absolute lg:static lg:flex justify-center transition-all duration-500 ease-in-out ${
        !isDesktop
          ? isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
          : 'opacity-100 pointer-events-auto'
      }`}
    >
      <ul
        className={`${!isDesktop ? 'clamp' : ''} h-screen overflow-y-auto lg:h-auto flex whitespace-nowrap lg:items-center
          lg:flex-row lg:static lg:justify-center
          flex-col bg-white z-10
          lg:flex bg-[var(--secondaryBgColor)]`}
      >
        {menuData.map(({ label, href, children }, index) => (
          <NavigationItem
            key={href}
            label={label}
            href={href}
            children={children}
            isActive={isDesktop ? activeIndex === index : openMobileIndex === index}
            isMenuOpen={!isDesktop && openMobileIndex === index}
            onClick={() => {
              if (isDesktop)
                return
              setOpenMobileIndex(prev => (prev === index ? null : index))
            }}
            onMouseEnter={() => isDesktop && setActiveIndex(index)}
            onMouseLeave={() => isDesktop && setActiveIndex(null)}
          />
        ))}
      </ul>

      {isDesktop && (
        <DropdownMenu
          submenu={activeIndex !== null ? menuData[activeIndex].children : []}
          onMouseEnter={() => {
            if (activeIndex !== null)
              setActiveIndex(activeIndex)
          }}
          onMouseLeave={() => setActiveIndex(null)}
          isMenuOpen={activeIndex !== null}
        />
      )}
    </nav>
  )
}

export default NavigationComponent
