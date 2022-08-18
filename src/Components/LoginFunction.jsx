import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from './LoginContext'

export default function LoginFunction() {
  const navigate = useNavigate()
  
  const { loginInfo, setLoginInfo } = useContext(LoginContext)
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
        setLoginInfo({
          ...loginInfo,
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
        if (data.data) {
          setLoginInfo({ ...loginInfo, dataInfo: data.data })
        } else if (!data.success) {
          return console.log(data.errors[0])
        }
      })

    setUserData({ ...userData, email: '', password: '' })
    console.log(loginInfo)
  }

  return (
    <>
      <div className='form-container'>
        <div className='form-name'>Login</div>
        <form>
          <div>
            <label htmlFor='email'>Email:</label>
            <br />
            <input
              type='text'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email address'
              onChange={handleChangeEmail}
            />
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <br />
            <input
              type='text'
              id='password'
              name='password'
              value={password}
              placeholder='Enter your password'
              onChange={handleChangePassword}
            />
          </div>

          <button onClick={handleClickSubmit}>Login</button>
        </form>
      </div>
    </>
  )
}
