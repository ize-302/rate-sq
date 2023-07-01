import React from 'react'

export const Container = ({ children, maxW }) => {
  return (
    <div className={`${maxW ? maxW : 'max-w-7xl'} mx-auto w-full px-4 h-full`}>{children}</div>
  )
}