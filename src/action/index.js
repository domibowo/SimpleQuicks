import axios from "axios"
import moment from "moment"
import 'moment/locale/id'

const accessKey = '935560c3e6549a9b4915aa6c64b54e28827f91588223603bda07cbd5893f5744'
const apiUrl = 'https://gorest.co.in/public/'
const chatAppSecret = '666497ee932baf9032ab8e13'

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

export const getUserChatHistory = async(id) => {
  try {
    const response = await axios.get(`https://${chatAppSecret}.mockapi.io/chat/log/users/${id}/chatlog`)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}

export const getUsers = async() => {
  try {
    const response = await axios.get(`https://${chatAppSecret}.mockapi.io/chat/log/users`)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}

export const getUserById = async(userId) => {
  try {
    const response = await axios.get(`https://${chatAppSecret}.mockapi.io/chat/log/users/${userId}`)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}

export const sendChatToUser = async(userId, text) => {
  try {
    const response = await axios.post(`https://${chatAppSecret}.mockapi.io/chat/log/users/${userId}/chatlog`, {
      text: text,
      timestamp: moment().toISOString(),
      side: 'Right',
      userId: `${userId}`
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}