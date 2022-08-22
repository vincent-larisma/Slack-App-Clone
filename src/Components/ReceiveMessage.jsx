import React, { useContext, useEffect } from 'react'
import { LoginContextHeader } from './LoginContext'
import { UserMessages } from './LoginContext'

export default function ReceiveMessage() {
  const { loginInfoHeader } = useContext(LoginContextHeader)
  const { receivedMessage, setReceivedMessage } = useContext(UserMessages)
  const { data } = receivedMessage

  const { accessToken, uid, expiry, client } = loginInfoHeader.dataLoginHeader

  const userDataHeadersAPI = {
    expiry: expiry,
    uid: uid,
    'access-token': accessToken,
    client: client,
  }

  const APIurl = 'http://206.189.91.54/api/v1'

  useEffect(() => {
    fetch(`${APIurl}/messages?receiver_id=1&receiver_class=User`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...userDataHeadersAPI,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
  }, [])

  return (
    <>
      <section className='conversation'>
        {/* {data.length
          ? data.map(({ body }, index) => {
              return (
                <div className='sender-container' key={index}>
                  <div className='message-sender-name'>
                    Evan Maylas <i class='fa-solid fa-circle'></i>
                  </div>
                  <p className='sender-chat'>{body}</p>
                </div>
              )
            })
          : null} */}

        <div className='receiver-container'>
          <div className='message-receiver-name'>
            <i class='fa-solid fa-circle'></i> Shawn Go
          </div>
          <p className='receiver-chat'>Mas panget ka</p>
        </div>
      </section>
    </>
  )
}
