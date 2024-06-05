import axios from "axios"

const accessKey = '9527e8d23c74e2d9842c221324d969e1df405f0ffa52e726bb56eb952d56d496'
const apiUrl = 'https://gorest.co.in/public/'

export const getTodos = async() => {
  try {
    const response = await axios.get(apiUrl + 'v2/todos', {
      headers: {
        Authorization: `Bearer ${accessKey}`
      }
    })
    return response.data
  } catch (error) {
    console.log('Failed to get data')
  }
}