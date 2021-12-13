import React, {useState, useEffect} from "react"
import NavBarcss from "./navBar.module.css";
import {Badge} from "react-bootstrap"
import { Link as RLink, useLocation } from 'react-router-dom'
import * as paths from "../../utils/paths"
import {apiGet, apiPost} from "../../utils/api-fetch";

const NavBar = (props) => {
    let [numUnread, setNumUnread] = useState(0);

    async function getReferrals(positionId) {
        return await apiGet(`/referral/get?positionId=${positionId}&isManager=1`);
    }

    async function getPositionsByManager() {
        return await apiPost(`/position/get`, {owned: true});
    }

    function Link(_props) {
        const location = useLocation()
        const { children, to } = _props
        return (
            <li>
                <RLink to={to} className={location.pathname === to ? NavBarcss.selected : ''}>
                    {children} <span className={NavBarcss.arrow}>▶️</span>
                </RLink>
            </li>
        )
    }

    useEffect(() => {
        let count = 0;
        getPositionsByManager()
        .then(posArray => posArray.json())
        .then(posArray => {
            posArray.forEach(pos => {
                getReferrals(pos.id)
                .then(refArray => refArray.json())
                .then(refArray => {
                    refArray.forEach(ref => {
                        if (!ref.isRead) {
                            ++count;
                            setNumUnread(count);
                        }
                    })
                });
            });
        });
    }, []);

    return (
        <ul className={NavBarcss.NavBarContainer}>
            <Link to='/'>
                HOME
            </Link>
            <Link to={paths.REFER}>
                REFER
            </Link>
            <Link to={paths.PREV_REF}>
                PREVIOUS REFERRALS
            </Link>
            {props.isManager ?
                <Link to={paths.CREATE_POSTING}>
                    CREATE POSTING
                </Link>
                :
                null
            }
            {props.isManager ?
                <Link to={paths.MANAGER_JOB_LISTING}>
                    <Badge pill className={NavBarcss.notifications} bg="danger">{numUnread}</Badge>
                    <span style={{position: "relative", left: "-5px"}}>
                        MANAGE REFERRALS 
                    </span>
                </Link>
                :
                null
            }
        </ul>
    )
}

export default NavBar;