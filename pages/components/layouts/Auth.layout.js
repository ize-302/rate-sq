import React from 'react'

export default function AuthLayout({ children, header }) {
  return (
    <div className='flex h-screen'>
      <div className='bg-white h-full w-1/2 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{header}</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {children}
        </div>
      </div>
      <div className='bg-black h-full w-1/2'></div>
    </div>
  )
}