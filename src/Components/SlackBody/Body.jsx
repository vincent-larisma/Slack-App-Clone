import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SendMessageFunction from '../SendMessageFunction'
import ReceiveMessage from '../ReceiveMessage'
import './Body.css'
import Login from '../LoginFunction'
import Swal from 'sweetalert2'
import './Navbar.css'
import AddUserModal from '../AddUserModal/AddUserModal'
import AddChannel from '../AddChannelModal/AddChannel'
import { UserList, LoginContextHeader, UserInfoSend, CurrentChannel } from '../LoginContext'
import AddUserInChannel from '../AddUserInChannel/AddUserInChannel'

function Body() {
  const navigate = useNavigate()
  const { listAllUserAdded, setListAllUserAdded } = useContext(UserList)
  const [availUser, setavailUser] = useState('Starting user')
  const [userListArray, setUserListArray] = useState()
  const [channgelToggle, setchannelToggle] = useState(false)
  const [directMessageToggle, setdirectMessageTogggle] = useState(false)
  const [allUsersToggle, setallUsersTogggle] = useState(false)
  const [openAdduser, setopenAdduser] = useState(false)
  const [openAdduserInChannel, setopenAdduserInChannel] = useState(false)
  const [openAddchannel, setopenAddchannel] = useState(false)
  const { loginInfoHeader } = useContext(LoginContextHeader)
  const { accessToken, uid, expiry, client } = loginInfoHeader.dataLoginHeader
  const { containUserInfo, setContainUserInfo } = useContext(UserInfoSend)
  const { currentChannelIndex, setCurrentChannelIndex } = useContext(CurrentChannel)
  const [channelList, setChannelList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [text, setText] = useState(0)
  const [text1, setText1] = useState(0)

  document.addEventListener('contextmenu', (event) => {
    event.preventDefault()
  })

  const handleChangeSearch = (event) => {
    const { value } = event.target
    setSearchTerm(value)
  }

  const userDataHeadersAPI = {
    expiry: expiry,
    uid: uid,
    'access-token': accessToken,
    client: client,
  }

  const APIurl = 'http://206.189.91.54/api/v1'

  const toggleChannel = () => {
    channgelToggle ? setchannelToggle(false) : setchannelToggle(true)
  }

  const toggledirectMessage = () => {
    directMessageToggle ? setdirectMessageTogggle(false) : setdirectMessageTogggle(true)
  }

  const handleClickSelectUser = (userValue) => {
    setavailUser(userValue.uid)
    setContainUserInfo({ ...containUserInfo, userId: userValue.id, userClass: 'User' })
  }

  const fetchUserList = () => {
    fetch(`${APIurl}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...userDataHeadersAPI,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserListArray(data)
      })
  }

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

  const fetchGetAllUserChannel = () => {
    fetch(`${APIurl}/channels`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...userDataHeadersAPI,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setChannelList(data.data)
      })
  }

  useEffect(() => {
    fetchUserList()
    fetchGetAllUserChannel()
  }, [])
  useEffect(() => {
    fetchGetAllUserChannel()
  }, [openAddchannel])

  const IconPop = (index) => {
    let list = listAllUserAdded
    list.splice(index, 1)
    setListAllUserAdded(list)
    setavailUser('Starting User')
    setContainUserInfo({ ...containUserInfo, userId: 1, userClass: 'User' })
  }

  const handleClickSearchSelectUser = (value) => {
    setavailUser(value.uid)
    setSearchTerm('')
    setContainUserInfo({ ...containUserInfo, userId: value.id, userClass: 'User' })
  }

  const handleSelectChannel = (index) => {
    setContainUserInfo({ ...containUserInfo, userId: channelList[index].id, userClass: 'Channel' })
    setCurrentChannelIndex(channelList[index].id)
    setavailUser(channelList[index].name)
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
          <input type='text' placeholder='Search...' onChange={handleChangeSearch} />
          <div className='search-container'>
            {searchTerm.length
              ? userListArray.data
                  .filter((value) => {
                    if (searchTerm == '') {
                      return value
                    } else if (
                      value.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      value.id === searchTerm.toLowerCase()
                    ) {
                      return value
                    }
                  })
                  .map((value, index) => {
                    return (
                      <div className='search-item' key={index} onClick={() => handleClickSearchSelectUser(value)}>
                        {value.uid}
                      </div>
                    )
                  })
              : null}
          </div>
        </section>
        <section className='screen-setting'>
          <button>
            <i class='fa-solid fa-user-tie'></i>
          </button>
          <button>
            <i class='fa-solid fa-minus'></i>
          </button>
          <button>
            <i class='fa-solid fa-down-left-and-up-right-to-center'></i>
          </button>
          <button className='button-exit' onClick={exit}>
            <i className='fa-solid fa-xmark'></i>
          </button>
        </section>
      </nav>
      <div className='body-container'>
        <section className='threads'>
          <div className='slack-body-logo'>
            <i class='fa-solid fa-envelope'></i> <p>Messages</p>
          </div>
          <div className='threads-buttons'>
            <button onClick={toggledirectMessage}>
              <i class='fa-solid fa-message'></i> Direct messages
            </button>
            <div className='direct-message-channel'>
              <ul
                className={directMessageToggle ? 'channel-names-clicked ' : 'channel-names-not-clicked'}
                style={{ maxHeight: 250, overflowY: 'scroll', maxWidth: 276 }}>
                {listAllUserAdded.length ? (
                  listAllUserAdded.map((value, index) => {
                    let userValue = false
                    userListArray.data.filter((valueUser) => {
                      if (valueUser.id == value) {
                        userValue = valueUser
                      }
                    })
                    if (userValue) {
                      return (
                        <>
                          <div
                            className='new-direct-messages'
                            style={{ Width: 279 }}
                            onMouseEnter={(e) => setText1(1)}
                            onMouseLeave={(e) => setText1(0)}>
                            <li
                              className='direct-sms-users'
                              key={index}
                              onClick={() => handleClickSelectUser(userValue)}>
                              {userValue.uid}
                            </li>
                            <i
                              style={{ opacity: `${text1}` }}
                              class='fa-solid fa-circle-xmark'
                              onClick={() => IconPop(index)}></i>
                          </div>
                        </>
                      )
                    }
                  })
                ) : (
                  <li>No new messages</li>
                )}
              </ul>
            </div>
            <button onClick={toggleChannel} className='channel-button-thread'>
              <i class='fa-solid fa-people-group'></i> Channels
            </button>
            <div className='names-channel'>
              <ul
                className={channgelToggle ? 'channel-names-clicked ' : 'channel-names-not-clicked'}
                style={{ maxHeight: 250, overflowY: 'scroll', maxWidth: 276 }}>
                {channelList !== undefined ? (
                  channelList.map((value, index) => {
                    return (
                      <li key={index} onClick={() => handleSelectChannel(index)}>
                        {value.name}
                      </li>
                    )
                  })
                ) : (
                  <li>No Channels Added Yet</li>
                )}
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
              {containUserInfo.userClass === 'Channel' && (
                <button
                  onClick={() => {
                    setopenAdduserInChannel((prev) => !prev)
                  }}>
                  <i class='fa-solid fa-user-plus'></i>
                </button>
              )}

              <button
                onClick={() => {
                  setopenAdduser((prev) => !prev)
                }}>
                <i className='fa-solid fa-message'></i>
              </button>
              <button
                onClick={() => {
                  setopenAddchannel((prev) => !prev)
                }}>
                <i class='fa-solid fa-users'></i>
              </button>
            </div>
          </section>
          <ReceiveMessage />
          <SendMessageFunction />
          {openAdduserInChannel && <AddUserInChannel closeAddUserInChannel={setopenAdduserInChannel} />}
          {openAdduser && (
            <AddUserModal
              userListArray={userListArray}
              setavailUser={setavailUser}
              closeAdduserMOdal={setopenAdduser}
            />
          )}

          {openAddchannel && <AddChannel userListArray={userListArray} closeAddChannelMOdal={setopenAddchannel} />}
        </section>
      </div>
    </>
  )
}

export default Body
