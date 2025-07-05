import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let [count, setCount] = useState(0)
  // Now we have to call this inside out function
  // let count = 0

  const AddCount = () => {
    console.log("Ahh!!", Math.random());
    if (count < 20) {
        setCount(count+1)
        
      }

    if (count === 20){
      alert("Now I will Hit You!!")
    }

    // count += 1;
    console.log(count);
    // setCount(count)
    
  }

    const deccreaseCount = () => {
    console.log("Ohh!!", Math.random());
    if (count > 0){
      setCount(count - 1)
      
    }
    if (count === 0){
      alert("Thank You For your kindness...")
    }
    // count -= 1
    console.log(count);
    
  }

  return (
    <>
      <h1>Lets Hit</h1>
      <b><h2>You have hit me {count} Times</h2></b>

      <button className="Hitbtn"
      onClick = {AddCount}
      >Hit</button>
      <button className="Carebtn"
      onClick = {deccreaseCount}
      >Care</button>
    </>
  )
}

export default App
