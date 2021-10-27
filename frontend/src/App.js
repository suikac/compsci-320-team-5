import React, {Component} from "react"
import Login from "./components/Login/Login"
import Job_posting from "./components/Job_Posting/Job_posting"
import Main from "./components/Main/Main"
import MainPreviousRef from "./components/Main_Previous_Ref/Main_previous_ref"
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
    this.setState({ userInfo: userInfo })
  }

  render() {
    return (
        <div>
          <Job_posting>
          </Job_posting>
        </div>
    )
  }
}

export default App