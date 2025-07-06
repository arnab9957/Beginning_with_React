import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button className='bg-violet-900'>Violate</button>
      <button className='bg-blue-800'>Blue</button>
      <button className='bg-sky-900'>SKY</button>
      <button className='bg-green-900'>Green</button>
      <button className='bg-yellow-900'>Yellow</button>
      <button className='bg-orange-900'>Orange</button>
      <button className='bg-red-900'>Red</button>
    </>
  )
}

export default App
