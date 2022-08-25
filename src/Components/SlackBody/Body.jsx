import React, { useState, useTransition, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SendMessageFunction from '../SendMessageFunction'
import ReceiveMessage from '../ReceiveMessage'
import './Body.css'
import Login from '../LoginFunction'
import Swal from 'sweetalert2'
import './Navbar.css'
import AddUserModal from '../AddUserModal/AddUserModal'
import AddChannel from '../AddChannelModal/AddChannel'
import { faDesktop } from '@fortawesome/free-solid-svg-icons'

function Body() {
  const navigate = useNavigate()

  const [activeName, setactiveName] = useState('Shawn Go')
  const [availUser, setavailUser] = useState('Evan Maylas')

  const [currentReceiver, setcurrentReceiver] = useState('')

  const [channgelToggle, setchannelToggle] = useState(false)
  const [directMessageToggle, setdirectMessageTogggle] = useState(false)
  const [allUsersToggle, setallUsersTogggle] = useState(false)

  const toggleChannel = () => {
    channgelToggle ? setchannelToggle(false) : setchannelToggle(true)
    console.log(channgelToggle)
  }

  const toggledirectMessage = () => {
    directMessageToggle ? setdirectMessageTogggle(false) : setdirectMessageTogggle(true)
    console.log(channgelToggle)
  }

  const togglealluser = () => {
    allUsersToggle ? setallUsersTogggle(false) : setallUsersTogggle(true)
  }

  const [openAdduser, setopenAdduser] = useState(false)
  const [openAddchannel, setopenAddchannel] = useState(false)

  // useEffect(() => {

  //   const closeModal = e => {
  //     console.log(e)
  //     setopenAdduser(false);
  //   }

  //   document.body.addEventListener('click', closeModal);

  //   return () =>  document.body.removeEventListener('click', closeModal);
  // });

  const exit = () => {
    Swal.fire({
      title: 'Are you sure you want to exit?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/Login')
      }
    })
  }

  return (
    <>
      <nav className='navbar-container'>
        <section className='settings'>
          <button>
            <i class='fa-solid fa-bars'></i>
          </button>
          <button>
            <i class='fa-solid fa-angle-left'></i>
          </button>
          <button>
            <i class='fa-solid fa-angle-right'></i>
          </button>
        </section>
        <section className='search-bar'>
          <input type='text' placeholder='Search' />
        </section>
        <section className='screen-setting'>
          <button>
            <i class='fa-solid fa-user-tie'></i>
          </button>
          <button>
            <i class='fa-solid fa-minus'></i>
          </button>
          <button>
            {' '}
            <i class='fa-solid fa-down-left-and-up-right-to-center'></i>
          </button>
          <button className='button-exit' onClick={exit}>
            <i className='fa-solid fa-xmark'></i>
          </button>
        </section>
      </nav>
      <div className='body-container'>
        <section className='threads'>
          <div className='threads-buttons'>
            <button onClick={toggledirectMessage}>
              <i class='fa-solid fa-message'></i> Direct messages
            </button>
            <div className='direct-message-channel'>
              <ul className={directMessageToggle ? 'channel-names-clicked ' : 'channel-names-not-clicked'}>
                <li>{availUser}</li>
              </ul>
            </div>
            <button onClick={toggleChannel}>
              <i class='fa-solid fa-people-group'></i> Channels
            </button>
            <div className='names-channel'>
              <ul className={channgelToggle ? 'channel-names-clicked ' : 'channel-names-not-clicked'}>
                <li>batch21</li>
                <li>group 2 - Slack App</li>
              </ul>
            </div>
            <button onClick={togglealluser}>
              <i class='fa-solid fa-bell'></i> All users
            </button>
            <div className='all-users-channel'>
              <ul className={allUsersToggle ? 'channel-names-clicked ' : 'channel-names-not-clicked'}>
                <li>Vince Larisma</li>
                <li>Justine Jun Banogon</li>
                <li>Shawn Go</li>
              </ul>
            </div>
          </div>
        </section>
        <section className='message-window'>
          <section className='top-body-section'>
            <div className='name-converse'>
              <button>
                {availUser} &nbsp; <i class='fa-solid fa-caret-down'></i>
              </button>
            </div>
            <div className='new-chat-btn'>
              <button
                onClick={() => {
                  setopenAdduser((prev) => !prev)
                }}>
                <i class='fa-solid fa-user-plus'></i>
              </button>
              <button
                onClick={() => {
                  setopenAddchannel((prev) => !prev)
                }}>
                <i class='fa-solid fa-users'></i>
              </button>
            </div>
          </section>
          {/* Conversation container */}
          <ReceiveMessage />
          {/* <SendMessageFunction /> */}
          {openAdduser && <AddUserModal closeAdduserMOdal={setopenAdduser} />}
          {openAddchannel && <AddChannel closeAddChannelMOdal={setopenAddchannel} />}
          <section className='new-message'>
            <textarea id='sendmessage' name='sendmessage' placeholder='Write your message...'></textarea>
            <div className='options-icons'>
              <button>
                <i class='fa-solid fa-image'></i>
              </button>
              <button>
                <i class='fa-solid fa-face-smile-beam'></i>
              </button>
              <button>
                <i class='fa-solid fa-video'></i>
              </button>
              <button>
                <i class='fa-solid fa-file'></i>
              </button>
              <button className='send-button'>
                <i class='fa-solid fa-paper-plane'></i>
              </button>
            </div>
          </section>
        </section>
      </div>
    </>
  )
}

export default Body
