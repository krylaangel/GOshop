import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Breadcrumbs() {
  const location = useLocation()

  const pathNames = location.pathname.split('/').filter(x => x)

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex h-[25px] gap-x-2 leading-[140%] text-sm font-light text-[var(--baseColorText)]">
        <li>
          <Link to="/">Головна</Link>
          {pathNames.length > 0 && ' / '}
        </li>
        {pathNames.map((name, index) => {
          const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`
          const isLast = index === pathNames.length - 1

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
      </ol>
    </nav>
  )
}

export default Breadcrumbs
