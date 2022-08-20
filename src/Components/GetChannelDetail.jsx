import React, { useState, useContext } from 'react'
import { LoginContext } from './LoginContext'
import { LoginContextHeader } from './LoginContext'

export default function GetChannelDetail() {
  const { loginInfo, setLoginInfo } = useContext(LoginContext)
  const { loginInfoHeader, setLoginInfoHeader } = useContext(LoginContextHeader)
  const [getChannelDetails, setGetChannelDetails] = useState({
    channelID: '',
  })

  const { channelID } = getChannelDetails
  const { accessToken, uid, expiry, client } = loginInfoHeader.dataLoginHeader

  const userDataHeadersAPI = {
    expiry: expiry,
    uid: uid,
    'access-token': accessToken,
    client: client,
  }

  const APIurl = 'http://206.189.91.54/api/v1'

  const handleChangechannelID = (event) => {
    const { name, value } = event.target
    setGetChannelDetails({ ...getChannelDetails, [name]: value })
  }
  const handleClickSubmit = (event) => {
    event.preventDefault()

    fetch(`${APIurl}/channels/${channelID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...userDataHeadersAPI,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))

    setGetChannelDetails({ channelID: '' })
  }

  return (
    <>
      <div>
        <input
          type='number'
          placeholder='User ID'
          name='channelID'
          value={channelID}
          onChange={handleChangechannelID}
        />
        <button onClick={handleClickSubmit}>Get Details</button>
      </div>
    </>
  )
}
