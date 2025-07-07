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
    const element = ref.current
    if (!element)
      return

    if (isMenuOpen) {
      setContentHeight(element.scrollHeight)
    }
  }, [isMenuOpen, ...deps])

  useEffect(() => {
    if (ref.current) {
      setContentHeight(ref.current.scrollHeight)
    }
  }, [isMenuOpen, ...deps])

  useEffect(() => {
    if (!isMenuOpen) {
      setContentHeight(0)
    }
  }, [isMenuOpen])

  return useSpring({
    opacity: isMenuOpen ? 1 : 0,
    height: isMenuOpen ? `${contentHeight}px` : '0px',
    config: isMenuOpen
      ? { tension: 200, friction: 28 }
      : { tension: 150, friction: 20 },
  })
}
