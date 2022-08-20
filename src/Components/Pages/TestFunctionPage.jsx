import React from 'react'
import CreateChannel from '../CreateChannel'
import GetChannelDetail from '../GetChannelDetail'
import ReceiveMessage from '../ReceiveMessage'
import AddUserToChannel from '../AddUserToChannel'
import ListAllUsers from '../ListAllUsers'
import SendMessageFunction from '../SendMessageFunction'

export default function TestFunctionPage() {
  return (
    <>
      <div>
        <h2>Send Message</h2>
        <SendMessageFunction />
      </div>
      <div>
        <h2>Receive Message</h2>
        <ReceiveMessage />
      </div>
      <div>
        <h2>Create channel with members with Get User Channels</h2>
        <CreateChannel />
      </div>
      <div>
        <h2>Get Channel Details</h2>
        <GetChannelDetail />
      </div>
      <div>
        <h2>Add Member to Channel</h2>
        <AddUserToChannel />
      </div>
      <div>
        <h2>List of All Users</h2>
        <ListAllUsers />
      </div>
    </>
  )
}
