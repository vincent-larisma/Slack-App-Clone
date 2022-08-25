import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './RegisterFunction.css'

export default function RegisterFunction() {
  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const { email, password, passwordConfirm } = userData

  const userDataAPI = {
    email: email,
    password: password,
    password_confirmation: passwordConfirm,
  }

  const handleChangeEmail = (event) => {
    const { name, value } = event.target
    setUserData({ ...userData, [name]: value })
  }
  const handleChangePassword = (event) => {
    const { name, value } = event.target
    setUserData({ ...userData, [name]: value })
  }
  const handleChangePasswordConfirm = (event) => {
    const { name, value } = event.target
    setUserData({ ...userData, [name]: value })
  }


  const APIurl = 'http://206.189.91.54/api/v1'

  const handleClickSubmit = (event) => {
    event.preventDefault()
    fetch(`${APIurl}/auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDataAPI),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))

    setUserData({ ...userData, email: '', password: '', passwordConfirm: '' })
    navigate('/Login')

    if(email.value === "") {
      console.log('hahahah')
    }
  }

  return (
    <div className='login-container'>
    <form className='form-container'>
      <section className='inner-form'>
      <div className='form-name-register'>Register <i class="fa-solid fa-address-card"></i></div>
          <div className='login-email'>
            <p className='top-credentials'>Email <i class="fa-solid fa-user"></i></p>
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
          <p className='top-credentials'>Password <i class="fa-solid fa-lock-open"></i></p>
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
          <p className='top-credentials'>Confirm Password <i class="fa-solid fa-lock"></i></p>
          <div className='confirm-password'>
            <input
              className='login-password-confirm'
              type='text'
              id='passwordConfirm'
              name='passwordConfirm'
              value={passwordConfirm}
              placeholder='Confirm password'
              onChange={handleChangePasswordConfirm}
            />
          </div>
          <div className='loginCreate-register'>
            <button className='login-submit-button-register' onClick={handleClickSubmit}>Create User</button>
            <button className='login-submit-button-register' onClick={() => navigate('/')}>Back to Login</button>
          </div>
      </section>
    </form>
  </div>

  )
}
