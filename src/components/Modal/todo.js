import React from 'react'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { getTodos } from '../../action'

const Todo = () => {
  const [todos, setTodos] = React.useState([])
  const [openItems, setOpenItems] = React.useState([]);

  React.useEffect(() => {
    getTodos().then(data => {
      setTodos(data)
    })
  }, [])

  const toggleItem = (id) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter(item => item !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };

  const todoItem = (item) => {
    return (
      <div style={{
        padding: '10px',
        borderRadius: '8px',
        marginBottom: '10px',
        boxShadow: '0 0 5px rgba(0,0,0,0.1)'
      }}>
        <Row>
          <Col xs=''>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" />{' '}
                  <strong style={{
                    marginLeft: 40,
                    textWrap: 'wrap'
                  }}>{item.title}</strong>
              </Label>
            </FormGroup>
          </Col>
        </Row>
      </div>
    )
  }

  return (
    <div>
      {todos.map(item => (
        todoItem(item)
      ))}
    </div>
  )
}

export default Todo