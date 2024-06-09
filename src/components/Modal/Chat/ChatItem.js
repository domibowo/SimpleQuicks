import moment from 'moment';
import React from 'react'
import 'moment/locale/id'
import { RxDotsHorizontal } from 'react-icons/rx';
import CustomPopover from '../../utils/CustomPopper';
import { editMessage, removeChat } from '../../../action';
import { Input } from 'reactstrap';

const ChatItem = ({ userData, chatLog }) => {
  const isLeft = ['South', 'West'].includes(chatLog.side)
  const [hover, setHover] = React.useState(false);
  const [message, setMessage] = React.useState(chatLog.text);
  const [disableEditing, setDisableEditing] = React.useState(true);
  const [deletedMessage, setDeletedMessage] = React.useState(false)

  const eventPopover = {
    trigger: <RxDotsHorizontal style={{ marginRight: 5, marginLeft: 5 }} />,
    body: (
      <div>
        <div style={{ cursor: 'pointer' }}>
          <span style={{ color: "blue" }}>Edit</span>
        </div>
        <div style={{ cursor: 'pointer' }}>
          <span style={{ color: "red" }}>Delete</span>
        </div>
      </div>
    )
  };

  const onHover = () => setHover(true);
  const onLeave = () => setHover(false);

  const editChat = () => {
    setDisableEditing(false);
  }

  const submitEdit = (e) => {
    if (e.key === 'Enter') {
      editMessage(
        userData.id,
        chatLog.message_id,
        message,
        chatLog.timestamp,
        chatLog.side
      ).then((value) => {
        setMessage(value.text)
      }).catch((err) => {
        window.alert(err.message)
      }).finally(() => {
        setDisableEditing(true)
      })
    } else if (e.key === 'Escape') {
      setMessage(chatLog.text)
      setDisableEditing(true)
    }
  }

  const deleteChat = () => {
    removeChat(userData.id, chatLog.message_id).then(() => {
      window.alert('Successfully deleted')
      setDeletedMessage(true)
    }).catch(err => {
      window.alert(err.message)
    })
  }

  const actions = [
    {
      name: 'Edit',
      color: 'blue',
      callback: editChat
    },
    {
      name: 'Delete',
      color: 'red',
      callback: deleteChat,
    },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '10px',
      position: 'relative',
      alignItems: isLeft ? 'flex-start' : 'flex-end'
    }} key={chatLog.message_id} onMouseEnter={onHover} onMouseLeave={onLeave}>
      <div style={{
        display: 'flex',
        marginRight: '10px',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
      }}>
        <span style={{
          fontFamily: 'Lato-Bold',
          fontSize: '14px',
          color: isLeft ? '#E5A443' : '#9B51E0',
        }}>{isLeft ? userData.name : 'You'}</span>
      </div>
      <div style={{
        position: 'relative',
        maxWidth: '60%',
        backgroundColor: isLeft ? '#FCEED3' : '#EEDCFF',
        borderRadius: '10px',
        padding: '10px',
        textAlign: 'left',
        alignSelf: isLeft ? 'flex-start' : 'flex-end',
      }}>
        {!disableEditing ? (
          <Input
            defaultValue={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={submitEdit}
            style={{
              backgroundColor: 'transparent',
              borderWidth: '0px',
              width: '100%',
              display: 'flex',
              flexGrow: 1,
              alignSelf: 'center'
            }}
          />
        ) : (
          <div
            onClick={() => setDisableEditing(false)}
            style={{
              backgroundColor: 'transparent',
              width: '100%',
              cursor: 'pointer'
            }}
          >
            {deletedMessage ? <i>Message has been deleted</i> : message}
          </div>
        )}


        <div style={{
          textAlign: 'right',
          fontSize: '0.8em',
          color: '#999',
          marginTop: '5px'
        }}>
          {moment(chatLog.timestamp).format('HH:mm')}
        </div>
      </div>
      {hover && (
        <CustomPopover
          triggerId={`Popover-${chatLog.message_id}`}
          content={eventPopover}
          actions={actions}
          style={{ position: 'relative', top: '0' }}
        />
      )}
    </div>
  );
}

export default ChatItem