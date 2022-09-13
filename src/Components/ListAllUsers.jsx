import React, { useContext } from 'react'
import { LoginContextHeader } from './LoginContext'

export default function ListAllUsers() {
  const { loginInfoHeader } = useContext(LoginContextHeader)

  const { accessToken, uid, expiry, client } = loginInfoHeader.dataLoginHeader

  const userDataHeadersAPI = {
    expiry: expiry,
    uid: uid,
    'access-token': accessToken,
    client: client,
  }
 
  const APIurl = 'http://206.189.91.54/api/v1'

  const handleClickSubmit = (event) => {
    event.preventDefault()

    fetch(`${APIurl}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...userDataHeadersAPI,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
  }

  return (
    <>
      <div>
        <button onClick={handleClickSubmit}>Get All Users</button>
      </div>
    </>
  )
}
