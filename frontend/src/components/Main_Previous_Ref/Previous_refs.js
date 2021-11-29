import React from "react";
import MPRcss from "./main_previous_ref.module.css";

function RefBox(props){
    return (
        <div className = {MPRcss.refBoxCont}>
            <div className="container mt-5">
                <div className="row">
                    <h2>{props.refTitle}</h2> {/*Referral Title*/}
                    <div className="col-sm-4">
                        <h4>Name: {props.referred}</h4> {/*Person Referred*/}
                        <h4>About Position: </h4>
                        <p>{props.jobDesc}</p>
                    </div>
                    <div className="col-sm-4">
                        <h4>Minimum Year Experience: <h5>{props.minExp}</h5></h4>
                        <h4>Offered Salary: <h5>{props.salary}</h5></h4>
                    </div>
                    <div className="col-sm-4">
                        <h4>Referred Description: </h4>
                        <p>{props.refDesc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RefBox;