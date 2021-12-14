import React, {useState, useEffect} from "react";
import { Row, Col, Container } from "react-bootstrap"
import {useParams, Link} from "react-router-dom";
import ReferralItem from "./ReferralItem";
import ReferCSS from "./MainManagerJobListing.module.css"
import { usePageLoadTrigger } from "../Filter/Filter";
import InfiniteScroll from "react-infinite-scroll-component";
import {apiGet} from "../../utils/api-fetch";
const MainManagerJobListingItem = (props) => {
    const {positionId} = useParams();
    const [referrals, setReferrals] = useState([])

    async function getReferralsByPosition() {
        return await apiGet(`/referral/get?positionId=${positionId}&isManager=1`);
    }

    useEffect(() => {
        getReferralsByPosition()
        .then(r => r.json())
        .then(r => {
            setReferrals(r);
        })
    }
    , [props.positionId])

    const [trigger, loadPage] = usePageLoadTrigger()

    return (
        <Container className={ReferCSS.container}>
            <Row className={['py-1']} xs='auto' style={{alignItems: "center", justifyContent: "space-around"}}>
                <Col>
                <Link style={{textDecoration: "none"}} to={{
                        pathname: `/jobListing`
                    }}>
                        <h5 style={{color: "#197278"}}>{"◀️"} Back</h5>
                </Link>
                </Col>
                <Col> <h2>Software Engineer</h2> </Col>
                <Col> <h5>Job ID: {positionId} </h5></Col>
            </Row>
            <div className={ReferCSS.positionItemContainer} style={{border: "2px solid #4c4c4c"}}>
                <Row className={`${ReferCSS.positionContainer} row`} style={{justifyContent: "center", alignItems: "center"}}>
                    <Col lg={2}><h5 className='text-center'>Referral ID</h5></Col>
                    <Col lg={3}><h5 className='text-center'>Candidate</h5></Col>
                    <Col lg={3}><h5 className='text-center'>Referrer</h5></Col>
                    <Col lg={4}><h5 className='text-center'>Email</h5></Col>
                </Row>
            </div>
            <div className={'mt-1'} id={ReferCSS.scrollableTarget}>
            {referrals.length === 0 ? <Row className={['py-1']} xs='auto' style={{alignItems: "center", justifyContent: "space-around"}}>
                <Col>
                    <h5>No referrals received!</h5>
                </Col>
            </Row> :
            <InfiniteScroll
            dataLength={referrals.length}
            hasMore={true}
            next={loadPage}
            scrollableTarget={ReferCSS.scrollableTarget}>
                {referrals.map((e, index) => {
                    return (
                        <ReferralItem key={index} {...e} />
                    );
                })}
            </InfiniteScroll>
            }
            </div>
        </Container>
    )
}

export default MainManagerJobListingItem