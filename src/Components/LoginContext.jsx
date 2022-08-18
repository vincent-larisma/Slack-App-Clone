import { createContext, useState } from 'react'

export const LoginContext = createContext()
export const LoginContextHeader = createContext()

export const LoginProvider = ({ children }) => {
  const [loginInfo, setLoginInfo] = useState({})
  const [loginInfoHeader, setLoginInfoHeader] = useState({})
  return (
    <LoginContext.Provider value={{ loginInfo, setLoginInfo }}>
      <LoginContextHeader.Provider value={{ loginInfoHeader, setLoginInfoHeader }}>
        {children}
      </LoginContextHeader.Provider>
    </LoginContext.Provider>
  )
}
