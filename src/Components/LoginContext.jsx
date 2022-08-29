import { createContext, useState } from 'react'

export const LoginContext = createContext()
export const LoginContextHeader = createContext()
export const UserMessages = createContext()
export const UserInfoSend = createContext()
export const UserList = createContext()
export const CurrentChannel = createContext()

export const LoginProvider = ({ children }) => {
  const [loginInfo, setLoginInfo] = useState({})
  const [loginInfoHeader, setLoginInfoHeader] = useState({})
  const [receivedMessage, setReceivedMessage] = useState({})
  const [containUserInfo, setContainUserInfo] = useState({ userId: 1, userClass: 'User' })
  const [listAllUserAdded, setListAllUserAdded] = useState([])
  const [currentChannelIndex, setCurrentChannelIndex] = useState()
  return (
    <LoginContext.Provider value={{ loginInfo, setLoginInfo }}>
      <LoginContextHeader.Provider value={{ loginInfoHeader, setLoginInfoHeader }}>
        <UserMessages.Provider value={{ receivedMessage, setReceivedMessage }}>
          <UserInfoSend.Provider value={{ containUserInfo, setContainUserInfo }}>
            <UserList.Provider value={{ listAllUserAdded, setListAllUserAdded }}>
              <CurrentChannel.Provider value={{ currentChannelIndex, setCurrentChannelIndex }}>
                {children}
              </CurrentChannel.Provider>
            </UserList.Provider>
          </UserInfoSend.Provider>
        </UserMessages.Provider>
      </LoginContextHeader.Provider>
    </LoginContext.Provider>
  )
}
