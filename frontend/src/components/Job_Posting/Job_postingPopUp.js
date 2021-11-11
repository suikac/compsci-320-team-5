import { style } from 'dom-helpers'
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
                    <div className = {styles.h1}>{message} </div>
                    <div className = {styles.h3}>{props.effect()}</div>
                </div>
            </div>
        </h2>
    ):''
}