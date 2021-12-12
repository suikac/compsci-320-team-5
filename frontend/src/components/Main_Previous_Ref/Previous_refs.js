import React from "react";
import MPRcss from "./main_previous_ref.module.css";

function RefBox(props){
    return (
        <div className = {MPRcss.refBoxCont}>
            <div className="container">
                <div className="row">
                    <h2>{props.refTitle}</h2> {/*Referral Title*/}
                    <div className="col-sm-4">
                        <div style = {{border: "2px solid #197278", borderRadius: "1em", padding: "0.5em", margin: ".5em"}}><h4>Name: {props.referred}</h4></div>
                         {/*Person Referred*/}
                         <div style = {{border: "2px solid #197278", borderRadius: "1em", padding: "0.5em", margin: ".5em"}}>
                            <h4>About Position:</h4>
                            <p>{props.jobDesc}</p>
                         </div>
                    </div>
                    <div className="col-sm-4">
                        <div style = {{border: "2px solid #197278", borderRadius: "1em", padding: "0.5em", margin: ".5em"}}>
                            <h4>Minimum Year Experience: <h5>{props.minExp}</h5></h4>
                        </div>
                        <div style = {{border: "2px solid #197278", borderRadius: "1em", padding: "0.5em", margin: ".5em"}}><h4>Offered Salary: <h5>{props.salary}</h5></h4></div>
                    </div>
                    <div className="col-sm-4">
                        <div style = {{border: "2px solid #197278", borderRadius: "1em", padding: "0.5em", margin: ".5em"}}>
                            <h4>Referred Description: </h4>
                            <p>{props.refDesc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RefBox;