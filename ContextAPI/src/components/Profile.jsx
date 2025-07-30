import React, { useContext } from "react";
import userContext from "../context/usercontext";


function Profile(){

    const {user} = useContext(userContext)

    if(!user) return <div>No User Found! Please LogIn</div>

    return <div>Welcome: {user.username}</div>
}

export default Profile;