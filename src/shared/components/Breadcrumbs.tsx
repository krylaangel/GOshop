import type { UUID } from '@api/types'
import findBreadcrumbPath from '@layout/components/Navigation/findBreadcrumbPath'
import { categorySlugMap } from '@shared/constants/categoryUUIDMap'
import React from 'react'
import { Link } from 'react-router-dom'

interface BreadcrumbProps {
  categoryId: string
  productName?: string
}
function Breadcrumbs({ categoryId, productName }: BreadcrumbProps) {
  const categorySlug = categorySlugMap[categoryId as UUID]
  const breadcrumbs = findBreadcrumbPath(categorySlug) ?? []

  const capitalizeFirst = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex flex-wrap h-[25px] gap-x-2 leading-[140%] text-sm font-light text-[var(--baseColorText)]">
        <li>
          <Link to="/">Головна</Link>
          {(breadcrumbs.length > 0 || productName) && ' / '}
        </li>

        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1 && !productName
          return (
            <li key={crumb.href}>
              {isLast
                ? (
                    <span>{capitalizeFirst(crumb.label)}</span>
                  )
                : (
                    <>
                      <Link to={crumb.href}>{capitalizeFirst(crumb.label)}</Link>
                      {' '}
                      {' '}
                      /
                      {' '}
                    </>
                  )}
            </li>
          )
        })}
        {productName && (
          <li>
            <span>{productName}</span>
          </li>
        )}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
