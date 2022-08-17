import React, { useState } from 'react'

export default function RegisterFunction() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const { email, password, passwordConfirm } = userData

  const userDataAPI = {
    root: {
      email: email,
      password: password,
      password_confirmation: passwordConfirm,
    },
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

  const handleClickSubmit = () => {
    fetch(`${APIurl}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDataAPI),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
  }

  return (
    <>
      <div className='form-container'>
        <div className='form-name'>Create User</div>
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
          <div>
            <label htmlFor='passwordConfirm'>Confirm Password:</label>
            <br />
            <input
              type='text'
              id='passwordConfirm'
              name='passwordConfirm'
              value={passwordConfirm}
              placeholder='Enter your password confirmation'
              onChange={handleChangePasswordConfirm}
            />
          </div>
          <button onClick={handleClickSubmit}>Submit</button>
        </form>
      </div>
    </>
  )
}
