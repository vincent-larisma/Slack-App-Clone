import React, { useStae } from 'react'
import { useNavigate } from 'react-router-dom'
import Body from '../SlackBody/Body'
import './AddUser.css'

function AddUserModal({ closeAdduserMOdal }) {

  return (
    <>
        <section className='adduser-container'>
            <div className='adduser-content'>
                <p>Add User</p>
                <div className='add-user-input'>
                    <input type="text" placeholder='Enter name' />
                </div>
                <section className='adduser-buttons'>
                    <button onClick={() => {closeAdduserMOdal(false)}}>Cancel</button>
                    <button>Add</button>
                </section>
            </div>
        </section>
    </>
  )
}

export default AddUserModal
