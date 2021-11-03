import { Component } from "react";
import { apiPost } from "../../utils/api-fetch";
import { Redirect } from "react-router-dom"
import Header from "../Header/Header";
import Footer from "../Footer/Footer"
import Main_Mailbox from "../Main_Mailbox/main_mailbox"
import Main_Home from "../Main_Home/main_home";
import MainPreviousRef from "../Main_Previous_Ref/Main_previous_ref";
import CreateJobPosting from "../Job_Posting/Job_posting";
import { Route, Switch } from "react-router-dom";
import * as paths from "../../utils/paths"
import * as styles from './Main.module.css'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {didLogout: false}
    this.logout_credentials = this.logout_credentials.bind(this)
  }

  render() {
    if (this.state.didLogout) {
      return <Redirect to='/login' />
    }
    let userInfo = this.props.userInfo
    return (
      <div className={styles.mainDiv}>
          <div className={styles.mainArea}>
            <Switch>
              <Route exact path="/">
                <Main_Home />
              </Route>
              <Route path={paths.CREATE_POSTING}>
                <CreateJobPosting isManager={() => this.state.userInfo.role == 'manager'}/>
              </Route>
              <Route path="/mailbox">
                <Main_Mailbox />
              </Route>
              <Route path="/prevRef">
                <MainPreviousRef />
              </Route>
              <Route path="/explore"></Route>
            </Switch>
          </div>
      </div>
    );
  }

  async logout_credentials() {
    const response = await apiPost('/logout')
    this.setState({didLogout: true})
  }
}

export default Main
