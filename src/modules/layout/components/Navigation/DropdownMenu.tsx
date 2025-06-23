import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { animated, useSpring } from 'react-spring'

interface DropdownMenuProps {
  submenu: { heading: string, submenu: { label: string, href: string }[] }[]
  onMouseLeave: () => void
  onMouseEnter: () => void
  isMenuOpen: boolean
}

function DropdownMenu({ isMenuOpen, submenu, onMouseLeave, onMouseEnter }: DropdownMenuProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      setContentHeight(ref.current.scrollHeight)
    }
  }, [submenu, isMenuOpen])

  const styles = useSpring({
    opacity: isMenuOpen ? 1 : 0,
    height: isMenuOpen ? contentHeight : 0,
    config: { tension: 180, friction: 25 },
  })

  return (
    <animated.div
      style={styles}
      className="lg:absolute left-0 w-full lg:top-full min-w-[300px] lg:bg-[var(--secondaryBgColor)] overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div ref={ref} className="pb-2 lg:p-12 clamp">
        <div className={`lg:grid ${submenu.length > 1 ? 'grid-cols-[160px_auto]' : 'grid-cols-1'}`}>
          {submenu.map((category, idx) => (
            <div className="mt-2 lg:mt-4 space-y-2" key={idx}>
              <h3 className="font-normal uppercase text-[var(--hoverColor)]">
                {category.heading}
              </h3>
              <ul className={`w-full lg:grid grid-flow-col ${
                submenu.length > 1
                  ? idx === 0
                    ? 'grid-rows-3'
                    : 'grid-rows-2'
                  : 'grid-rows-2'
              } gap-x-8 gap-y-2`}
              >
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
      </div>
    </animated.div>
  )
}

export default DropdownMenu
