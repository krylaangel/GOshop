import React from 'react'
import getImageURL from '~/shared/utils/imageUtils'

function AuthContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-container flex-center">
      <div
        style={{
          backgroundImage: `linear-gradient(to right, rgba(2, 0, 66, 0.1), rgba(2, 0, 66, 0.3)),
            url(${getImageURL('aut-img.png')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className="w-[480px] text-white flex-center p-8 sm:px-15 sm:pb-15 sm:pt-20 m-5"
      >
        {children}
      </div>
    </div>
  )
}

export default AuthContainer
