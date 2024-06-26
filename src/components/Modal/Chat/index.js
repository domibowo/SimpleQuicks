import React from 'react'
import { Button, Input, InputGroup, InputGroupText, Spinner } from 'reactstrap'
import { getUsers, sendChatToUser } from '../../../action'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import UserItem from './UserItem'
import ChatItem from './ChatItem'
import { IoArrowBack } from 'react-icons/io5'

const Chat = () => {
  const [userLogs, setUserLogs] = React.useState([])
  const chatRef = React.useRef(null)
  const [loading, setLoading] = React.useState(true)
  const [isChatScreen, setIsChatScreen] = React.useState(false)
  const [userData, setUserData] = React.useState({})
  const [userChatLogs, setUserChatLogs] = React.useState([])
  const [message, setMessage] = React.useState('')
  const [filteredData, setFilteredData] = React.useState([]);
  const [query, setQuery] = React.useState('');

  const fetchUsers = React.useCallback(async () => {
    // Simulating a 3-second delay before setting loading to false
    setTimeout(() => {
      getUsers().then(values => {
        setLoading(false);
        setUserLogs(values);
      }).catch(err => {
        setLoading(false);
        setUserLogs([]);
        window.alert(err.message)
      });
    }, 3000);
  }, []);

  React.useEffect(() => {
    if (!isChatScreen && userLogs.length === 0) {
      fetchUsers();
    }
  }, [fetchUsers, isChatScreen, userLogs]);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }

  const goToChatLog = (userData, chatLog) => {
    if (!Array.isArray(chatLog)) {
      return;
    }
    setIsChatScreen(true)
    setUserData(userData)
    setUserChatLogs(chatLog)
    scrollToBottom()
  }

  const handleBack = () => {
    setIsChatScreen(false)
    setUserData({});
    setUserChatLogs([]);
  }

  const sendMessage = () => {
    sendChatToUser(
      userData.id,
      message
    ).then((value) => {
      setUserChatLogs(chatLogs => [...chatLogs, value])
      setMessage('')
    }).catch(err => {
      window.alert(err.message)
    })
  }

  const sendMessageByEnter = (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  const filterData = (query) => {
    if (!query) {
      setFilteredData(userLogs);
    } else {
      const lowercasedQuery = query.toLowerCase();
      const filtered = userLogs.filter(item =>
        item.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredData(filtered);
    }
  };

  const handleInputSearch = (e) => {
    const value = e.target.value
    setQuery(value);
    filterData(value);

  }
  const dataFiltered = filteredData.length > 0 ?
    filteredData : query === '' ? userLogs : []
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div style={{
        flexDirection: 'row',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        {isChatScreen ? (
          <div style={{ width: '100%' }}>
            <div style={{
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
            }}>
              <div className='btn btn-transparent' style={{ width: '10%' }} onClick={handleBack}>
                <IoArrowBack />
              </div>
              <div style={{ width: '80%' }}>
                <span style={{
                  fontFamily: 'Lato-Bold',
                  fontSize: '16px',
                  color: '#2F80ED'
                }}>{userData.name}</span>
              </div>
              <div style={{ width: '10%' }}>
                <strong>X</strong>
              </div>
            </div>
            <hr style={{ paddingBottom: '12px' }} />
          </div>
        ) :
          <InputGroup style={{ marginBottom: '22px' }}>
            <Input
              placeholder="Search"
              style={{ borderRightWidth: '0px' }}
              value={query}
              onChange={handleInputSearch}
            />
            <InputGroupText style={{ backgroundColor: 'transparent' }}>
              <FaMagnifyingGlass />
            </InputGroupText>
          </InputGroup>
        }
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }} ref={chatRef}>
        {loading ?
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            position: 'absolute',
            width: '100%',
            flexDirection: 'column',
          }}>
            <Spinner
              color="secondary"
              style={{
                height: '3rem',
                width: '3rem'
              }}
            />
            Loading userLogs...
          </div> :
          isChatScreen ?
            userChatLogs.length > 0 && userChatLogs.map((item, index) => (
              <ChatItem
                key={index}
                userData={userData}
                chatLog={item}
              />
            )) :
            dataFiltered.length > 0 && dataFiltered.map((item, index) => (
              <UserItem
                key={index}
                item={item}
                index={index}
                goToChatLog={goToChatLog}
              />
            ))
        }
      </div>
      {isChatScreen && (<div style={{
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: '22px',
      }}>
        <Input
          style={{ width: '80%' }}
          onChange={e => setMessage(e.target.value)}
          value={message}
          onKeyDown={sendMessageByEnter}
        />
        <Button color='primary' style={{
          width: '15%',
          marginRight: '15px'
        }} onClick={sendMessage}>Send</Button>
      </div>)}

    </div>
  )
}

export default Chat