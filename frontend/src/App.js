import React, {Component} from "react"
import Login from "./components/Login/Login"
import Main from "./components/Main/Main"
import "./App.css"
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoggedIn: false }
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/'>
              <Main />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App