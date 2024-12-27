import React from 'react'
import { useStore } from '../zustand'

const Hero = () => {
  const {increment, decrement} = useStore()

  return (
    <div>
        <h1>Hero Component</h1>
        <button onClick={() => increment(1)}>Increment</button>
        <button onClick={decrement}>Decrement</button>
    </div>
  )
}

export default Hero
