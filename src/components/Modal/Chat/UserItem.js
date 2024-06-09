import React from 'react'
import { getUserChatHistory } from '../../../action'
import moment from 'moment'
import 'moment/locale/id'

const UserItem = ({ item, index, goToChatLog }) => {
  const [lastChat, setLastChat] = React.useState({});
  const [chatHistory, setChatHistory] = React.useState([]);
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setLoading(true)
    getUserChatHistory(item.id).then((value) => {
      setChatHistory(value || []);
      setLastChat(value[value.length - 1] || {});
    }).catch((err) => {
      window.alert(err.message)
    }).finally(() => {
      setLoading(false)
    })
  }, [item.id]);

  return (
    <div 
      key={index} 
      style={{ borderBottom: '1px solid #828282' }} 
      onClick={() => goToChatLog(item, chatHistory)}
      aria-disabled={loading}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '22px',
        marginTop: '22px',
        width: '100%',
        alignItems: 'center',
      }} key={index}>
        <div style={{
          width: '34px',
          height: '34px',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2F80ED',
          display: 'flex',
          borderRadius: '50%',
          marginRight: '8px'
        }}>
          <text style={{
            color: 'white',
            fontFamily: 'Lato-Bold'
          }}>{Array.from(item.name)[0]}
          </text>
        </div>
        <div>
          <text style={{
            fontFamily: 'Lato-Bold',
            fontSize: '16px',
            color: '#2F80ED'
          }}>{item.name}</text>
          &ensp;&emsp;
          {lastChat.timestamp ? moment(lastChat.timestamp).format('DD/MM/YYYY HH:mm') : 'Loading...'}
          <br />
          <text style={{ textWrap: 'wrap', textAlign: 'justify', fontFamily: 'Lato-Regular' }}>
            {lastChat.text ? lastChat.text : '...'}
          </text>
        </div>
      </div>
    </div>
  );
};

export default UserItem;