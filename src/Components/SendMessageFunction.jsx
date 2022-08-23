import React, { useState, useContext, useEffect } from 'react'
import { UserMessages } from './LoginContext'
import { LoginContextHeader } from './LoginContext'

export default function SendMessageFunction() {
  const { loginInfoHeader, setLoginInfoHeader } = useContext(LoginContextHeader)
  const [userSendMessage, setUserSendMessage] = useState({
    userMessage: '',
    receiverID: '',
    receiverClass: '',
  })
  const { receivedMessage, setReceivedMessage } = useContext(UserMessages)

  const { userMessage, receiverID, receiverClass } = userSendMessage
  const { accessToken, uid, expiry, client } = loginInfoHeader.dataLoginHeader
  const { localHeader, setLocalHeader} = useState();

  //localStorage
  // const localStorageAPIHeader = JSON.parse(localStorage.getItem('dataLoginHeader'))
  // console.log(localStorageAPIHeader)
  // const { accessToken, uid, expiry, client } = localStorageAPIHeader.dataLoginHeader

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

  const APIurl = 'http://206.189.91.54/api/v1'

  const handleChangeMessage = (event) => {
    const { name, value } = event.target
    setUserSendMessage({ ...userSendMessage, [name]: value })
    console.log(value)
    console.log(userSendMessage)
  }
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

    fetch(`${APIurl}/messages?receiver_id=1&receiver_class=User`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...userDataHeadersAPI,
      },
    })
      .then((res) => res.json())
      .then((data) => setReceivedMessage({ data }))
    setUserSendMessage({ ...userSendMessage, userMessage: '' })
  }

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('dataLoginHeader'));
    setLocalHeader(local);
  }, []);

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
          name='userMessage'
          value={userMessage}
          onChange={handleChangeMessage}
          placeholder='Write your message...'></textarea>
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
