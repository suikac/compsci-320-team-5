import React from 'react'
import styles from "./Job_postingPopUp.module.css"

export function JobCreateSuccessedPopUp(props) {
    return PopUp(props, "Job Create Successful")
}


function PopUp(props, message) {
    
    return (props.trigger)?(
        <h2>
            <div className={styles.popUp}>
                <div className = {styles.popUpInner}>
                    <h1>{message} </h1>
                    <h3>{props.effect()}</h3>
                </div>
            </div>
        </h2>
    ):''
}