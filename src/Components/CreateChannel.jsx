import React, { useState, useContext } from 'react'
import { LoginContextHeader } from './LoginContext'

export default function CreateChannel() {
  const { loginInfoHeader } = useContext(LoginContextHeader)
  const [createChannel, setCreateChannel] = useState({
    channelName: '',
    userID: '',
    userIDList: [],
  })

  const { channelName, userID, userIDList } = createChannel
  const { accessToken, uid, expiry, client } = loginInfoHeader.dataLoginHeader

  const userDataAPI = {
    name: channelName,
    user_ids: userIDList,
  }
  const userDataHeadersAPI = {
    expiry: expiry,
    uid: uid,
    'access-token': accessToken,
    client: client,
  }

  const APIurl = 'http://206.189.91.54/api/v1'

  const handleChangeChannelName = (event) => {
    const { name, value } = event.target
    setCreateChannel({ ...createChannel, [name]: value })
  }
  const handleChangeUserID = (event) => {
    const { name, value } = event.target
    setCreateChannel({ ...createChannel, [name]: value })
  }
  const handleClickAddUserID = () => {
    let list = userIDList
    list.push(parseInt(userID))
    setCreateChannel({ ...createChannel, userID: '', userIDList: list })
    console.log(userIDList)
  }
  const handleClickSubmit = (event) => {
    event.preventDefault()

    fetch(`${APIurl}/channels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...userDataHeadersAPI,
      },
      body: JSON.stringify(userDataAPI),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))

    setCreateChannel({ ...createChannel, channelName: '', userIDList: [] })
  }

  const handleClickGetAllUsers = () => {
    fetch(`${APIurl}/channels`, {
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
        <input type='number' placeholder='User ID' name='userID' value={userID} onChange={handleChangeUserID} />
        <button onClick={handleClickAddUserID}>Add</button>
      </div>

      <div>
        <input
          type='text'
          placeholder='Channel Name'
          name='channelName'
          value={channelName}
          onChange={handleChangeChannelName}
        />
        <button onClick={handleClickSubmit}>Create</button>
      </div>
      <div>
        <button onClick={handleClickGetAllUsers}>Get User Channel</button>
      </div>
    </>
  )
}
