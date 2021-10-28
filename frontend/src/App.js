import React, {Component} from "react"
import Login from "./components/Login/Login"
import Main from "./components/Main/Main"
import MainPreviousRef from "./components/Main_Previous_Ref/Main_previous_ref"
import "./App.css"
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom"
import CreateJobPosting from "./components/Job_Posting/Job_posting"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

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
      <BrowserRouter>
        {/* {this.state.userInfo == undefined
        ? <Redirect to='/login'/>
        : null
        } */}
        <div className='main-div'>
          <Switch>
            <Route path='/login'>
              <Login onUserInfoChange={this.onUserInfoChange}/>
            </Route>
            <Route path='/createPosting'>
              <Header />
              <CreateJobPosting isManager={() => this.state.userInfo.role == 'manager'}/>
              <Footer />
            </Route>
            <Route path='/'>
              <Header />
              <Main userInfo={this.state.userInfo}/>
              <Footer />
            </Route>
          </Switch>
        </div>
    </BrowserRouter>

    )
  }
}

export default App