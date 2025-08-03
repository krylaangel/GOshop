import type { ReactNode } from 'react'
import type { ButtonVariant } from '~/shared/components/Button/Button'
import Button from '@shared/components/Button/Button'
import { useExpandableSpring } from '@shared/hooks/useExpandableSpring'
import { useEffect } from 'react'
import { useRef, useState } from 'react'
import { animated } from 'react-spring'

interface ExpandedProps {
  children: ReactNode
  className?: string
  variant?: ButtonVariant
  classNameButton?: string
}

export default function Expanded({ children, variant, classNameButton = '', className = '' }: ExpandedProps) {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [shouldShowButton, setShouldShowButton] = useState(false)

  const lineHeight = 20
  const maxLines = 3
  const maxHeight = lineHeight * maxLines

  const { styles } = useExpandableSpring({ ref, expanded, children: [children], lineHeight, maxLines })
  useEffect(() => {
    if (ref.current) {
      const height = ref.current.scrollHeight
      setShouldShowButton(height > maxHeight)
    }
  }, [children])

  return (
    <div className={className}>
      <animated.div style={{ ...styles, overflow: 'hidden' }}>
        <div ref={ref} style={{ lineHeight: `${lineHeight}px` }}>
          {children}
        </div>
      </animated.div>
      {shouldShowButton && (
        <div className="w-full flex justify-end">
          <Button
            variant={variant}
            onClick={() => setExpanded(prev => !prev)}
            className={classNameButton}
          >
            {expanded ? 'Згорнути' : 'Показати весь'}
          </Button>
        </div>
      )}

    </div>
  )
}
