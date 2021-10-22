import React, {Component} from "react"
import Login from "./components/Login/Login"
import Main from "./components/Main/Main"
import "./App.css"
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: null
    }

    this.onUserInfoChange = this.onUserInfoChange.bind(this)
  }

  onUserInfoChange(userInfo) {
    console.log(userInfo)
    this.setState({ userInfo: userInfo })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/'>
              <Main userInfo={this.state.userInfo}/>
            </Route>
            <Route path='/login'>
              <Login onUserInfoChange={this.onUserInfoChange}/>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App