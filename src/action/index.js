import axios from "axios"

const accessKey = '935560c3e6549a9b4915aa6c64b54e28827f91588223603bda07cbd5893f5744'
const apiUrl = 'https://gorest.co.in/public/'

export const getTodos = async() => {
  try {
    const response = await axios.get(`${apiUrl}v2/todos`, {
      headers: {
        Authorization: `Bearer ${accessKey}`
      }
    })
    return response.data
  } catch (error) {
    throw new Error('Failed to retrieve data')
  }
}

export const updateTodo = async(id, updateTodo) => {
  try {
    const response = await axios.put(`${apiUrl}v2/todos/${id}`, updateTodo, {
      headers: {
        Authorization: `Bearer ${accessKey}`
      }
    })
    return response.data
  } catch (error) {
    throw new Error('Failed to update data')
  }
}

export const addTodo = async(requestTodo) => {
  try {
    const response = await axios.post(`${apiUrl}v2/todos`, requestTodo, {
      headers: {
        Authorization: `Bearer ${accessKey}`
      }
    })
    return response.data
  } catch (error) {
    throw new Error('Failed to update data')
  }
}

export const removeTodo = async(id) => {
  try {
    const response = await axios.delete(`${apiUrl}v2/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${accessKey}`
      }
    })
    return response.status
  } catch (error) {
    throw new Error('Failed to remove data')
  }
}