import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { LoginProvider } from './components/LoginContext'
import LoginFunction from './components/LoginFunction'
import TestFunctionPage from './components/Pages/TestFunctionPage'
import RegisterFunction from './components/RegisterFunction'
import Body from './components/SlackBody/Body'
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
