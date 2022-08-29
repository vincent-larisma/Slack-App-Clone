import React, { useState, useContext, useEffect } from 'react'
import { UserList, UserInfoSend } from '../LoginContext'
import './AddUser.css'
import Swal from 'sweetalert2'
import AddUserToChannel from '../AddUserToChannel'

function AddUserInChannel({ closeAddUserInChannel, setavailUser, userListArray }) {
  return (
    <>
      <AddUserToChannel
        closeAddUserInChannel={closeAddUserInChannel}
        setavailUser={setavailUser}
        userListArray={userListArray}
      />
    </>
  )
}
export default AddUserInChannel
