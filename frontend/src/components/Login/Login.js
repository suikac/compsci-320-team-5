import React, {Component} from "react";
import logo from "./Logo2.png";
import LoginSuccessedPopUp from "./LoginSuccessedPopUp";
import LoginFailedPopUp from "./LoginFailedPopUp";
import LogoutSuccessedPopUp from "./LogoutSuccessedPopUp";
import styles from "./Login.module.css"

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {email: "", password: "",LogInFails: false, LogInSuccesseses: false, LogoutSuccesses:false}
        this.submit_credentials = this.submit_credentials.bind(this)
        this.handleCredentialsChange = this.handleCredentialsChange.bind(this)
        this.logout_credentials = this.logout_credentials.bind(this)
    }

    handleCredentialsChange(event) {
        const type = event.target.type
        this.setState({
            [type]: event.target.value
        })
    }

    render() {
        return (
            <div className={styles.container}>
                <form>
                    <h1>Login</h1>
                    <button type="button"
                    onClick = {this.logout_credentials}
                    className={styles.logoutButton}>Log Out</button>
                    <div className={styles.credentials}>
                        <label>Username</label>
                        <input
                        type="email"
                        value={this.state.email}
                        class={styles.formControl}
                        onChange={this.handleCredentialsChange}
                        placeholder="Enter email" />
                    </div>
                    <div className={styles.credentials}>
                        <label>Password</label>
                        <input
                        type="password"
                        value={this.state.password}
                        class={styles.formControl}
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
                    <button type="button"
                    onClick={this.submit_credentials}
                    className={styles.loginButton}>
                        Log In
                    </button>
                    <p className={styles.forgotPassword}>
                        <a href="#"> Forgot password?</a>
                    </p>

                </form>
                <img className={styles.photo} src = {logo} width = "100" height = "50"/>
            </div>

        );
    }

    async logout_credentials() {
        const response = await fetch("http://localhost:3000/api/logout", {
            credentials: "include",  // this field is needed so that browser will send/store cookies
            method: "POST",
        })
        this.setState({LogoutSuccesses: true})
    }

    async submit_credentials() {
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
            this.setState({
                LogInFails: true
            })
        }
        else{
            this.setState({
                LogInSuccesses: true
            })
        }
    }
}

export default Login