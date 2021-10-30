import React, {Component} from "react"
import Login from "./components/Login/Login"
import Main from "./components/Main/Main"
import MainPreviousRef from "./components/Main_Previous_Ref/Main_previous_ref"
import "./App.css"
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom"
import CreateJobPosting from "./components/Job_Posting/Job_posting"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import NotFoundPage from "./components/NotFound/NotFoundPage"
import * as paths from "./utils/paths"
import { apiGet } from "./utils/api-fetch"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInfo: undefined
    }

    this.onUserInfoChange = this.onUserInfoChange.bind(this)
  }

  async componentDidMount() {
    const response = await apiGet('/employee/getSessionInfo')
    let userInfo = response.status == 200 ? await response.json() : null
    this.setState({
      userInfo: userInfo
    })
  }

  onUserInfoChange(userInfo) {
    this.setState({ userInfo: userInfo })
  }

  render() {
    if (this.state.userInfo === undefined) {
      return null
    }
    return (
      <BrowserRouter>
        {this.state.userInfo == null
        ?
        <div className='main-div'>
          <Redirect to={paths.LOGIN}/>
          <Login onUserInfoChange={this.onUserInfoChange}/>
        </div>
        :
        <div className='main-div'>
          <Switch>
            <Route path={paths.LOGIN}>
              <Redirect to='/' />
            </Route>
            <Route path={paths.CREATE_POSTING}>
              <div>
                <Header />
                <CreateJobPosting isManager={() => this.state.userInfo.role == 'manager'}/>
                <Footer />
              </div>
            </Route>
            <Route path={paths.NOT_FOUND}>
              <NotFoundPage />
            </Route>
            <Route path='/'>
              <Header />
              <Main userInfo={this.state.userInfo}/>
              <Footer />
            </Route>
          </Switch>
        </div>
        }
    </BrowserRouter>

    )
  }
}

export default App