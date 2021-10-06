import React, {Component} from "react"
import "./main_mailbox.css"

class Main_Mailbox extends Component {

    constructor(props) {
        super(props)
        this.state = {emails: []}
    }
    handleCredentialsChange(event) {
        const type = event.target.type
        this.setState({
            [type]: event.target.value
        })
    }


    render() {
        this.handleCredentialsChange = this.handleCredentialsChange.bind(this)
        return (
            <div className="container">
                <h1>Email</h1>
            </div>
        );
    }
}

export default Main_Mailbox