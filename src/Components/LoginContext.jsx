import { createContext, useState } from 'react'

export const LoginContext = createContext()

export const LoginProvider = ({ children }) => {
  const [loginInfo, setLoginInfo] = useState({})
  return <LoginContext.Provider value={{ loginInfo, setLoginInfo }}>{children}</LoginContext.Provider>
}
