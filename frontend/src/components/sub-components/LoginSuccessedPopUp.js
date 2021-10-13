import React from 'react'
import './../../components-style/LoginPopUp.css'

function LoginSuccessedPopUp(props) {
    return (props.trigger)?(
        <div className="LogInPopUp">
            <div className = "LogInPopUp-inner"> 
                <h1> Login success</h1>
                <button className="close-button"  onClick = {()=>props.exist()}>close</button>
            </div>
        </div>
    ):''

}

export default LoginSuccessedPopUp