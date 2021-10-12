import React from 'react'
import './LoginPopUp.css'

function LoginSuccessedPopUp(props) {
    return (props.trigger)?(
        <div className="LogInPopUp">
            <div className = "LogInPopUp-inner"> 
                <h2> Login success</h2>
                <button className="close-button" >CLOSE</button>
            </div>
        </div>
    ):''

}

export default LoginSuccessedPopUp