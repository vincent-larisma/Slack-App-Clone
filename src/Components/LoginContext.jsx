import { createContext, useState } from 'react'

export const LoginContext = createContext()
export const LoginContextHeader = createContext()
export const UserMessages = createContext()
export const LoginProvider = ({ children }) => {
  const [loginInfo, setLoginInfo] = useState({})
  const [loginInfoHeader, setLoginInfoHeader] = useState({})
  const [receivedMessage, setReceivedMessage] = useState({})
  return (
    <LoginContext.Provider value={{ loginInfo, setLoginInfo }}>
      <LoginContextHeader.Provider value={{ loginInfoHeader, setLoginInfoHeader }}>
        <UserMessages.Provider value={{ receivedMessage, setReceivedMessage }}>{children}</UserMessages.Provider>
      </LoginContextHeader.Provider>
    </LoginContext.Provider>
  )
}
