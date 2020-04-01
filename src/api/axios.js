import axios from 'axios'
import Swal from 'sweetalert2'

const API_URL = 'https://veripag-node-todolist.glitch.me'

const api = axios.create({
  baseURL: API_URL
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (config.token) {
    config.headers.Authorization = token
  }
  return config
})

export const login = async ({ email, password }) => {
  try {
    const response = await api.post('login', {
      email,
      password
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
    const response = await api.get('todos', { token: true })
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
    const response = await api.put(`todos/${todoId}`, { done: true }, { token: true })
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
    const response = await api.delete(`todos/${todoId}`, { token: true })
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
    const response = await api.post('todos',{ description }, { token: true })
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
    const response = await api.put(`todos/${todoId}`, { description }, { token: true })
    return response.data
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Ops...',
      text: 'Ocorreu um erro ao atualizar a lista de tarefas, por favor, tente novamente.'
    })
  }
}