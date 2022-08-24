import React, { useContext, useEffect, useState } from 'react'
import { LoginContextHeader } from './LoginContext'


const APIurl = 'http://206.189.91.54/api/v1'

export default function ReceiveMessage() {
  const { loginInfoHeader } = useContext(LoginContextHeader)
  const [messages, setMessages] = useState([])

  const [apiHeaders, setAPIHeaders] = useState({})

  const fetchHeaders = () => {
    const { dataLoginHeader } = loginInfoHeader
    if (!dataLoginHeader) {
      const local = JSON.parse(localStorage.getItem('dataLoginHeader'))
      console.log('local', local)
      setAPIHeaders(local)
    } else {
      const { accessToken, uid, expiry, client } = dataLoginHeader
      const tempHeaders = {
        expiry: expiry,
        uid: uid,
        'access-token': accessToken,
        client: client,
      }
      setAPIHeaders(tempHeaders)
    }
  }

  const fetchMessages = () => {
    const fetchHeader = {
      client: apiHeaders.client,
      uid: apiHeaders.uid,
      expiry: apiHeaders.expiry,
      'access-token': apiHeaders.accessToken,
    }
export default function ReceiveMessage() {
  const { loginInfoHeader } = useContext(LoginContextHeader)
  const { receivedMessage, setReceivedMessage } = useContext(UserMessages)
  const [runOnce, setRunOnce] = useState(false)
  const { data } = receivedMessage

  const { accessToken = '', uid, expiry, client } = loginInfoHeader.dataLoginHeader

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
      .then((data) => {
        setMessages(data)
      })
  }

  useEffect(() => {
    // fetch headers when the component loads
    fetchHeaders()
  }, [])

  useEffect(() => {
    // fetch messages when headers are initialized
    fetchMessages()
  }, [apiHeaders])
        setReceivedMessage({ data })
        setRunOnce(true)
      })
  }, [receivedMessage])

  return (
    <>
      <section className='conversation'>
        {messages.length &&
          messages.map(({ body }, index) => {
            return (
              <div className='sender-container' key={index}>
                <div className='message-sender-name'>
                  Evan Maylas <i class='fa-solid fa-circle'></i>
                </div>
                <p className='sender-chat'>{body}</p>
              </div>
            )
          })}
=======
        {runOnce && data.data.length
          ? data.data.map(({ body }, index) => {
              return (
                <div className='sender-container' key={index}>
                  <div className='message-sender-name'>
                    Evan Maylas <i class='fa-solid fa-circle'></i>
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
      </section>
    </>
  )
}
