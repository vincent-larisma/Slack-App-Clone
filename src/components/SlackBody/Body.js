import React from 'react'
import './Body.css'

function Body() {
  return (
    <>
      <div className='body-container'>
        <section className='threads'>
            <div className='threads-buttons'>
                <button>
                    <i class="fa-solid fa-bell"></i> Activity  
                </button>
                <button>
                    <i class="fa-solid fa-message"></i> Messages
                </button>
                <button>
                    <i class="fa-solid fa-people-group"></i> Channels
                </button>
            </div>
        </section>
        <section className='message-window'>
            <div className='new-chat-btn'>
              <i class="fa-solid fa-circle-plus"></i>
            </div>
            <section className='new-message'>
                <input type="text" placeholder='Enter your message...' />
                <div className='options-icons'>
                    <button><i class="fa-solid fa-image"></i></button>
                    <button><i class="fa-solid fa-face-smile-beam"></i></button>
                    <button><i class="fa-solid fa-video"></i></button>
                    <button><i class="fa-solid fa-file"></i></button>
                </div>
            </section>
        </section>
      </div>
    </>
  )
}

export default Body
