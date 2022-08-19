import React, { useState, useContext } from 'react'
import { LoginContext } from './LoginContext'
import { LoginContextHeader } from './LoginContext'

export default function ReceiveMessage() {
  const { loginInfoHeader, setLoginInfoHeader } = useContext(LoginContextHeader)
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
    //Fetch user message
    fetch(`${APIurl}/messages?receiver_id=1&receiver_class=User`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...userDataHeadersAPI,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log('I am receiver', data))
  }

  // body: JSON.stringify(userDataAPI),

  return (
    <>
      {/* {userMessageList.length ? (
        userMessageList.map((value, index) => {
          return <div key={index}>{value}</div>
        })
      ) : (
        <span>No Messages Yet</span>
      )} */}

      <div>
        <button onClick={handleClickSubmit}>Receive</button>
      </div>
    </>
  )
}
