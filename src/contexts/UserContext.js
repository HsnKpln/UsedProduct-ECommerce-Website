import React, { useContext, useState } from "react";

const UserContext = React.createContext();

const UserProvider = ({children}) =>{
 const[loginSuccess,setLoginSuccess] = useState(false)
 const[registerSuccess,setRegisterSuccess] = useState(false)
 const [loginJwtSuccess,setLoginJwtSuccess] = useState(false)
 const [registerJwtSuccess,setRegisterJwtSuccess] = useState(false)

    return(
        <UserContext.Provider
         value={{
            loginSuccess,
            setLoginSuccess,
            loginJwtSuccess,
            setLoginJwtSuccess,
            registerSuccess,
            setRegisterSuccess,
            registerJwtSuccess,
            setRegisterJwtSuccess
          }}
        >
            {children}
        </UserContext.Provider>
    )
}

function useUser(){
    return useContext(UserContext);
}
export  {UserContext,useUser,UserProvider}
