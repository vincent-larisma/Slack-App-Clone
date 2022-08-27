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
import { UserList, LoginContextHeader, UserInfoSend } from '../LoginContext'
import { faArrowUpRightFromSquare, faDesktop } from '@fortawesome/free-solid-svg-icons'

function Body() {
  const navigate = useNavigate()
  const { listAllUserAdded, setListAllUserAdded } = useContext(UserList)
  const [availUser, setavailUser] = useState('Starting user')
  const [userListArray, setUserListArray] = useState()
  const [channgelToggle, setchannelToggle] = useState(false)
  const [directMessageToggle, setdirectMessageTogggle] = useState(false)
  const [allUsersToggle, setallUsersTogggle] = useState(false)
  const [openAdduser, setopenAdduser] = useState(false)
  const [openAddchannel, setopenAddchannel] = useState(false)
  const { loginInfoHeader } = useContext(LoginContextHeader)
  const { accessToken, uid, expiry, client } = loginInfoHeader.dataLoginHeader
  const { containUserInfo, setContainUserInfo } = useContext(UserInfoSend)
  const [searchTerm, setSearchTerm] = useState('')

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

  const togglealluser = () => {
    allUsersToggle ? setallUsersTogggle(false) : setallUsersTogggle(true)
  }

  const handleClickSelectUser = (userValue) => {
    setavailUser(userValue.uid)
    setContainUserInfo({ ...containUserInfo, userId: userValue.id })
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
  useEffect(() => {
    fetchUserList()
  }, [])

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
                    console.log('value', value)
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
                   
                       <div className='search-item' key={index}>
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
          <div className='threads-buttons'>
            <button onClick={toggledirectMessage}>
              <i class='fa-solid fa-message'></i> Direct messages
            </button>
            <div className='direct-message-channel'>
              <ul className={directMessageToggle ? 'channel-names-clicked ' : 'channel-names-not-clicked'}>
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
                        <li key={index} onClick={() => handleClickSelectUser(userValue)} style={{ maxWidth: 300, textOverflow: 'ellipsis' }}>
                          {userValue.uid}
                        </li>
                      )
                    }
                  })
                ) : (
                  <li>No New Messages</li>
                )}
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

          <ReceiveMessage />
          <SendMessageFunction />
          {openAdduser && <AddUserModal closeAdduserMOdal={setopenAdduser} />}
          {openAddchannel && <AddChannel closeAddChannelMOdal={setopenAddchannel} />}
        </section>
      </div>
    </>
  )
}

export default Body
