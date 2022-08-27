import React, { useState, useContext, useEffect } from 'react'
import { UserList } from '../LoginContext'
import Body from '../SlackBody/Body'
import './AddUser.css'
import Swal from 'sweetalert2'

function AddUserModal({ closeAdduserMOdal }) {
  const { listAllUserAdded, setListAllUserAdded } = useContext(UserList)

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
      list.push(getUserID)
      setListAllUserAdded(list)

      closeAdduserMOdal(false)
    } else if (list.some(checkList)) {
      Swal.fire('User has already been added')
    }
    setGetUserID('')
  }

  return (
    <>
      <section className='adduser-container'>
        <div className='adduser-content'>
          <p>Add User</p>
          <div className='add-user-input'>
            <input type='number' placeholder='Enter user ID' value={getUserID} onChange={handleChangeUserID} />
          </div>
          <section className='adduser-buttons'>
            <button
              onClick={() => {
                closeAdduserMOdal(false)
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

export default AddUserModal
