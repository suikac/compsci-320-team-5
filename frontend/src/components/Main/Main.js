import { Component } from "react";
import { apiPost } from "../../utils/api-fetch";
import { Redirect } from "react-router-dom"
import MainMailbox from "../Main_Mailbox/main_mailbox"
import MainHome from "../Main_Home/main_home";
import MainRefer from "../Main_Refer/Main_refer"
import MainPreviousRef from "../Main_Previous_Ref/Main_previous_ref";
import MainManagerJobListing from "../Main_Manager_Job_Listing/MainManagerJobListing";
import MainManagerJobListingItem from "../Main_Manager_Job_Listing/MainManagerJobListingItem";
import CreateJobPosting from "../Job_Posting/Job_posting";
import { Route, Switch } from "react-router-dom";
import * as paths from "../../utils/paths"

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
          <>
            <Switch>
              <Route exact path="/">
                <MainHome />
              </Route>
              <Route path={paths.REFER}>
                <MainRefer />
              </Route>
              <Route path={paths.CREATE_REFER}>
                  <CreateRefer />
              </Route>
              <Route path={paths.MAILBOX}>
                <MainMailbox />
              </Route>
              <Route path={paths.PREV_REF}>
                <MainPreviousRef />
              </Route>
              <Route path={paths.EXPLORE}>
              </Route>
              {userInfo.role === 'manager'
              ?
              <Route path={paths.CREATE_POSTING}>
                <CreateJobPosting isManager={userInfo.role === 'manager'}/>
              </Route>
              : null
              }
              {userInfo.role === 'manager'
              ?
              <Route exact path={paths.MANAGER_JOB_LISTING}>
                <MainManagerJobListing />
              </Route>
              :
              null
              }
              {userInfo.role === 'manager'
              ?
              <Route exact path={paths.MANAGER_JOB_LISTING_ITEM} >
                <MainManagerJobListingItem />
              </Route>
              :
              null
              }
              <Route path='/'>
                <Redirect to={paths.NOT_FOUND} />
              </Route>
            </Switch>
          </>
    );
  }

  async logout_credentials() {
    await apiPost('/logout')
    this.setState({didLogout: true})
  }
}

export default Main
