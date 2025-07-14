import type { RefObject } from 'react'
import type { SpringValue } from 'react-spring'
import { useEffect, useState } from 'react'
import { useSpring } from 'react-spring'

interface UseAnimatedHeightProps {
  ref: RefObject<HTMLElement | null>
  deps?: unknown[]
  isMenuOpen: boolean
}

interface AnimatedStyles {
  opacity: SpringValue<number>
  height: SpringValue<string>
}

export function useAnimatedHeight({
  ref,
  deps = [],
  isMenuOpen,
}: UseAnimatedHeightProps): AnimatedStyles {
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      setContentHeight(ref.current.scrollHeight)
    }
  }, [isMenuOpen, ...deps])

  return useSpring({
    opacity: isMenuOpen ? 1 : 0,
    height: isMenuOpen ? `${contentHeight}px` : '0px',
    config: { tension: 180, friction: 25 },
  })
}
