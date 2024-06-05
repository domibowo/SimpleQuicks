import React from 'react'
import Todo from './todo'
import { Container } from 'reactstrap'

const Modal = () => {
  return (
    <Container style={{
      height: '737px',
      width: '734px',
      backgroundColor: '#FFFFFF',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      overflowY: 'auto',
      bottom: '9  0px',
      right: '20px',
      position: 'absolute'
    }}>
      <Todo/>
    </Container>
  )
}

export default Modal