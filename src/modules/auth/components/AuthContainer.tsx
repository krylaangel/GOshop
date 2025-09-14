import React from 'react'

function AuthContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-container flex-center">
      <div className="w-[480px] text-white flex-center p-8 sm:px-15 sm:pb-15 sm:pt-20 m-5">
        {children}
      </div>
    </div>
  )
}

export default AuthContainer
