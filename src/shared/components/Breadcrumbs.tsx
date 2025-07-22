import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useProductStore } from '~/store/useProductStore'

function Breadcrumbs() {
  const location = useLocation()

  const pathNames = location.pathname.split('/').filter(x => x)
  const { categoryTree: globalTree, productName: globalName } = useProductStore()

  const state = location.state ?? {}
  const categoryTree: string[] = state.categoryTree ?? globalTree
  const productName: string = state.productName ?? globalName
  const crumbs = categoryTree.length > 0 ? categoryTree : pathNames

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex h-[25px] gap-x-2 leading-[140%] text-sm font-light text-[var(--baseColorText)]">
        <li>
          <Link to="/">Головна</Link>
          {(crumbs.length > 0 || productName) && ' / '}
        </li>

        {crumbs.map((name, index) => {
          const routeTo = `/${crumbs.slice(0, index + 1).join('/')}`
          const isLast = index === crumbs.length - 1 && !productName
          return (
            <li key={routeTo}>
              {isLast
                ? (
                    <span>{name}</span>
                  )
                : (
                    <>
                      <Link to={routeTo}>{name}</Link>
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
