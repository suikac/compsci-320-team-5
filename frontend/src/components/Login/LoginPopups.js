import React from 'react'
import styles from "./Login.module.css"

export function LoginFailedPopUp(props) {
    return PopUp(props, "Email and password do not match")
}

export function LoginSuccessedPopUp(props) {
    return PopUp(props, "Login successful")
}

export function LogoutSuccessedPopUp(props) {
    return PopUp(props, "Logout successful")
}

function PopUp(props, message) {
    return (props.trigger)?(
        <div className={styles.popUp}>
            <div className = {styles.popUpInner}>
                <h1>{message}</h1>
                <button className={styles.closeButton} onClick = {()=>props.exist()}>Close</button>
            </div>
        </div>
    ):''
}

