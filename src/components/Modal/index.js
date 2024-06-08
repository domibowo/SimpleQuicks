import React from 'react'
import Todo from './Todo'
import { Container } from 'reactstrap'

const Modal = () => {
  return (
    <Container style={{
      height: '80%',
      width: '734px',
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      overflowY: 'auto',
      bottom: '90px',
      right: '20px',
      position: 'absolute',
      paddingTop: '24px',
      paddingBottom: '24px',
      paddingRight: '32px',
      paddingLeft: '32px'
    }}>
      <Todo/>
    </Container>
  )
}

export default Modal