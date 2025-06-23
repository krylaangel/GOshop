import type { ReactNode } from 'react'
import styles from './../FooterLink.module.css'

interface SectionIntroProps {
  title: string
  children?: ReactNode
}

function SectionIntro({ title, children }: SectionIntroProps) {
  return (
    <div>
      <h1 className={`${styles.mainTitle} clamp`}>{title}</h1>
      <p className={`${styles.textParagraph} clamp`}>{children}</p>
    </div>
  )
}
export default SectionIntro
