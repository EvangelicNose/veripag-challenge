import React, { Component } from 'react';
import * as api from '../api/axios'
import {
  Redirect
} from 'react-router-dom'

class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoading: false
    };

  }

  onEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }
  onPasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  login = async () => {
    this.setState({ isLoading: true })
    const { email, password } = this.state
    const data = await api.login({ email, password })
    this.setState({ isLoading: false })
    if (data) {
      return this.props.history.push('/dashboard')
    }
  }

  render() {
    if(localStorage.getItem('logged')) {
      return <Redirect to="/dashboard" />
    }
    return (
      <div className="login-page">
        <div className="login-form input-group">
          <h1>
            Login
          </h1>
          <input placeholder="e-Mail" type="email" disabled={this.state.isLoading} onChange={(e) => this.onEmailChange(e)}/>
          <input placeholder="Senha" type="password" disabled={this.state.isLoading} onChange={(e) => this.onPasswordChange(e)}/>
          <button className="btn btn-primary" disabled={this.state.isLoading} onClick={this.login}>
            {this.state.isLoading
              ? "Carregando..."
              : "Login"
            }
          </button>
  
        </div>
      </div>
    );
  }
}

export default LoginPage;
