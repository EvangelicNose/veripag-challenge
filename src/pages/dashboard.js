import React, { Component } from 'react';
import * as api from '../api/axios'
import {
  Redirect
} from 'react-router-dom'
import Swal from 'sweetalert2';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todoList: [],
      isLoading: false
    };

  }

  logout = async () => {
    localStorage.removeItem('token')
    localStorage.removeItem('logged')
    this.props.history.push('/')
  }

  getList = async () => {
    this.setState({ isLoading: true })
    this.setState({ todoList: [] })
    const todoList = await api.getList()
    this.setState({ todoList })
    return this.setState({ isLoading: false })
  }

  createTodo = () => {
    Swal.fire({
      title: 'Insira a descrição da tarefa',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Cadastrar',
      showLoaderOnConfirm: true,
      preConfirm: async (description) => {
        await api.createTodo({ description })
        await setTimeout(() => this.getList(), 500)
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  editTodo = (value, id) => {
    Swal.fire({
      title: 'Edite a descrição da tarefa',
      input: 'text',
      inputValue: value,
      showCancelButton: true,
      confirmButtonText: 'Editar',
      showLoaderOnConfirm: true,
      preConfirm: async (description) => {
        await api.editTodo({ todoId: id, description })
        await setTimeout(() => this.getList(), 500)
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  endTodo = (id) => {
    Swal.fire({
      title: 'Atenção',
      text: "Deseja terminar a tarefa?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then( (result) => {
      if (result.value) {
        this.setState({ isLoading: true })
        api.endTodo({ todoId: id })
        setTimeout(() => this.getList(), 1000)
      }
    })
  }

  deleteTodo = (id) => {
    Swal.fire({
      title: 'Atenção',
      text: "Deseja deletar a tarefa?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then( (result) => {
      if (result.value) {
        this.setState({ isLoading: true })
        api.deleteTodo({ todoId: id })
        setTimeout(() => this.getList(), 500)
      }
    })
  }

  componentDidMount() {
    this.getList()
  }

  render() {
    if(!localStorage.getItem('logged')) {
      return <Redirect to="/" />
    }
    if (this.state.isLoading) {
      return <h1>Carregando...</h1>
    } else {
      return (
        <div className="dashboard-page">
          <div className="dashboard-buttons">
            <button className="btn btn-primary logout-btn" onClick={() => this.logout()}>Logout</button>
            <button className="btn btn-primary logout-btn" onClick={() => this.createTodo()}>Criar nova tarefa</button>
          </div>
          <h1>
            Pendentes
          </h1>
          {this.state.todoList && this.state.todoList.length > 0 ?
            this.state.todoList.map((todo) => {
              const convertDate = (date) => {
                const rawDate = new Date(date)
                const day = rawDate.getDate()
                const month = rawDate.getMonth()
                const year = rawDate.getFullYear()
                return day + "/" +(month + 1) + "/" + year
              }
              const convertedCreatedDate = convertDate(todo.createdAt)
              const convertedUpdatedDate = convertDate(todo.updatedAt)
              if(!todo.done) {
                return (
                  <div className="todo-card mb-3" key={todo.id}>
                    <div className="todo-info">
                      <h5>{todo.description}</h5>
                      <div>
                        <h5>Criado em: {convertedCreatedDate}</h5>
                        <h5>Editado em: {convertedUpdatedDate}</h5>
                      </div>
                    </div>
                    <div className="todo-buttons">
                    <button onClick={() => this.endTodo(todo.id)} className="btn btn-success mb-2">
                        Finalizar
                      </button>
                      <button onClick={() => this.editTodo(todo.description, todo.id)} className="btn btn-secondary mb-2">
                        Editar
                      </button>
                      <button onClick={() => this.deleteTodo(todo.id)} className="btn btn-danger mb-2">
                        Deletar
                      </button>
                    </div>
                  </div>
                )
              } else return null
            })
          : null}
          <hr/>
          <h1>
            Finalizados
          </h1>
          {this.state.todoList && this.state.todoList.length > 0 ?
            this.state.todoList.map((todo) => {
              const convertDate = (date) => {
                const rawDate = new Date(date)
                const day = rawDate.getDate()
                const month = rawDate.getMonth()
                const year = rawDate.getFullYear()
                return day + "/" +(month + 1) + "/" + year
              }
              const convertedCreatedDate = convertDate(todo.createdAt)
              const convertedUpdatedDate = convertDate(todo.updatedAt)
              if(todo.done) {
                return (
                  <div className="todo-card mb-3" key={todo.id}>
                    <div className="todo-info">
                      <h5>{todo.description}</h5>
                      <div className="mt-3">
                        <h5>Criado em: {convertedCreatedDate}</h5>
                        <h5>Editado em: {convertedUpdatedDate}</h5>
                      </div>
                    </div>
                    <div className="todo-buttons">
                    <button disabled className="btn btn-success mb-2">
                        Finalizado
                      </button>
                      <button onClick={() => this.deleteTodo(todo.id)} className="btn btn-danger mb-2">
                        Deletar
                      </button>
                    </div>
                  </div>
                )
              } else return null
            })
          : null}
        </div>
      );
    }
  }
}

export default Dashboard;
