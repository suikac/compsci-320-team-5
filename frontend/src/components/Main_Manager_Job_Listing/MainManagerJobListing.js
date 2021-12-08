import React, {useState} from "react";
import PositionItem from "./PositionItem";
import styles from "./MainManagerJobListing.module.css"
import JobListingFilter from "./JobListingFilter";
import { usePageLoadTrigger } from "../Filter/Filter";
import InfiniteScroll from "react-infinite-scroll-component";
const MainManagerJobListing = () => {

    let [data, setData] = useState([]);
    const [trigger, loadPage] = usePageLoadTrigger()

    return (
        <div className={styles.container}>
            {/* Component used for filtering position data */}
            <JobListingFilter setResult={setData} pageLoadTrigger={trigger}/>
            {/* Component that displays position data with PositionItem components */}
            <div className={'mt-1'} id={styles.scrollableTarget}>
                <InfiniteScroll
                dataLength={data.length}
                hasMore={true}
                next={loadPage}
                scrollableTarget={styles.scrollableTarget}>
                    {data.map((e, index) => {
                        return (
                            <div key={index} className={`mb-2 ${styles.positionItemContainer}`}>
                                <PositionItem key={e.id} {...e} />
                            </div>
                        );
                    })}
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default MainManagerJobListing