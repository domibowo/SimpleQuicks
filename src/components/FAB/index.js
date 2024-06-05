import React, { useState } from 'react';
import { Button } from 'reactstrap';
import './index.css';

const FAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatActionOpen, setIsChatActionOpen] = useState(false)
  const [isTaskActionOpen, setIsTaskActionOpen] = useState(false)

  const toggleFab = () => {
    setIsOpen(!isOpen);
  };

  const toggleChatActionFab = () => {
    setIsOpen(false)
    setIsTaskActionOpen(false)
    setIsChatActionOpen(!isChatActionOpen)
  }

  const toggleTaskActionFab = () => {
    setIsOpen(false)
    setIsChatActionOpen(false)
    setIsTaskActionOpen(!isTaskActionOpen)
  }

  const quickImg = require('../../assets/icon/quick-logo.png')
  const chatLogo = require('../../assets/icon/messaging-white-logo.png')
  const taskLogo = require('../../assets/icon/todo-white-logo.png')
  
  const TodoLogo = () => (
    <div className='img-quick-logo fab-main img-shadow' style={{backgroundColor:'#F8B76B'}}>
      <img className='sub-quick-logo' src={require('../../assets/icon/todo-icon.png')} alt='todo icon'/>
    </div>
  )

  const ChatLogo = () => (
    <div className='img-quick-logo fab-main img-shadow' style={{backgroundColor:'#8785FF'}}>
      <img className='sub-quick-logo' src={require('../../assets/icon/chat-icon.png')} alt='chat icon'/>
    </div>
  )

  return (
    <div className="fab-container">
      {isChatActionOpen && (
        <div className='action-open'>
          <ChatLogo/>
          <Button className="img-option-logo btn-action-open" color='#F2F2F2' onClick={toggleTaskActionFab}>
            <img className='img-option-logo' src={taskLogo} alt='task logo'/>
          </Button>
        </div>
      )}
      {isTaskActionOpen && (
        <div className='fab-main img-quick-logo'>
          <TodoLogo />
          <div className="fab-options">
            <Button className="fab-option img-option-logo" color='#F2F2F2' onClick={toggleChatActionFab}>
              <img className='img-option-logo' src={chatLogo} alt='chat logo' />
            </Button>
          </div>
          {/* <Button className="img-option-logo btn-action-open" color='#F2F2F2' onClick={toggleChatActionFab}>
            <img className='img-option-logo' src={chatLogo} alt='chat logo'/>
          </Button> */}
        </div>
      )}
      {
        (!isTaskActionOpen && !isChatActionOpen) && (
          <div style={{flex:1}}>
            <Button className='fab-main img-quick-logo' color='#2F80ED' onClick={toggleFab}>
              <img className='img-quick-logo' src={quickImg} alt='quick logo'/>
            </Button>
            {isOpen && (
              <div className="fab-options">
                <Button className="fab-option img-option-logo" color='#F2F2F2' onClick={toggleChatActionFab}>
                  <text className='fab-text'>Inbox</text>
                  <img className='img-option-logo' src={chatLogo} alt='chat logo'/>
                </Button>
                <Button className="fab-option img-option-logo" color='#F2F2F2' onClick={toggleTaskActionFab}>
                  <text className='fab-text'>Task</text>
                  <img className='img-option-logo' src={taskLogo} alt='task logo'/>
                </Button>
              </div>
            )}
          </div>
        )
      }
    </div>
  );
};

export default FAB;
