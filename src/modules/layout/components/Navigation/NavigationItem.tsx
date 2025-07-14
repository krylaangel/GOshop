import { useAnimatedHeight } from '@layout/components/Navigation/hooks/useAnimatedHeight'
import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { animated } from 'react-spring'
import Icons from '../../../../assets/images/icon-sprite.svg'

interface NavigationItemProps {
  label: string
  href: string
  children: { heading: string, submenu: { label: string, href: string }[] }[]
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  toggleMobileMenu?: () => void
  isActive?: boolean
  isMenuOpen?: boolean
  isFirst?: boolean
  isLast?: boolean
}

function NavigationItem({
  label,
  href,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  toggleMobileMenu,
  isActive,
  isMenuOpen = false,
  isFirst = false,
  isLast = false,
}: NavigationItemProps) {
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024

  const handleClick = (e: React.MouseEvent) => {
    if (!isDesktop) {
      e.preventDefault()
      onClick()
    }
  }
  const ref = useRef<HTMLDivElement>(null)
  const styles = useAnimatedHeight({ ref, isMenuOpen, deps: [children] })

  return (
    <li
      className={`relative w-full lg:px-6 static lg:h-[136px] items-center lg:flex border-b-2 border-[var(--hoverBorder)] lg:border-b-0 `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <NavLink
        to={href}
        onClick={handleClick}
      >
        {({ isActive: isCurrent }) => (
          <div
            className={`
        z-100 block flex items-center justify-between w-full text-[var(--baseColorText)] uppercase text-lg
        ${isFirst ? 'lg:pl-20 [@media(min-width:1193px)]:pl-[clamp(20px,100vw,150px)]' : ''}
        ${isLast ? 'lg:pr-20 [@media(min-width:1193px)]:pr-[clamp(20px,100vw,150px)]' : ''}
        ${isMenuOpen ? 'border-b-2 border-[var(--hoverBorder)] pt-[7px] lg:pt-0 pb-[7px] lg:pb-0' : ''}
      `}
          >
            <span className={`menu-header-lg w-fit ${isCurrent || isActive ? 'menu-header-lg__active' : ''}`}>
              {label}
            </span>
            <span className="lg:hidden ml-2 w-8 h-8 flex items-center justify-center">
              <svg className="h-[13px] sm:h-[20px] w-[13px] sm:w-[20px]">
                <use href={`${Icons}#${isMenuOpen ? 'header_arrow-close' : 'header_arrow-open'}`} />
              </svg>
            </span>
          </div>
        )}
      </NavLink>

      {!isDesktop && (
        <animated.div style={{ ...styles, overflow: 'hidden' }} ref={ref} className="bg-white pb-1">
          {isMenuOpen && children.map((category, idx) => (
            <div key={idx} className="mt-4 space-y-2">
              {category.heading && (
                <h3 className="font-normal uppercase text-[var(--hoverColor)]">{category.heading}</h3>
              )}
              <ul className="w-full lg:grid grid-flow-col auto-rows-auto grid-rows-3 gap-x-8 gap-y-2">
                {category.submenu.map((item, subIdx) => (
                  <li key={subIdx}>
                    <NavLink
                      to={item.href}
                      className="font-light hover:text-[var(--hoverColor)]"
                      onClick={() => {
                        if (isMenuOpen && toggleMobileMenu)
                          toggleMobileMenu()
                      }}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </animated.div>
      )}

    </li>
  )
}

export default NavigationItem
