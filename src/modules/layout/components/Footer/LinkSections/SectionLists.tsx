import React from 'react'
import styles from './../FooterLink.module.css'

interface SectionListsProps {
  additionalClass?: string
  children?: React.ReactNode
  lists?: {
    paragraph?: string
    title?: string
    items: (string | React.ReactNode)[]
  }[]
  className?: string
}
function SectionLists({
  className = '',
  lists = [],
  additionalClass = '',
  children,
}: SectionListsProps) {
  return (
    <>
      {lists.map((list, idx) => (
        <div key={idx} className={`${className} clamp`}>
          {list.title && (
            <h2 className="font-bold text-md sm:text-xl">{list.title}</h2>
          )}
          {list.paragraph && (
            <p className={styles.textParagraph}>{list.paragraph}</p>
          )}
          {' '}
          <ul className={`${additionalClass} pl-8`}>
            {list.items.map((item, i) => (
              <li key={i} className={styles.textParagraph}>
                {item}
              </li>
            ))}
          </ul>
          {children && <div>{children}</div>}
        </div>
      ))}
    </>
  )
}
export default SectionLists
