import type { SpringValue } from 'react-spring'
import { type RefObject, useLayoutEffect, useState } from 'react'
import { useSpring } from 'react-spring'

interface useExpandableSpringProps {
  ref: RefObject<HTMLElement | null>
  children?: unknown[]
  expanded: boolean
  maxLines: number
  lineHeight: number
}
interface UseExpandableSpringReturn {
  styles: {
    height: SpringValue<string>
    opacity: SpringValue<number>
  }
}
export function useExpandableSpring({
  ref,
  children = [],
  expanded,
  lineHeight,
  maxLines,
}: useExpandableSpringProps): UseExpandableSpringReturn {
  const clampHeight = maxLines * lineHeight

  const [contentHeight, setContentHeight] = useState<number>(clampHeight)

  useLayoutEffect(() => {
    if (ref.current) {
      setContentHeight(expanded ? ref.current.scrollHeight : clampHeight)
    }
  }, [expanded, children])

  const styles = useSpring({
    height: `${contentHeight}px`,
    opacity: expanded ? 1 : 0.9,
    config: expanded
      ? { tension: 200, friction: 28 }
      : { tension: 150, friction: 20 },
  })
  return { styles }
}
