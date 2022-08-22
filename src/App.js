import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { LoginProvider } from './Components/LoginContext'
import LoginFunction from './Components/LoginFunction'
import TestFunctionPage from './Components/Pages/TestFunctionPage'
import RegisterFunction from './Components/RegisterFunction'
import Body from './Components/SlackBody/Body'
import './index.css'

function App() {
  return (
    <>
      <LoginProvider>
        <Routes>
          <Route path='/CreateUser' element={<RegisterFunction />}></Route>
          <Route path='/Login' element={<LoginFunction />}></Route>
          <Route path='/' element={<LoginFunction />}></Route>
          <Route path='/Test' element={<TestFunctionPage />}></Route>
          <Route path='/slack-app' element={<Body />}></Route>
        </Routes>
      </LoginProvider>
    </>
  )
}

export default App
