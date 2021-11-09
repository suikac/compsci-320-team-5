import React from "react";
import MPRcss from "./main_previous_ref.module.css";

function RefBox(props){
    return (
        <div className = {MPRcss.refBoxCont}>
            <div className="container mt-5">
                <div className="row">
                    <h2>{props.refTitle}</h2> {/*Referral Title*/}
                    <div className="col-sm-4">
                        <h3>Name: {props.referred}</h3> {/*Person Referred*/}
                        <p>About Position: {props.referredDesc}</p>
                    </div>
                    <div className="col-sm-4">
                        <h3>Referral Status: {props.refStat}</h3> {/*Referral Status*/}
                    </div>
                    <div className="col-sm-4">
                        <h3>Status Description: {props.refStatDesc}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RefBox;