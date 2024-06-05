import React, { useState } from 'react';
import { Button } from 'reactstrap';
import './index.css';
import Modal from '../Modal';

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
    <Button className='rounded-circle fab-main img-quick-logo' style={{backgroundColor:'#F8B76B'}} onClick={toggleTaskActionFab}>
      <img className='sub-quick-logo' src={require('../../assets/icon/todo-icon.png')} alt='todo icon'/>
    </Button>
  )

  const ChatLogo = () => (
    <Button className='rounded-circle fab-main img-quick-logo' style={{backgroundColor:'#8785FF'}} onClick={toggleChatActionFab}>
      <img className='sub-quick-logo' src={require('../../assets/icon/chat-icon.png')} alt='quick logo'/>
    </Button>
  )

  return (
    <div style={{flex:1}}>
      <Modal/>
      <div className="fab-container">
        {isChatActionOpen && (
          <div style={{flex: 1}}>
            <ChatLogo/>
            <div className="fab-options">
              <Button className="fab-option img-option-logo" color='#F2F2F2' onClick={toggleTaskActionFab}>
                <img className='img-option-logo' src={taskLogo} alt='task logo' />
              </Button>
            </div>
          </div>
        )}
        {isTaskActionOpen && (
          <div style={{flex: 1}}>
            <TodoLogo />
            <div className="fab-options">
              <Button className="fab-option img-option-logo" color='#F2F2F2' onClick={toggleChatActionFab}>
                <img className='img-option-logo' src={chatLogo} alt='chat logo' />
              </Button>
            </div>
          </div>
        )}
        {
          (!isTaskActionOpen && !isChatActionOpen) && (
            <div style={{flex:1}}>
              <Button className='rounded-circle fab-main img-quick-logo' color='#2F80ED' onClick={toggleFab}>
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

    </div>
  );
};

export default FAB;
