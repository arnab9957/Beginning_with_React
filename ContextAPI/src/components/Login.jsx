import React, {useState, useContext} from "react"
import userContext from "../context/usercontext";


function Login(){
    const [username, setusername] = useState('')
    const [pass, setpass] = useState('')

    const{setUser} = useContext(userContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        setUser({username, pass})
    }

    return(
        <div>
            <h1>Login</h1>

            <input type="text"
            value={username}
            onChange={(e)=>{
                setusername(e.target.value)
            }}
            placeholder="username" />

            <input type="text"
            value={pass}
            onChange={(e)=>{
                setpass(e.target.value)
            }} placeholder="password" />

            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Login;