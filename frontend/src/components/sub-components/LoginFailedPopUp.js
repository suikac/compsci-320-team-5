import React from 'react'
import './../../components-style/LoginPopUp.css'

function LoginFailedPopUp(props) {
    return (props.trigger)?(
        <div className="LogInPopUp">
            <div className = "LogInPopUp-inner"> 
                <h1> Email and password does not match</h1>
                <button className="close-button" onClick = {()=>props.exist()}>close</button>
            </div>
        </div>
    ):''

}

export default LoginFailedPopUp


