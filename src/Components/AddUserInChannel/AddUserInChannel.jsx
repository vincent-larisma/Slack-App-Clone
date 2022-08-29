import React, { useState, useContext, useEffect } from 'react'
import { UserList, UserInfoSend } from '../LoginContext'
import './AddUser.css'
import Swal from 'sweetalert2'

function AddUserInChannel ({ closeAddUserInChannel, setavailUser, userListArray }) {
  const { listAllUserAdded, setListAllUserAdded } = useContext(UserList)
  const { containUserInfo, setContainUserInfo } = useContext(UserInfoSend)

  const [getUserID, setGetUserID] = useState()

  const handleChangeUserID = (event) => {
    const { value } = event.target
    setGetUserID(value)
  }

  const checkList = (userId) => {
    return userId === getUserID
  }

  const handleClickAdd = () => {
    let list = listAllUserAdded

    if (!list.some(checkList)) {
      setContainUserInfo({ ...containUserInfo, userId: getUserID })
      for (let i = 0; i < userListArray.data.length; i++) {
        if (userListArray.data[i].id == getUserID) {
          setavailUser(userListArray.data[i].uid)
        }
      }

      closeAddUserInChannel(false)
    } else if (list.some(checkList)) {
      Swal.fire('User has already been messaged')
    }
    setGetUserID('')
  }

  return (
    <>
      <section className='adduser-container'>
        <div className='adduser-content'>
          <p>Add user in channel</p>
          <div className='add-user-input'>
            <input type='number' placeholder='Enter user ID' value={getUserID} onChange={handleChangeUserID} />
          </div>
          <section className='adduser-buttons'>
            <button
              onClick={() => {
                closeAddUserInChannel(false)
              }}>
              Cancel
            </button>
            <button onClick={handleClickAdd}>Add</button>
          </section>
        </div>
      </section>
    </>
  )
}

export default AddUserInChannel
