import React, {Component} from "react";
import logo from "./Logo2.png";
import LoginSuccessedPopUp from "./LoginSuccessedPopUp";
import LoginFailedPopUp from "./LoginFailedPopUp";
import LoginPopUp from "./LoginFailedPopUp";
import { useState } from "react";
import App from "./App";

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {email: "", password: "",failed: false, successes: false}
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
                    <LoginFailedPopUp trigger = {this.state.fail} exist = {() => this.setState({
                    fail: false})}>
                    </LoginFailedPopUp>
                    <LoginSuccessedPopUp trigger = {this.state.successes}>
                    </LoginSuccessedPopUp>
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
        const response = await fetch("http://localhost:3000/login", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(payload)
        })
        if(response.status == 401){
            console.log('worked')
            this.setState({
                fail: true
            })
            console.log(this.state.fail)
        }
        else{
            this.setState({
                successes: true
            })
        }
    }
}

export default Login
