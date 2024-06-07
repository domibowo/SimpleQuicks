import React from 'react'
import { Button, Input } from 'reactstrap'
import { addTodo, getTodos, removeTodo, updateTodo } from '../../../action'
import TodoItem from '../Todo/TodoItem'

const Todo = () => {
  const [todos, setTodos] = React.useState([])

  const fetchTodos = React.useCallback(async () => {
    const data = await getTodos()
    setTodos(data)
  }, [])

  const newTodoRef = React.useRef(null)
  React.useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  const newTodoRefScroll = () => newTodoRef.current?.scrollIntoView()

  const handleUpdateTodo = async (id, data) => {
    await updateTodo(id, data)
    fetchTodos()
  }

  const handleDeleteTodo = async (id) => {
    await removeTodo(id)
    fetchTodos()
  }

  const handleNewTodo = async(data) => {
    await addTodo(data)
    fetchTodos()
  }

  return (
    <div>
      <div style={{
        flexDirection: 'row',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between'
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

        >
          New Task
        </Button>
      </div>
      {todos.map((item, index) => (
        <TodoItem
          item={item}
          index={index}
          updateTodo={handleUpdateTodo}
          removeTodo={handleDeleteTodo}
        />
      ))}
    </div>
  )
}

export default Todo