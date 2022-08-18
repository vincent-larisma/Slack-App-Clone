import React, { useState } from 'react'
import './Body.css'

function Body() {

  const [channgelToggle, setchannelToggle] = useState(false);
  const [directMessageToggle, setdirectMessageTogggle] = useState(false);

  const toggleChannel = () => {
    channgelToggle ? setchannelToggle(false) : setchannelToggle(true);
    console.log(channgelToggle)
  }

  const toggledirectMessage = () => {
    directMessageToggle ? setdirectMessageTogggle(false) : setdirectMessageTogggle(true);
    console.log(channgelToggle)
  }

  return (
    <>
      <div className='body-container'> 
        <section className='threads'>
            <div className='threads-buttons'>
                
                <button onClick={toggledirectMessage}>
                    <i class="fa-solid fa-message"></i> Direct messages
                </button>
                  <div className='direct-message-channel'>
                    <ul className={directMessageToggle ? "channel-names-clicked " : "channel-names-not-clicked"}>
                        <li>Justine Jun Banogon</li>
                        <li>Vince Larisma</li>
                    </ul>
                  </div>
                <button onClick={toggleChannel}>
                    <i class="fa-solid fa-people-group"></i> Channels
                </button>
                  <div className='names-channel'>
                    <ul className={channgelToggle ? "channel-names-clicked " : "channel-names-not-clicked"}>
                        <li>batch21</li>
                        <li>group 2 - Slack App</li>
                    </ul>
                  </div>
                <button>
                    <i class="fa-solid fa-bell"></i> Activity    
                </button>
            </div>
        </section>
        <section className='message-window'>
            <div className='new-chat-btn'>
              <i class="fa-solid fa-circle-plus"></i>
            </div>
            <section className='new-message'>
              <textarea id="sendmessage" name="sendmessage" placeholder='Write your message...'>
              </textarea>
                <div className='options-icons'>
                      <button><i class="fa-solid fa-image"></i></button>
                      <button><i class="fa-solid fa-face-smile-beam"></i></button>
                      <button><i class="fa-solid fa-video"></i></button>
                      <button><i class="fa-solid fa-file"></i></button>
                      <button className='send-button'><i class="fa-solid fa-paper-plane"></i></button>
                </div>
            </section>
        </section>
      </div>
    </>
  )
}

export default Body
