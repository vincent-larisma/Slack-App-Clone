import React, { useStae } from 'react'
import './AddChannel.css'

function Addchannel({ closeAddChannelMOdal }) {

  return (
    <>
        <section className='addchannel-container'>
            <div className='addchannel-content'>
                <p>Add New Channel</p>
                <div className='input-channel-container'>
                    <div className='enter-channel-input'>
                        <input type="text" placeholder='Enter channel name' />
                    </div>
                    <div className='enter-user-input'>
                        <input type="text" placeholder='Add users' />
                    </div>
                </div>
                <section className='adduser-buttons'>
                    <button onClick={() => {closeAddChannelMOdal(false)}}>Cancel</button>
                    <button>Add</button>
                </section>
            </div>
        </section>
    </>
  )
}

export default Addchannel
