import React from "react";

const userContext = React.createContext() //reacts like a global variable

export default userContext;

{/* <userContext>
    <login />
    <card>
        <data />
    </card>
<userContext/> */}
//it can pass any usestate.
//NOw we have to create the provider who will provide the function userConteext