import React from 'react'
import { Button, Input } from 'reactstrap'
import { addTodo, getTodos, removeTodo, updateTodo } from '../../../action'
import TodoItem from '../Todo/TodoItem'

const Todo = () => {
  const [todos, setTodos] = React.useState([])
  const todosRef = React.useRef(null)

  const newTodoItem = {
    user_id: 1000,
    title: '',
    due_on: null,
    status: 'pending'
  }

  const fetchTodos = React.useCallback(async () => {
    const data = await getTodos()
    setTodos(data)
  }, [])

  React.useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  const handleUpdateTodo = async (id, data) => {
    await updateTodo(id, data)
    fetchTodos()
  }

  const handleDeleteTodo = async (id) => {
    await removeTodo(id)
    fetchTodos()
  }

  const handleNewTodo = async() => {
    await addTodo(newTodoItem)
    fetchTodos()
  }


  const scrollToBottom = () => {
    setTodos(todos => [...todos, newTodoItem])
    if (todosRef.current) {
      todosRef.current.scrollTop = todosRef.current.scrollHeight
    }
  }

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
        paddingBottom: '22px'
      }}>
        <Input
          id="myTask"
          name="select"
          type="select"
          defaultValue=""
          style={{
            width: '40%'
          }}
        >
          <option hidden value="">
            My Task
          </option>
          <option>
            Personal Errands
          </option>
          <option>
            Urgent To-Do
          </option>
        </Input>
        <Button
          color="primary"
          onClick={scrollToBottom}
        >
          New Task
        </Button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }} ref={todosRef}>
        {todos.map((item, index) => (
          <TodoItem
            key={index}
            item={item}
            index={index}
            updateTodo={handleUpdateTodo}
            removeTodo={handleDeleteTodo}
            addTodo={handleNewTodo}
            newTodoItem={newTodoItem}
          />
        ))}
      </div>
    </div>
  )
}

export default Todo