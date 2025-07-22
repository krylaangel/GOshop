import type { RefObject } from 'react'
import type { SpringValue } from 'react-spring'
import { useEffect, useState } from 'react'
import { useSpring } from 'react-spring'

interface UseAnimatedHeightProps {
  ref: RefObject<HTMLElement | null>
  deps?: unknown[]
  open: boolean
}

interface AnimatedStyles {
  opacity: SpringValue<number>
  height: SpringValue<string>
}

export function useAnimatedHeight({
  ref,
  deps = [],
  open,
}: UseAnimatedHeightProps): AnimatedStyles {
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      setContentHeight(ref.current.scrollHeight)
    }
  }, [open, ...deps])

  return useSpring({
    opacity: open ? 1 : 0,
    height: open ? `${contentHeight}px` : '0px',
    config: { tension: 180, friction: 25 },
  })
}
