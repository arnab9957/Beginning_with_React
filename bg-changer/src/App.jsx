import { useState } from "react"

function App() {
  const [color, setColor] = useState("Black")

  return (
    <>
    <div className="w full  h-screen duration-200" 
    style={{backgroundColor: color}}>
    <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2 ">
      <div className="flex flex-wrap justify-center gap-4 shadow-2xl p-16 font-bold bg-gray-400 rounded-b-full ">
      <button onClick={ () => setColor("red")}
      className="bg-violet-900 size-20px px-3 py-4 rounded-2xl font-extrabold text-white shadow-neutral-950"
        >Violate</button>
      <button onClick={ () => setColor("blue")}
       className="bg-violet-900 size-20px px-3 py-4 rounded-2xl font-extrabold text-white shadow-neutral-950"  >Blue</button>
      <button onClick={ () => setColor("sky")}
      className="bg-violet-900 size-20px px-3 py-4 rounded-2xl font-extrabold text-white shadow-neutral-950"  >Sky</button>

      <button onClick={ () => setColor("green")}
      className="bg-violet-900 size-20px px-3 py-4 rounded-2xl font-extrabold text-white shadow-neutral-950"  >Green</button>
      <button onClick={ () => setColor("yellow")}
      className="bg-violet-900 size-20px px-3 py-4 rounded-2xl font-extrabold text-white shadow-neutral-950"  >Yellow</button>
      <button onClick={ () => setColor("orange")}
      className="bg-violet-900 size-20px px-3 py-4 rounded-2xl font-extrabold text-white shadow-neutral-950"  >Orange</button>
      <button onClick={ () => setColor("red")}
      className="bg-violet-900 size-20px px-3 py-4 rounded-2xl font-extrabold text-white shadow-neutral-950"  >Red</button>
      </div>
    </div>
    </div>
    </>
  )
}

export default App
