import React from 'react'
import './LoginPopUp.css'

function LoginSuccessedPopUp(props) {
    return (props.trigger)?(
        <div className="LogInPopUp">
            <div className = "LogInPopUp-inner"> 
                <h1> Login successed</h1>
                <button className="close-button" >close</button>
            </div>
        </div>
    ):''

}

export default LoginSuccessedPopUp