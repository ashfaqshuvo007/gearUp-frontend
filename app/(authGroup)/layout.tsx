import React from 'react'

const AuthGroupLayout = (
    {
        children
    } : {
        children: React.ReactNode
    }
) => {
  return (
    <div className='bg-sky-200'>
        {children}
    </div>
  )
}

export default AuthGroupLayout