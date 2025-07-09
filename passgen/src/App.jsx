import { useState, useCallback, useEffect,useRef } from "react";
import "./App.css";

function App() {
  const [bgcolor, setbgcolor] = useState("oliv");
  const [length, setlength] = useState(8);
  const [numallow, setnumallow] = useState(true);
  const [char, setchar] = useState(true);
  const [password, setpassword] = useState("");

  //UseRef Hoock
  const passRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQUSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numallow) str += "0123456789";
    if (char) str += "~`@#$%^&*()_:.[]{}|";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1); //This will give me index
      pass += str.charAt(char); //this will generate the password
    }

    setpassword(pass);
  }, [length, numallow, char, setpassword]);

  useEffect( () => {passwordGenerator()}, [length, numallow, char, setpassword] )

  const copyPassTOClipBoard = useCallback(  () => {
    passRef.current?.select();

    window.navigator.clipboard.writeText(password)
  }, [password] )

  return (
    <>
    <div>
      <div className="w-full max-w-md mx-auto bg-gray-500 text-4xl text-center text-blue-900 shadow-2xl rounded-lg px-4 my-8">
        <h1>Generate Password</h1>
      </div>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          placeholder="password"
          readOnly
          className="outline-none w-full py-1 px-3 bg-amber-100"
          ref={passRef}
        />
        <button 
        onClick={copyPassTOClipBoard} 
        className="bg-sky-600 p-4 rounded-2xl shadow-2xl cursor-pointer hover:bg-green-700 text-white transform hover:scale-105 duration-200 ">Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input 
          type="range"
          min = {6}
          max={100}
          value={length}
          className="cursor-pointer"
          onChange={ (e) => {
          setlength(e.target.value)
          } }
          />  
          <label >length : {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input type="checkbox" 
          defaultChecked = {numallow}
          id="numberInput"
          onChange={ () => {
            setnumallow((prev) => !prev);
          } }
          />
          <label htmlFor="NumInput" className="text-blue-800 text-shadow-indigo-950">Numbers</label>
        </div>
                <div className="flex items-center gap-x-1">
          <input type="checkbox" 
          defaultChecked = {char}
          id="charInput"
          onChange={ () => {
            setchar((prev) => !prev);
          } }
          />
          <label htmlFor="charInput" className="text-blue-800 text-shadow-indigo-950">Character</label>
        </div>
      </div>
      </div>
    </>
  );
}

export default App;
