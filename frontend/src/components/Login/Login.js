import React, {Component} from "react";
import logo from "./Logo2.png";
import LoginSuccessedPopUp from "./LoginSuccessedPopUp";
import LoginFailedPopUp from "./LoginFailedPopUp";
import LogoutSuccessedPopUp from "./LogoutSuccessedPopUp";

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {email: "", password: "",LogInFails: false, LogInSuccesseses: false, LogoutSuccesses:false}
        this.submit_credentials = this.submit_credentials.bind(this)
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
            <div class = "container">
                <form onSubmit= {this.submit_credentials}>
                    <h1>Login</h1>
                    <button onClick = {()=>this.logout_credentials()}>Log Out</button>
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
                    <LoginFailedPopUp trigger = {this.state.LogInFails} exist = {() => this.setState({
                    LogInFails: false})}>
                    </LoginFailedPopUp>
                    <LoginSuccessedPopUp trigger = {this.state.LogInSuccesses} exist = {() => this.setState({
                    LogInSuccesses: false})}>
                    </LoginSuccessedPopUp>
                    <LogoutSuccessedPopUp trigger = {this.state.LogoutSuccesses} exist = {() => this.setState({
                    LogoutSuccesses: false})}>
                    </LogoutSuccessedPopUp>
                    <input type="submit" value="Login" class="login-button" />
                    <p class="forgot-password text-right">
                        <a href="#"> Forgot password?</a>
                    </p>

                </form>
                <img class = "photo" src = {logo} width = "100" height = "50"/>
            </div>

        );
    }
    async logout_credentials(event) {

        const response = await fetch("http://localhost:3000/api/logout", {
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            // },
            // credentials: "include",  // this field is needed so that browser will send/store cookies
            method: "POST"
        })
        this.setState({LogoutSuccesses: true})
    }
    async submit_credentials(event) {
        event.preventDefault()
        const payload = {
            email: this.state.email,
            password: this.state.password
        }
        const response = await fetch("http://localhost:3000/api/login", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include",  // this field is needed so that browser will send/store cookies
            method: "POST",
            body: JSON.stringify(payload)
        })
        if(response.status == 401 || response.status == 404){
            console.log('worked')
            this.setState({
                LogInFails: true
            })
            console.log(this.state.fail)
        }
        else{
            this.setState({
                LogInSuccesses: true
            })
        }
    }
}

export default Login