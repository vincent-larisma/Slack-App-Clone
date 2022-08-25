import React, { useState, useTransition } from 'react'
import SendMessageFunction from '../SendMessageFunction'
import ReceiveMessage from '../ReceiveMessage'
import './Body.css'

function Body() {
  const [availUser, setavailUser] = useState('Evan Maylas')

  const [channgelToggle, setchannelToggle] = useState(false)
  const [directMessageToggle, setdirectMessageTogggle] = useState(false)

  const toggleChannel = () => {
    channgelToggle ? setchannelToggle(false) : setchannelToggle(true)
    console.log(channgelToggle)
  }

  const toggledirectMessage = () => {
    directMessageToggle ? setdirectMessageTogggle(false) : setdirectMessageTogggle(true)
    console.log(channgelToggle)
  }

  return (
    <>
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
            <button>
              <i class='fa-solid fa-bell'></i> All users
            </button>
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
              <i class='fa-solid fa-circle-plus'></i>
            </div>
          </section>
          {/* Conversation container */}
          <ReceiveMessage />
          <SendMessageFunction />
        </section>
      </div>
    </>
  )
}

export default Body
