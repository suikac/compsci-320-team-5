import React from "react";
import RefBox from "./Previous_refs";
import { apiGet } from "../../utils/api-fetch";

const prevrefdata = [{refTitle: "Whatever",
                    referred: "Whatever",
                    referredDesc: "Whatever",
                    imgUrl: "Whatever",
                    refStat: "Whatever",
                    refStatDesc: "Whatever"
                    }]

function MainPreviousRef(){
    getReferral()
    const prevRefComponents = prevrefdata.map( refData => <RefBox refTitle = {refData?.refTitle} referred = {refData?.referred}
        referredDesc = {refData?.referredDesc} imgUrl = {refData?.imgUrl} refStat = {refData?.refStat}  refStatDesc = {refData?.refStatDesc}/>)
        console.log(prevrefdata)
    return(
            <React.Fragment>{prevRefComponents}</React.Fragment>
    )
}

async function getReferral() {
  const data = await apiGet("/referral/getUnread")
  console.log(data.json())
}

export default MainPreviousRef;
