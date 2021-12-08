import React, { useState, useEffect } from "react";
import PositionItem from "./Position_item";
import ReferCSS from "./main_refer.module.css";
import * as api from "../../utils/api-fetch";
import JobListingFilter from "./JobListingFilter";
import { usePageLoadTrigger } from "../Filter/Filter";
import InfiniteScroll from "react-infinite-scroll-component";

// Function based component for refer page
function Referral() {
    // State object that stores data on positions
    let [data, setData] = useState([]);
    const [trigger, loadPage] = usePageLoadTrigger()

    return (
        <div className={ReferCSS.container}>
            {/* Component used for filtering position data */}
            <JobListingFilter setResult={setData} pageLoadTrigger={trigger}/>

            {/* Component that displays position data with PositionItem components */}
            <div className={'mt-1'} id={ReferCSS.scrollableTarget}>
                <InfiniteScroll
                dataLength={data.length}
                hasMore={true}
                next={loadPage}
                scrollableTarget={ReferCSS.scrollableTarget}>
                    {data.map((e) => {
                        return (<div className={`mb-2 ${ReferCSS.positionItemContainer}`}> <PositionItem key={e.id} {...e} /></div> );
                    })}
                </InfiniteScroll>
            </div>
        </div>
    )
}

// Export component for use in Main.js
export default Referral;