import { Component } from "react";
import { apiPost } from "../../utils/api-fetch";
import { Redirect } from "react-router-dom"

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
    return (
      <div>
        Main page
      <button type='button' onClick={this.logout_credentials}>Logout</button>
      </div>
    );
  }

  async logout_credentials() {
    const response = await apiPost('/logout')
    this.setState({didLogout: true})
  }
}

export default Main