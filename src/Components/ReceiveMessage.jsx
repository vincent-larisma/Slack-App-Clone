import React, { useContext, useEffect, useState } from 'react'
import { LoginContextHeader } from './LoginContext'
import { UserMessages } from './LoginContext'
import { UserInfoSend } from './LoginContext'
import './SlackBody/Body.css'

const APIurl = 'http://206.189.91.54/api/v1'

export default function ReceiveMessage() {
  const { loginInfoHeader } = useContext(LoginContextHeader)
  const { receivedMessage, setReceivedMessage } = useContext(UserMessages)
  const { containUserInfo, setContainUserInfo } = useContext(UserInfoSend)
  const [restrictOnce, setRestrictOnce] = useState(false)

  const { userId, userClass } = containUserInfo
  const { data } = receivedMessage
  const { accessToken, uid, expiry, client } = loginInfoHeader.dataLoginHeader

  const userDataHeadersAPI = {
    expiry: expiry,
    uid: uid,
    'access-token': accessToken,
    client: client,
  }

  const fetchMessages = () => {
    fetch(`${APIurl}/messages?receiver_id=${userId}&receiver_class=${userClass}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...userDataHeadersAPI,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setReceivedMessage({ data })
        setRestrictOnce(true)
      })
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return (
    <>
      <section className='conversation'>
        <div className='converse-chats'>
          {restrictOnce && data.data.length
            ? data.data.map(({ body }, index) => {
                return (
                  <div className='sender-container' key={index}>
                    <div className='message-sender-name'>
                      {uid} <i class='fa-solid fa-circle'></i>
                    </div>
                    <p className='sender-chat'>{body}</p>
                  </div>
                )
              })
            : null}

          <div className='receiver-container'>
            <div className='message-receiver-name'>
              <i class='fa-solid fa-circle'></i> Shawn Go
            </div>
            <p className='receiver-chat'>Mas panget ka</p>
          </div>
        </div>
      </section>
    </>
  )
}
