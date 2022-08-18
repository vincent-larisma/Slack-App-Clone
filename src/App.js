import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { LoginProvider } from './Components/LoginContext'
import LoginFunction from './Components/LoginFunction'
import RegisterFunction from './Components/RegisterFunction'
import SendMessageFunction from './Components/SendMessageFunction'
import ReceiveMessage from './Components/ReceiveMessage'

function App() {
  return (
    <>
      <LoginProvider>
        <Routes>
          <Route path='/CreateUser' element={<RegisterFunction />}></Route>
          <Route path='/Login' element={<LoginFunction />}></Route>
          <Route path='/' element={<LoginFunction />}></Route>
          <Route path='/Test' element={<SendMessageFunction />}></Route>
          <Route path='/ReceiveMessage' element={<ReceiveMessage />}></Route>
        </Routes>
      </LoginProvider>
    </>
  )
}

export default App
