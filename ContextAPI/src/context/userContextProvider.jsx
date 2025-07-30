import React from "react";
import userContext from "./usercontext";

//chieldren is a general name.whichever responce come will go through this function
const UserContextProvider = ({children}) => {
    const [user, setUser] = React.useState(null)
    return(
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
}

export default UserContextProvider
