import type { ReactNode } from 'react'
import { useExpandableSpring } from '@shared/hooks/useExpandableSpring'
import { useRef, useState } from 'react'
import { animated } from 'react-spring'

interface ExpandedProps {
  children: ReactNode
  className?: string
}

export default function Expanded({ children, className = '' }: ExpandedProps) {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const lineHeight = 20
  const maxLines = 5
  const { styles } = useExpandableSpring({ ref, expanded, children: [children], lineHeight, maxLines })

  return (
    <div className={className}>
      <animated.div style={{ ...styles, overflow: 'hidden' }}>
        <div ref={ref} style={{ lineHeight: `${lineHeight}px` }}>
          {children}
        </div>
      </animated.div>

      <button
        onClick={() => setExpanded(prev => !prev)}
        className="cursor-pointer w-full text-right font-light text-sm leading-[140%] text-[var(--baseColorText)] mt-1"
      >
        {expanded ? 'Згорнути' : 'Показати весь'}
      </button>
    </div>
  )
}
