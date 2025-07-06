import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './Component/cards'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <b><h1 className='bg-amber-700 text-white rounded-2xl p-5 align-bottom'>TailWind Css Activation Test: </h1></b>
      <Card name="Arnab" anobj={{ Username: "Arnabk",
                                  pass: "Arnab@123",
                                  age: 20
      }} my arr = {[1,2,3,4]} boardedPrize = {256} />
      <Card boardedPrize = {677} />
      <Card boardedPrize = {387} />
      <Card />


    </>
  )
}

export default App
