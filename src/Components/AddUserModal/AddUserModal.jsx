import React, { useState, useContext, useEffect } from 'react'
import { UserList } from '../LoginContext'

import Body from '../SlackBody/Body'
import './AddUser.css'

function AddUserModal({ closeAdduserMOdal }) {
  const { listAllUserAdded, setListAllUserAdded } = useContext(UserList)
  
  const [getUserID, setGetUserID] = useState()


  const handleChangeUserID = (event) => {
    const { value } = event.target
    setGetUserID(value)
  }


  const handleClickAdd = () => {
    let list = listAllUserAdded
    list.push(getUserID)
    setListAllUserAdded(list)
    setGetUserID('')
    closeAdduserMOdal(false)
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
