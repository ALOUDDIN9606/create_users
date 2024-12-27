import React from 'react'
import { useStore } from '../zustand'

const Header = () => {
  const {counter, wishlist} = useStore()

  return (
    <div>Header {counter}</div>
  )
}

export default Header


