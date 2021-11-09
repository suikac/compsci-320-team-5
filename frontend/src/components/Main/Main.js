import { Component } from "react";
import { apiPost } from "../../utils/api-fetch";
import { Redirect } from "react-router-dom"
import Header from "../Header/Header";
import Footer from "../Footer/Footer"
import Main_Mailbox from "../Main_Mailbox/main_mailbox"
import Main_Home from "../Main_Home/main_home";
import Main_Refer from "../Main_Refer/Main_refer"
import MainPreviousRef from "../Main_Previous_Ref/Main_previous_ref";
import CreateJobPosting from "../Job_Posting/Job_posting";
import { Route, Switch } from "react-router-dom";
import * as paths from "../../utils/paths"
import * as styles from './Main.module.css'

// Matt Cappucci - import referral creation page
import CreateRefer from '../Main_Create_Refer/CreateRefer';

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {didLogout: false}
    this.logout_credentials = this.logout_credentials.bind(this)
  }

  render() {
    if (this.state.didLogout) {
      return <Redirect to={paths.LOGIN} />
    }
    let userInfo = this.props.userInfo
    return (
      <div className={styles.mainDiv}>
          <div className={styles.mainArea}>
            <Switch>
              <Route exact path="/">
                <Main_Home />
              </Route>
              <Route path={paths.REFER}>
                <Main_Refer />
              </Route>
              <Route path={paths.CREATE_REFER}>
                  <CreateRefer />
              </Route>
              <Route path={paths.MAILBOX}>
                <Main_Mailbox />
              </Route>
              <Route path={paths.PREV_REF}>
                <MainPreviousRef />
              </Route>
              <Route path={paths.EXPLORE}>

              </Route>
              {userInfo.role == 'manager'
              ?
              <Route path={paths.CREATE_POSTING}>
                <CreateJobPosting isManager={userInfo.role == 'manager'}/>
              </Route>
              : null
              }
              <Route path='/'>
                <Redirect to={paths.NOT_FOUND} />
              </Route>
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
