import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'

class Login extends Component {
  state = {
    usernameValue: 'rahul',
    passwordValue: 'rahul@2021',
    showError: false,
    errorMsg: '',
  }

  onSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showError: true, errorMsg})
  }

  onSubmitting = async event => {
    event.preventDefault()
    const {usernameValue, passwordValue} = this.state

    const userDetails = {username: usernameValue, password: passwordValue}

    const apiUrl = 'https://apis.ccbp.in/login'

    // {username: 'rahul', password: 'rahul@2021'}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)

    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
      console.log(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
      console.log(data)
    }
  }

  onTypingPassword = event => {
    this.setState({passwordValue: event.target.value})
  }

  onTypingUsername = event => {
    this.setState({usernameValue: event.target.value})
  }

  render() {
    const {usernameValue, passwordValue, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-card">
          <div className="logo">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              height="50px"
            />
          </div>
          <form onSubmit={this.onSubmitting}>
            <div className="input-container">
              <label htmlFor="username">USERNAME</label>
              <input
                id="username"
                value={usernameValue}
                onChange={this.onTypingUsername}
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">PASSWORD</label>
              <input
                id="password"
                value={passwordValue}
                onChange={this.onTypingPassword}
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="btn">
              <button type="submit">Login</button>
            </div>
            {showError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
