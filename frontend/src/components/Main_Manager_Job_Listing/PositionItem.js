import React, {useState, useEffect} from "react";
import { Row, Col } from "react-bootstrap"
import {Link} from "react-router-dom";
import ReferCSS from "./MainManagerJobListing.module.css"
import {apiGet} from "../../utils/api-fetch";

const PositionItem = (props) => {
        let tags = props.tags.reduce((acc, e) => acc + e + ", ", "");
        tags = tags.substring(0, tags.length - 2)
        const [totalReferrals, setTotalReferrals] = useState(0)
        const [unreadReferrals, setUnreadReferrals] = useState(0)

        async function getNumReferrals() {
            return await apiGet(`/referral/get?positionId=${props.id}&isManager=1`);
        }

        useEffect(() => {
            getNumReferrals()
            .then(r => r.json())
            .then(r => {
                let length = r.filter(x => !x.isRead).length;
                setUnreadReferrals(length);
                setTotalReferrals(r.length);
            })
        }
        , [props.positionId])

        return (
            <Row className={`${ReferCSS.positionContainer} row`} style={{justifyContent: "center", alignItems: "center"}}>
                <Col lg={3}><h5 className='text-center'>Job ID: {props.id}</h5></Col>
                <Col lg={4}>
                    <Link style={{textDecoration: "none"}} to={{
                        pathname: `/jobListing/${props.id}-${props.title}`
                    }}>
                        <h4 style={{color: "#197278"}} className='text-center'>{props.title}</h4>
                    </Link>
                </Col>
                <Col lg={2}>
                    <Link style={{textDecoration: "none"}} to={{
                        pathname: `/jobListing/${props.id}-${props.title}`
                    }}>
                        <h5 style={{color: "#197278"}} className='text-center'>Edit</h5>
                    </Link>
                </Col>
                <Col lg={3}>
                        <h6 className='text-center' style={{color: "#212529"}}>{totalReferrals} {totalReferrals === 1 ? "Referral": "Referrals"} ({unreadReferrals} Unread)</h6>
                </Col>
            </Row>
        );
}

export default PositionItem;