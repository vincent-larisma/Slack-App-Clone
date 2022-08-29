import React, { useState, useContext, useEffect } from 'react'
import { UserList } from '../LoginContext'
import './AddChannel.css'
import Swal from 'sweetalert2'

function Addchannel({ closeAddChannelMOdal }) {
  const [text, setText] = useState(0)

  return (
    <>
      <section className='addchannel-container'>
        <div className='addchannel-content'>
          <p className='addNewChannel'>Add New Channel</p>
          <div className='input-channel-container'>
            <div className='enter-channel-input'>
              <input type='text' placeholder='Channel name' />
            </div>
            <div className='enter-user-input'>
              <input type='text' placeholder='Add a member' />
              <button>ADD</button>
            </div>
            <p className='addNewChannel'>Current Added Members</p>
            <ul className='existingAddedMembers'>
              <li className='list-members' onMouseEnter={(e) => setText(1)} onMouseLeave={(e) => setText(0)}>
                {' '}
                <i class='fa-solid fa-xmark' style={{ opacity: `${text}` }}></i>
              </li>
            </ul>
          </div>
          <section className='adduser-buttons'>
            <button
              onClick={() => {
                closeAddChannelMOdal(false)
              }}>
              Cancel
            </button>
            <button>Create channel</button>
          </section>
        </div>
      </section>
    </>
  )
}

export default Addchannel
