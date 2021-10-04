import React, {Component} from "react";
import logo from "./Logo2.png";

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {email: "", password: ""}

        this.handleCredentialsChange = this.handleCredentialsChange.bind(this)
        this.submit_credentials = this.submit_credentials.bind(this)
    }

    handleCredentialsChange(event) {
        const type = event.target.type
        this.setState({
            [type]: event.value
        })
    }


    render() {
        return (
            <div class = "container">
                <form onSubmit={this.submit_credentials}>
                    <h1>Login</h1>

                    <div class="credentials">
                        <label>Username</label>
                        <input
                        type="email"
                        value={this.state.email}
                        class="form-control"
                        onChange={this.handleCredentialsChange}
                        placeholder="Enter email" />
                    </div>

                    <div class="credentials">
                        <label>Password</label>
                        <input
                        type="password"
                        value={this.state.password}
                        class="form-control"
                        onChange={this.handleCredentialsChange}
                        placeholder="Enter password" />
                    </div>

                    <input type="submit" value="Login" class="login-button" />
                    <p class="forgot-password text-right">
                        <a href="#"> Forgot password?</a>
                    </p>
                </form>
                <img class = "photo" src = {logo} width = "100" height = "50"/>
            </div>

        );
    }

    async submit_credentials(event) {
        event.preventDefault()

        const payload = {
            email: this.state.email,
            password: this.state.password
        }
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            body: JSON.stringify(payload)
        })
        if(response.ok){
            return <h1> Successfully Logged in </h1>;
        }
        else{
            return <h1> Email does not match with password, please try again </h1>;
        }
    }
}

export default Login