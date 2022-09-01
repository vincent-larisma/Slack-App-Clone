import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from './LoginContext'
import { LoginContextHeader } from './LoginContext'
import './LoginFunction.css' 
import Swal from "sweetalert2";


export default function LoginFunction() {
  const navigate = useNavigate()

  const { loginInfo, setLoginInfo } = useContext(LoginContext)
  const { loginInfoHeader, setLoginInfoHeader } = useContext(LoginContextHeader)

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = userData

  const userDataAPI = {
    email: email,
    password: password,
  }

  const handleChangeEmail = (event) => {
    const { name, value } = event.target
    setUserData({ ...userData, [name]: value })
  }
  const handleChangePassword = (event) => {
    const { name, value } = event.target
    setUserData({ ...userData, [name]: value })
  }

  const APIurl = 'http://206.189.91.54/api/v1'

  const handleClickSubmit = (event) => {
    event.preventDefault()
    fetch(`${APIurl}/auth/sign_in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDataAPI),
    })
      .then((res) => {
        setLoginInfoHeader({
          ...loginInfoHeader,
          dataLoginHeader: {
            expiry: res.headers.get('expiry'),
            uid: res.headers.get('uid'),
            accessToken: res.headers.get('access-token'),
            client: res.headers.get('client'),
          },
        })
        return res.json()
      })
      .then((data) => {
        console.log(data)
        if (data.data) {
          setLoginInfo({ ...loginInfo, dataInfo: data.data })
          navigate('/test')
        } else if (!data.success) {
          Swal.fire('Invalid username or password')
          // return alert(data.errors[0])
        }
        // if (userData.email === "") {
        //   Swal.fire('Any fool can asdfasdfasdf a computer')
        // }
      })

    setUserData({ ...userData, email: '', password: '' })
  }

  return (

    <div className='login-container'>
      <form className='form-container'>
        <section className='inner-form'>
        <div className='form-name'>Login to Slack App</div>
            <div className='login-email'>
              <input
                className='login-email-input'
                type='text'
                id='email'
                name='email'
                value={email}
                placeholder='Enter your email address'
                onChange={handleChangeEmail}
              />
            </div>
            <div className='login-password'>
              <input
                className='login-password-input'
                type='text'
                id='password'
                name='password'
                value={password}
                placeholder='Enter your password'
                onChange={handleChangePassword}
              />
            </div>
            <div className='loginCreate'>
              <button className='login-submit-button' onClick={handleClickSubmit}>Login</button>
              <button className='login-submit-button' onClick={() => navigate('/CreateUser')}>Register</button>
            </div>
        </section>
      </form>
    </div>
  
  )
}
