import React, { useState, useContext } from 'react'
import { LoginContextHeader, CurrentChannel } from './LoginContext'

export default function AddUserToChannel({ closeAddUserInChannel }) {
  const { currentChannelIndex, setCurrentChannelIndex } = useContext(CurrentChannel)
  const { loginInfoHeader } = useContext(LoginContextHeader)
  const [addMemberToChannel, setAddMemberToChannel] = useState({
    userID: '',
  })

  const { userID } = addMemberToChannel
  const { accessToken, uid, expiry, client } = loginInfoHeader.dataLoginHeader

  const userDataAPI = {
    id: parseInt(currentChannelIndex),
    member_id: userID,
  }
  const userDataHeadersAPI = {
    expiry: expiry,
    uid: uid,
    'access-token': accessToken,
    client: client,
  }

  const APIurl = 'http://206.189.91.54/api/v1'

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
    }).then((res) => res.json())

    setAddMemberToChannel({ ...addMemberToChannel, userID: '' })
    closeAddUserInChannel(false)
  }

  return (
    <>
      <section className='adduser-container'>
        <div className='adduser-content'>
          <p>Add user in channel</p>
          <div className='add-user-input'>
            <input type='number' placeholder='User ID' name='userID' value={userID} onChange={handleChangeUserID} />
          </div>
          <section className='adduser-buttons'>
            <button
              onClick={() => {
                closeAddUserInChannel(false)
              }}>
              Cancel
            </button>
            <button onClick={handleClickSubmit}>Add</button>
          </section>
        </div>
      </section>
    </>
  )
}
