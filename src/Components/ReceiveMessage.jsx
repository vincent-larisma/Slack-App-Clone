import React, { useState, useContext } from 'react'
import { LoginContext } from './LoginContext'
import { LoginContextHeader } from './LoginContext'

export default function SendMessageFunction() {
  const { loginInfo, setLoginInfo } = useContext(LoginContext)
  const { loginInfoHeader, setLoginInfoHeader } = useContext(LoginContextHeader)
  const [userSendMessage, setUserSendMessage] = useState({
    receiverID: '',
    receiverClass: '',
    userMessageList: [],
  })

  const { receiverID, receiverClass, userMessageList } = userSendMessage
  const { accessToken, uid, expiry, client } = loginInfoHeader.dataLoginHeader

  const userDataAPI = {
    receiver_id: receiverID,
    receiver_class: receiverClass,
  }
  const userDataHeadersAPI = {
    expiry: expiry,
    uid: uid,
    'access-token': accessToken,
    client: client,
  }

  const APIurl = 'http://206.189.91.54/api/v1'

  const handleChangeReceiverID = (event) => {
    const { name, value } = event.target
    setUserSendMessage({ ...userSendMessage, [name]: value })
  }
  const handleChangeReceiverClass = (event) => {
    const { name, value } = event.target
    setUserSendMessage({ ...userSendMessage, [name]: value })
  }

  const handleClickSubmit = (event) => {
    event.preventDefault()

    //Fetch user message
    fetch(`${APIurl}/messages?receiver_id=1&receiver_class=User`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...userDataHeadersAPI,
      },
      body: JSON.stringify(userDataAPI),
    })
      .then((res) => res.json())
      .then((data) => console.log('I am receiver', data))
  }

  return (
    <>
      <div>
        <input
          type='number'
          placeholder='Receiver ID'
          name='receiverID'
          value={receiverID}
          onChange={handleChangeReceiverID}
        />
        <br />
        <label htmlFor='user'>User</label>
        <input type='radio' name='receiverClass' id='user' value='User' onChange={handleChangeReceiverClass} />
        <label htmlFor='class'>Class</label>
        <input type='radio' name='receiverClass' id='class' value='Class' onChange={handleChangeReceiverClass} />
      </div>

      {userMessageList.length ? (
        userMessageList.map((value, index) => {
          return <div key={index}>{value}</div>
        })
      ) : (
        <span>No Messages Yet</span>
      )}

      <div>
        <button onClick={handleClickSubmit}>Send</button>
      </div>
    </>
  )
}
