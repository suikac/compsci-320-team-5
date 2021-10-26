import React from "react";
import RefBox from "./Previous_refs";

const prevrefdata = [{refTitle: "Whatever",
                    referred: "Whatever",
                    referredDesc: "Whatever",
                    imgUrl: "Whatever",
                    refStatus: "Whatever",
                    refStatusDesc: "Whatever"
                    }]

function MainPreviousRef(){
    const prevRefComponents = prevrefdata.map( refData => <RefBox refTitle = {refData?.refTitle} referred = {refData?.referred} 
        referredDesc = {refData?.referredDesc} imgUrl = {refData?.imgUrl} refStatus = {refData?.refStat}  refStatusDesc = {refData?.reftStatDesc}/>)
        console.log(prevrefdata)
    return(
        <div>
            {prevRefComponents}
        </div>
    )
}

export default MainPreviousRef;