import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './RegisterFunction.css'
import Swal from 'sweetalert2'

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

  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  const APIurl = 'http://206.189.91.54/api/v1';

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
      .then((data) => {
        if (data.status === 'error') {
          if (userData.email === '' && userData.password === '' && userData.passwordConfirm === '') {
            Swal.fire('Please enter your email and password')
          } else if (userData.email === '') {
            Swal.fire('Please enter your email')
          } else if (userData.password === '') {
            Swal.fire('Please enter your password')
          } else if (userData.passwordConfirm === '') {
            Swal.fire('Please confirm your password')
          } else if (userData.email === '' && userData.password === '') {
            Swal.fire('Please enter your email and password')
          } else if (userData.password === '' && userData.passwordConfirm === '') {
            Swal.fire('Please enter your password')
          } else if (userData.password != userData.passwordConfirm) {
            Swal.fire('Password did not match')
          }
        } else if (data.status === 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Account created!',
            showConfirmButton: false,
            timer: 2000,
          })
        }
      })

    setUserData({ ...userData, email: '', password: '', passwordConfirm: '' })
  }

  return (
    <div className='login-container'>
      <form className='form-container'>
        <section className='inner-form'>
          <div className='form-name-register'>
            Register <i class='fa-solid fa-address-card'></i>
          </div>
          <div className='create-email'>
            <p className='register-credentials'>
              Email <i class='fa-solid fa-user'></i>
            </p>
            <input
              className='create-email-input'
              type='text'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email address'
              onChange={handleChangeEmail}
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault()
              }}
            />
          </div>
          <p className='register-credentials'>
            Password <i class='fa-solid fa-lock-open'></i>
          </p>
          <div className='create-password'>
            <input
              className='create-password-input'
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='Enter your password'
              onChange={handleChangePassword}
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault()
              }}
            />
          </div>
          <p className='register-credentials'>
            Confirm Password <i class='fa-solid fa-lock'></i>
          </p>
          <div className='create-password'>
            <input
              className='create-password-confirm'
              type='password'
              id='passwordConfirm'
              name='passwordConfirm'
              value={passwordConfirm}
              placeholder='Confirm password'
              onChange={handleChangePasswordConfirm}
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault()
              }}
            />
            <button className='login-submit-button-register' onClick={() => navigate('/')}>
              <i class='fa-solid fa-arrow-left'></i> Back to Login
            </button>
          </div>

          <div className='loginCreate-register'>
            <button className='create-button-register' onClick={handleClickSubmit}>
              Create User
            </button>
          </div>
        </section>
      </form>
    </div>
  )
}
