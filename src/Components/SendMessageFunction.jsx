import React, { useState, useContext, useEffect } from 'react'
import { UserMessages } from './LoginContext'
import { LoginContextHeader, UserList, UserInfoSend } from './LoginContext'

const APIurl = 'http://206.189.91.54/api/v1'

export default function SendMessageFunction() {
  const { listAllUserAdded, setListAllUserAdded } = useContext(UserList)
  const { loginInfoHeader } = useContext(LoginContextHeader)
  const { containUserInfo } = useContext(UserInfoSend)
  const { setReceivedMessage } = useContext(UserMessages)
  const [userSendMessage, setUserSendMessage] = useState({
    userMessage: '',
    receiverID: '',
    receiverClass: '',
  })

  const { userId, userClass } = containUserInfo
  const { userMessage } = userSendMessage
  const { accessToken, uid, expiry, client } = loginInfoHeader.dataLoginHeader

  const handleChangeMessage = (event) => {
    const { name, value } = event.target
    setUserSendMessage({ ...userSendMessage, [name]: value })
  }

  const userDataAPI = {
    receiver_id: userId,
    receiver_class: userClass,
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
    }).then((res) => res.json())
  }

  const postMessage = () => {
    fetch(`${APIurl}/messages?receiver_id=${userId}&receiver_class=${userClass}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...userDataHeadersAPI,
      },
    })
      .then((res) => res.json())
      .then((data) => setReceivedMessage({ data }))
  }

  const checkList = (idList) => {
    return idList === userId
  }

  const handleClickSubmit = (event) => {
    const list = listAllUserAdded
    event.preventDefault()
    getMessage()
    postMessage()
    postMessage()
    postMessage()

    setUserSendMessage({ ...userSendMessage, userMessage: '' })

    if (!listAllUserAdded.some(checkList)) {
      list.push(userId)
      setListAllUserAdded(list)
    }
  }

  useEffect(() => {
    postMessage()
  }, [])

  return (
    <>
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
