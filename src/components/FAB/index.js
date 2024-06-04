import React, { useState } from 'react';
import { Button } from 'reactstrap';
import './index.css';

const FAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatActionOpen, setIsChatActionOpen] = useState(true)
  const [isTaskActionOpen, setIsTaskActionOpen] = useState(false)

  const toggleFab = () => {
    setIsOpen(!isOpen);
  };

  const toggleChatActionFab = () => {
    toggleFab()
    setIsChatActionOpen(!isChatActionOpen)
  }

  const toggleTaskActionFab = () => {
    toggleFab()
    setIsTaskActionOpen(!isTaskActionOpen)
  }

  const quickImg = require('../../assets/icon/quick-logo.png')
  const chatLogo = require('../../assets/icon/messaging-white-logo.png')
  const taskLogo = require('../../assets/icon/todo-white-logo.png')
  const chatLogoOpen = require('../../assets/icon/messaging-logo.png')
  const taskLogoOpen = require('../../assets/icon/todo-logo.png')
  
  const TodoLogo = () => (
    <div className='img-quick-logo fab-main img-shadow' style={{backgroundColor:'#F8B76B'}}>
      <img className='sub-quick-logo' src={require('../../assets/icon/todo-icon.png')} />
    </div>
  )

  const ChatLogo = () => (
    <div className='img-quick-logo fab-main img-shadow' style={{backgroundColor:'#8785FF'}}>
      <img className='sub-quick-logo' src={require('../../assets/icon/chat-icon.png')} />
    </div>
  )

  return (
    <div className="fab-container">
      {isChatActionOpen && (
        <div className='action-open'>
          <ChatLogo/>
          <Button className="img-option-logo btn-action-open" color='#F2F2F2'>
            <img className='img-option-logo' src={taskLogo} alt='task logo'/>
          </Button>
        </div>
      )}
      {isTaskActionOpen && (
        <div className='action-open'>
          <TodoLogo/>
          <Button className="img-option-logo btn-action-open" color='#F2F2F2'>
            <img className='img-option-logo' src={chatLogo} alt='chat logo'/>
          </Button>
        </div>
      )}
      {/* <Button className='fab-main img-quick-logo' color='#2F80ED' onClick={toggleFab}>
        <img className='img-quick-logo' src={quickImg} alt='quick logo'/>
      </Button>
      {isOpen && (
        <div className="fab-options">
          <Button className="fab-option img-option-logo" color='#F2F2F2'>
            <text className='fab-text'>Inbox</text>
            <img className='img-option-logo' src={chatLogo} alt='chat logo'/>
          </Button>
          <Button className="fab-option img-option-logo" color='#F2F2F2'>
            <text className='fab-text'>Task</text>
            <img className='img-option-logo' src={taskLogo} alt='task logo'/>
          </Button>
        </div>
      )} */}
    </div>
  );
};

export default FAB;
