import React from "react";
import MPRcss from "./main_previous_ref.module.css";

function RefBox(props){
    return (
        <div className = {MPRcss.refBoxCont}>
            <div className="container mt-5">
                <div className="row">
                    <h2>{props.refTitle}</h2> {/*Referral Title*/}
                    <div className="col-sm-4">
                        <h3>{props.referred}</h3> {/*Person Referred*/}
                        <p>{props.referredDesc}</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
                    </div>
                    <div className="col-sm-4">
                        <img src = {props.imgUrl} alt = "image of a fish"></img> {/*Image for the Job*/}
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
                    </div>
                    <div className="col-sm-4">
                        <h3>{props.refStat}</h3> {/*Referral Status*/}
                        <p>{props.refStatDesc}</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RefBox;