import React, { useState, useContext } from 'react'
import { LoginContextHeader } from './LoginContext'

export default function CreateChannel({ closeAddChannelMOdal, userListArray }) {
  const [text, setText] = useState(0)
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

  const checkList = (id) => {
    return parseInt(id) === parseInt(userID)
  }
  const handleClickAddUserID = () => {
    let list = userIDList
    if (!list.some(checkList)) {
      list.push(parseInt(userID))
    } else {
      alert('User already added')
    }

    setCreateChannel({ ...createChannel, userID: '', userIDList: list })
  }
  const handleClickDelete = (index) => {
    let list = userIDList
    list.splice(index, 1)
    setCreateChannel({ ...createChannel, userIDList: list })
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
      .catch(alert(`Channel ${channelName} has been created successfully`))
    closeAddChannelMOdal(false)
    setCreateChannel({ ...createChannel, channelName: '', userIDList: [] })
  }

 

  return (
    <>
      <section className='addchannel-container'>
        <div className='addchannel-content'>
          <p className='addNewChannel'>Add New Channel</p>
          <div className='input-channel-container'>
            <div className='enter-channel-input'>
              <input
                type='text'
                placeholder='Channel Name'
                name='channelName'
                value={channelName}
                onChange={handleChangeChannelName}
              />
            </div>
            <div className='enter-user-input'>
              <input
                type='number'
                placeholder='Add Member using User ID'
                name='userID'
                value={userID}
                onChange={handleChangeUserID}
              />
              <button onClick={handleClickAddUserID}>Add</button>
            </div>
            <p className='addNewChannel'>Current Added Members</p>
            <ul className='existingAddedMembers'>
              {userIDList.length ? (
                userIDList.map((value, index) => {
                  let userAddedName
                  for (let i = 0; i < userListArray.data.length; i++) {
                    if (userListArray.data[i].id == value) {
                      userAddedName = userListArray.data[i].uid
                    }
                  }
                  return (
                    <li
                      className='list-members'
                      onMouseEnter={(e) => setText(1)}
                      onMouseLeave={(e) => setText(0)}
                      key={index}>
                      {userAddedName}
                      <i
                        class='fa-solid fa-xmark'
                        style={{ opacity: `${text}` }}
                        onClick={() => handleClickDelete(index)}></i>
                    </li>
                  )
                })
              ) : (
                <span>No added Member</span>
              )}
            </ul>
          </div>
          <section className='adduser-buttons'>
            <button
              onClick={() => {
                closeAddChannelMOdal(false)
              }}>
              Cancel
            </button>
            <button onClick={handleClickSubmit}>Create Channel</button>
          </section>
        </div>
      </section>
    </>
  )
}
