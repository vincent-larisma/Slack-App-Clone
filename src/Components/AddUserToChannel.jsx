import React, { useState, useContext } from 'react'
import { LoginContextHeader } from './LoginContext'

export default function AddUserToChannel() {
  const { loginInfoHeader } = useContext(LoginContextHeader)
  const [addMemberToChannel, setAddMemberToChannel] = useState({
    channelID: '',
    userID: '',
  })

  const { channelID, userID } = addMemberToChannel
  const { accessToken, uid, expiry, client } = loginInfoHeader.dataLoginHeader

  const userDataAPI = {
    id: channelID,
    member_id: userID,
  }
  const userDataHeadersAPI = {
    expiry: expiry,
    uid: uid,
    'access-token': accessToken,
    client: client,
  }

  const APIurl = 'http://206.189.91.54/api/v1'

  const handleChangeChannelID = (event) => {
    const { name, value } = event.target
    setAddMemberToChannel({ ...addMemberToChannel, [name]: value })
  }
  const handleChangeUserID = (event) => {
    const { name, value } = event.target
    setAddMemberToChannel({ ...addMemberToChannel, [name]: value })
  }

  const handleClickSubmit = (event) => {
    event.preventDefault()

    fetch(`${APIurl}/channel/add_member`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...userDataHeadersAPI,
      },
      body: JSON.stringify(userDataAPI),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))

    setAddMemberToChannel({ ...addMemberToChannel, channelID: '', userID: '' })
  }

  return (
    <>
      <div>
        <input type='number' placeholder='User ID' name='userID' value={userID} onChange={handleChangeUserID} />
      </div>

      <div>
        <input
          type='number'
          placeholder='Channel ID'
          name='channelID'
          value={channelID}
          onChange={handleChangeChannelID}
        />
        <button onClick={handleClickSubmit}>Create</button>
      </div>
    </>
  )
}
