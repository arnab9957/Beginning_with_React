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
      <button className="bg-violet-900 size-20px px-3 py-4 rounded-2xl font-extrabold text-white shadow-neutral-950"  >Violate</button>
      <button className="bg-violet-900 size-20px px-3 py-4 rounded-2xl font-extrabold text-white shadow-neutral-950"  >Violate</button>
      <button className="bg-violet-900 size-20px px-3 py-4 rounded-2xl font-extrabold text-white shadow-neutral-950"  >Violate</button>
      <button className="bg-violet-900 size-20px px-3 py-4 rounded-2xl font-extrabold text-white shadow-neutral-950"  >Violate</button>
      <button className="bg-violet-900 size-20px px-3 py-4 rounded-2xl font-extrabold text-white shadow-neutral-950"  >Violate</button>
      <button className="bg-violet-900 size-20px px-3 py-4 rounded-2xl font-extrabold text-white shadow-neutral-950"  >Violate</button>
      </div>
    </div>
    </div>
    </>
  )
}

export default App
