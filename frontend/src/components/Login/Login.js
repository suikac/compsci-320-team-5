import React, {Component} from "react";
import logo from "./Logo2.png";
import { LoginFailedPopUp, LoginSuccessedPopUp, LogoutSuccessedPopUp } from "./LoginPopups";
import styles from "./Login.module.css"
import { apiPost } from "../../utils/api-fetch"
import { Redirect } from "react-router";

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {email: "", password: "", loginFails: false, loginSuccessful: false, logoutSuccessful:false}
        this.submit_credentials = this.submit_credentials.bind(this)
        this.handleCredentialsChange = this.handleCredentialsChange.bind(this)
    }

    handleCredentialsChange(event) {
        const type = event.target.type
        this.setState({
            [type]: event.target.value
        })
    }

    render() {
        if (this.state.loginSuccessful) {
            return <Redirect to='/' />
        }
        return (
            <div className={styles.container}>
                <form>
                    <h1 className={styles.h1}>Login</h1>
                    <div className={styles.credentials}>
                        <label for="Username">Username</label>
                        <input
                        id="Username"
                        type="email"
                        value={this.state.email}
                        class={styles.formControl}
                        onChange={this.handleCredentialsChange}
                        placeholder="Enter email" />
                    </div>
                    <div className={styles.credentials}>
                        <label for="Password">Password</label>
                        <input
                        id="Password"
                        type="password"
                        value={this.state.password}
                        class={styles.formControl}
                        onChange={this.handleCredentialsChange}
                        placeholder="Enter password" />
                    </div>
                    <div className={styles.forgotPassword}>
                        <a href="#"> Forgot password?</a>
                    </div>
                    <button type="button"
                    onClick={this.submit_credentials}
                    className={styles.loginButton}>
                        Log In
                    </button>
                </form>
                <LoginFailedPopUp trigger = {this.state.loginFails} exist = {() => this.setState({
                loginFails: false})}>
                </LoginFailedPopUp>
                <img className={styles.photo} src = {logo} width = "100" height = "50" alt="Logo"/>
            </div>

        );
    }

    async submit_credentials() {
        const payload = {
            email: this.state.email,
            password: this.state.password
        }
        const response = await apiPost('/login', payload)

        if(response.status == 401 || response.status == 404){
            this.setState({
                loginFails: true
            })
        }
        else{
            this.setState({
                loginSuccessful: true
            })
            const userInfo = await response.json()

            this.props.onUserInfoChange(userInfo)
        }
    }
}

export default Login