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
  const breadcrumbs = (findBreadcrumbPath(categorySlug) ?? []).filter(
    crumb => crumb?.label && crumb?.href,
  )

  const capitalizeFirst = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex flex-wrap h-[25px] gap-x-1 leading-[140%] text-sm font-light text-[var(--baseColorText)]">
        <li>
          <Link to="/">Головна</Link>
        </li>

        {breadcrumbs.map(crumb => (
          <React.Fragment key={crumb.href}>
            <li>/</li>
            <li>
              <Link to={crumb.href}>{capitalizeFirst(crumb.label)}</Link>
            </li>
          </React.Fragment>
        ))}

        {productName && (
          <>
            <li>/</li>
            <li>
              <span>{productName}</span>
            </li>
          </>
        )}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
