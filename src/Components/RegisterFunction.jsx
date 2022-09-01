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

  const handleChange = (event) => {
    const { name, value } = event.target
    setUserData({ ...userData, [name]: value })
  }
  // const handleChangePassword = (event) => {
  //   const { name, value } = event.target
  //   setUserData({ ...userData, [name]: value })
  // }
  // const handleChangePasswordConfirm = (event) => {
  //   const { name, value } = event.target
  //   setUserData({ ...userData, [name]: value })
  // }


  const APIurl = 'http://206.189.91.54/api/v1'

  const handleClickSubmit = (event) => {
    event.preventDefault()
    console.log(userData)
    // fetch(`${APIurl}/auth/`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(userDataAPI),
    // })
    //   .then((res) => res.json())
     

    // setUserData({ ...userData, email: '', password: '', passwordConfirm: '' })
    // navigate('/Login')

    // if(email.value === "") {
    //   console.log('hahahah')
    // }
  }

  return (
    <div className='login-container'>
    <form className='form-container'>
      <section className='inner-form'>
      <div className='form-name'>Enter your information</div>
          <div className='login-email'>
            <input
              className='login-email-input'
              type='text'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email address'
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>
          <div className='confirm-password'>
            <input
              className='login-password-confirm'
              type='text'
              id='passwordConfirm'
              name='passwordConfirm'
              value={passwordConfirm}
              placeholder='Confirm password'
              onChange={handleChange}
            />
          </div>
          <div className='loginCreate'>
            <button className='login-submit-button' onClick={handleClickSubmit}>Create User</button>
            <button className='login-submit-button' onClick={() => navigate('/')}>Back to login</button>
          </div>
      </section>
    </form>
  </div>

  )
}
