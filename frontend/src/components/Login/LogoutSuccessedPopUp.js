import React from 'react'
import './LoginPopUp.css'

function LogoutSuccessedPopUp(props) {
    return (props.trigger)?(
        <div className="LogInPopUp">
            <div className = "LogInPopUp-inner"> 
                <h1> Logout successed</h1>
                <button className="close-button" onClick = {()=>props.exist()}>close</button>
            </div>
        </div>
    ):''

}

export default LogoutSuccessedPopUp