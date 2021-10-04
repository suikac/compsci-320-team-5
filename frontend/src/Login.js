import React, {Component} from "react";
import logo from "./Logo2.png";
const [email] = "";
const [password] = "";

class Login extends Component {
    render() {
        return (
            <div class = "container">
                <form>
                    <h1>Login</h1>

                    <div class="credentials">
                        <label>Username</label>
                        <input type="email" value = {email} class="form-control" placeholder="Enter email" />
                    </div>

                    <div class="credentials">
                        <label>Password</label>
                        <input type="password" value = {password} class="form-control" placeholder="Enter password" />
                    </div>
                    
                    <button type="login" class="login-button">Login</button>
                    <p class="forgot-password text-right">
                        <a href="#"> Forgot password?</a>
                    </p>
                </form>
                <img class = "photo" src = {logo} width = "100" height = "50"/>
            </div>
            
        );
    }
}

export default Login