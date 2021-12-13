import React, {Component} from "react"
import Login from "./components/Login/Login"
import Main from "./components/Main/Main"
import "./App.css"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import Header from "./components/Header/Header"
import NotFoundPage from "./components/NotFound/NotFoundPage"
import * as paths from "./utils/paths"
import { apiGet, apiPost } from "./utils/api-fetch"
import NavBar from './components/NavBar/navBar'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css'
import { Modal, Button } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInfo: undefined,
      sessionExpired: false
    }

    this.onUserInfoChange = this.onUserInfoChange.bind(this)
    this.onLogout = this.onLogout.bind(this)
  }

  async componentDidMount() {
    const response = await apiGet('/employee/getSessionInfo')
    let userInfo = response.status === 200 ? await response.json() : null
    this.onUserInfoChange(userInfo)
  }

  onUserInfoChange(userInfo) {
    this.setState({
      userInfo: userInfo,
      sessionExpired: false
    })
    if (this.state.loginTimeout) {
      clearTimeout(this.state.loginTimeout)
      this.setState({
        loginTimeout: null
      })
    }
    if (userInfo) {
      const expiresOn = new Date(userInfo.sessionExpires)
      const self = this
      this.setState({
        loginTimeout: setTimeout(() => {
          self.setState({
            sessionExpired: true
          })
        }, expiresOn - Date.now())
      })
    }
  }

  async onLogout() {
    await apiPost("/logout")
    this.onUserInfoChange(null)
  }

  render() {
    // Login bypass
    // this.state.userInfo = {
    //   role: 'manager'
    // };

    if (this.state.userInfo === undefined) {
      return null
    }
    return (
      <div className='wrapper'>
      {this.state.sessionExpired
      ?
      <Modal show={this.state.sessionExpired} backdrop='static'>
        <Modal.Header>
          <Modal.Title>
            Session Expired
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your session has expired. You will be redirected to the login screen.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.onUserInfoChange(null)}>OK</Button>
        </Modal.Footer>
      </Modal>
      : null
      }
      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={true}
      />
      <BrowserRouter>
        {this.state.userInfo === null
        ?
        <div className='main-div'>
          <Redirect to={paths.LOGIN}/>
          <Login onUserInfoChange={this.onUserInfoChange}/>
        </div>
        :
          <Switch>
            <Route path={paths.LOGIN}>
              <Redirect to='/' />
            </Route>
            <Route path={paths.NOT_FOUND}>
              <NotFoundPage />
            </Route>
            <Route path='/'>
              <div className='header-div'>
                <Header onLogout={this.onLogout}/>
              </div>
              <div className='appGrid'>
                <div className='navBarDiv'>
                  <NavBar isManager={this.state.userInfo.role === 'manager'}/>
                </div>
                <div className='mainDiv'>
                  <Main userInfo={this.state.userInfo}/>
                </div>
              </div>
            </Route>
          </Switch>
        }
    </BrowserRouter>
    </div>
    )
  }
}

export default App
