import { NavLink } from 'react-router-dom'
import Icons from '../../../../assets/images/icon-sprite.svg'
import React from "react";

interface NavigationItemProps {
  label: string
  href: string
  children: { heading: string, submenu: { label: string, href: string }[] }[]
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  isActive?: boolean
  isMenuOpen?: boolean
}

function NavigationItem({
  label,
  href,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isActive,
  isMenuOpen,
}: NavigationItemProps) {
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024

  const handleClick = (e: React.MouseEvent) => {
    if (!isDesktop) {
      e.preventDefault()
      onClick()
    }
  }
  return (
    <li
      className={`relative w-full lg:px-6 static lg:h-[136px] items-center lg:flex border-b-2 border-[var(--hoverBorder)] lg:border-b-0 `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <NavLink
        to={href}
        onClick={
            handleClick
          }
        className={({ isActive: isCurrent }) =>
          `block flex items-center justify-between w-full text-[var(--baseColorText)] uppercase text-lg menu-header-lg ${isActive || isCurrent ? 'menu-header-lg__active' : ''
          } ${isMenuOpen ? 'border-b-2 border-[var(--hoverBorder)] pt-[7px] lg:pt-0 pb-[7px] lg:pb-0' : ''}`}
      >
        <span>{label}</span>
        <span className="lg:hidden ml-2 w-8 h-8 flex items-center justify-center">
          <svg className="h-[13px] sm:h-[20px] w-[13px] sm:w-[20px]">
            <use href={`${Icons}#${isMenuOpen ? 'header_arrow-close' : 'header_arrow-open'}`} />
          </svg>
        </span>
      </NavLink>

      {!isDesktop && isMenuOpen && (
        <div className="bg-white pb-2">
          {children.map((category, idx) => (
            <div key={idx} className="mt-2 lg:mt-4 space-y-2">
              {category.heading && (
                <h3 className="font-normal uppercase text-[var(--hoverColor)]">{category.heading}</h3>
              )}
              <ul className="w-full lg:grid grid-flow-col auto-rows-auto grid-rows-3 gap-x-8 gap-y-2">
                {category.submenu.map((item, subIdx) => (
                  <li key={subIdx}>
                    <NavLink
                      to={item.href}
                      className="font-light hover:text-[var(--hoverColor)]"
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </li>
  )
}

export default NavigationItem
