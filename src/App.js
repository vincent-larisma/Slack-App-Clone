import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginFunction from './Components/LoginFunction'
import RegisterFunction from './Components/RegisterFunction'
import SendMessageFunction from './Components/SendMessageFunction'

function App() {
  return (
    <>
      <Routes>
        <Route path='/CreateUser' element={<RegisterFunction />}></Route>
        <Route path='/Login' element={<LoginFunction />}></Route>
        <Route path='/' element={<LoginFunction />}></Route>
        <Route path='/Test' element={<SendMessageFunction />}></Route>
      </Routes>
    </>
  )
}

export default App
