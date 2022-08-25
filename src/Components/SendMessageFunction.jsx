import React, { useState, useContext, useEffect } from 'react'
import { UserMessages } from './LoginContext'
import { LoginContextHeader } from './LoginContext'

const APIurl = 'http://206.189.91.54/api/v1'

export default function SendMessageFunction() {
  const { loginInfoHeader, setLoginInfoHeader } = useContext(LoginContextHeader)
  const [userSendMessage, setUserSendMessage] = useState({
    userMessage: '',
    receiverID: '',
    receiverClass: '',
  })
  const { setReceivedMessage } = useContext(UserMessages)
  const { userMessage, receiverID, receiverClass } = userSendMessage
  const { accessToken, uid, expiry, client } = loginInfoHeader.dataLoginHeader

  const handleChangeMessage = (event) => {
    const { name, value } = event.target
    setUserSendMessage({ ...userSendMessage, [name]: value })
  }
  const handleChangeReceiverID = (event) => {
    const { name, value } = event.target
    setUserSendMessage({ ...userSendMessage, [name]: value })
  }
  const handleChangeReceiverClass = (event) => {
    const { name, value } = event.target
    setUserSendMessage({ ...userSendMessage, [name]: value })
  }

  const userDataAPI = {
    receiver_id: receiverID,
    receiver_class: receiverClass,
    body: userMessage,
  }
  const userDataHeadersAPI = {
    expiry: expiry,
    uid: uid,
    'access-token': accessToken,
    client: client,
  }

  const getMessage = () => {
    fetch(`${APIurl}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...userDataHeadersAPI,
      },
      body: JSON.stringify(userDataAPI),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
  }

  const postMessage = () => {
    fetch(`${APIurl}/messages?receiver_id=${2484}&receiver_class=User`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...userDataHeadersAPI,
      },
    })
      .then((res) => res.json())
      .then((data) => setReceivedMessage({ data }))
  }

  const handleClickSubmit = (event) => {
    event.preventDefault()
    getMessage()
    postMessage()
    setUserSendMessage({ ...userSendMessage, userMessage: '' })
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

      <section className='new-message'>
        <textarea
          id='sendmessage'
          placeholder='Write your message...'
          name='userMessage'
          value={userMessage}
          onChange={handleChangeMessage}></textarea>
        <div className='options-icons'>
          <button>
            <i class='fa-solid fa-image'></i>
          </button>
          <button>
            <i class='fa-solid fa-face-smile-beam'></i>
          </button>
          <button>
            <i class='fa-solid fa-video'></i>
          </button>
          <button>
            <i class='fa-solid fa-file'></i>
          </button>
          <button className='send-button' onClick={handleClickSubmit}>
            <i class='fa-solid fa-paper-plane'></i>
          </button>
        </div>
      </section>
    </>
  )
}
