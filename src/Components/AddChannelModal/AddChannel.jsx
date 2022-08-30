import React from 'react'
import { UserList } from '../LoginContext'
import './AddChannel.css'

import Swal from 'sweetalert2'
import CreateChannel from './../CreateChannel'

function Addchannel({ closeAddChannelMOdal, userListArray }) {
  return (
    <>
      <CreateChannel userListArray={userListArray} closeAddChannelMOdal={closeAddChannelMOdal} />
    </>
  )
}

export default Addchannel
