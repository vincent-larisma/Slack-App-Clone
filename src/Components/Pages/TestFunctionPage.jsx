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
        <h1>Send Message</h1>
        <SendMessageFunction />
      </div>
      <div>
        <h1>Receive Message</h1>
        <ReceiveMessage />
      </div>
      <div>
        <h1>Create channel with members with Get User Channels</h1>
        <CreateChannel />
      </div>
      <div>
        <h1>Get Channel Details</h1>
        <GetChannelDetail />
      </div>
      <div>
        <h1>Add Member to Channel</h1>
        <AddUserToChannel />
      </div>
      <div>
        <h1>List of All Users</h1>
        <ListAllUsers />
      </div>
    </>
  )
}
