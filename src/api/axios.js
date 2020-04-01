import axios from 'axios'
import Swal from 'sweetalert2'

const API_URL = 'https://veripag-node-todolist.glitch.me'
const token = localStorage.getItem('token')
const headers = {
  'Content-Type': "application/json",
  'Authorization': token
}

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: "teste@example.com",
      password: "veripag"
    })
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('logged', true)
    return true
  } catch (error) {
    let text = `Ocorreu um erro. Verifique a sua conexão com a internet e tente novamente. Status: ${error.message}`
    if (error.response) {
      text = 'Por favor, verifique suas credenciais e tente novamente.'
    }
    Swal.fire({
      icon: 'error',
      title: 'Ops...',
      text
    })
    return false
  }
}

export const getList = async () => {
  try {
    const response = await axios.get(`${API_URL}/todos`, { headers })
    console.log('API', response.data)
    return response.data
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Ops...',
      text: 'Ocorreu um erro ao atualizar a lista de tarefas, por favor, tente novamente.'
    })
    return null
  }
}

export const endTodo = async ({ todoId }) => {
  try {
    const response = await axios.put(`${API_URL}/todos/${todoId}`, { done: true }, { headers })
    return response.data
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Ops...',
      text: 'Ocorreu um erro ao atualizar a lista de tarefas, por favor, tente novamente.'
    })
  }
}

export const deleteTodo = async ({ todoId }) => {
  try {
    const response = await axios.delete(`${API_URL}/todos/${todoId}`, { headers })
    return response.data
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Ops...',
      text: 'Ocorreu um erro ao atualizar a lista de tarefas, por favor, tente novamente.'
    })
  }
}

export const createTodo = async ({ description }) => {
  try {
    const response = await axios.post(`${API_URL}/todos/`,{ description }, { headers })
    return response.data
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Ops...',
      text: 'Ocorreu um erro ao atualizar a lista de tarefas, por favor, tente novamente.'
    })
  }
}

export const editTodo = async ({ todoId, description }) => {
  try {
    const response = await axios.put(`${API_URL}/todos/${todoId}`, { description }, { headers })
    return response.data
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Ops...',
      text: 'Ocorreu um erro ao atualizar a lista de tarefas, por favor, tente novamente.'
    })
  }
}