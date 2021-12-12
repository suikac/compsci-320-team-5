import React, { Component } from "react"
import NavBarcss from "./navBar.module.css";
import { Link as RLink, useLocation } from 'react-router-dom'
import * as paths from "../../utils/paths"
import {NavArrow} from '../../assets'

class NavBar extends Component {
    render() {
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
                {this.props.isManager ?
                    <Link to={paths.CREATE_POSTING}>
                        CREATE POSTING
                    </Link>
                    :
                    null
                }
                {this.props.isManager ?
                    <Link to={paths.MANAGER_JOB_LISTING}>
                        MANAGE REFERRALS
                    </Link>
                    :
                    null
                }
            </ul>
        )
    }
}

function Link(props) {
    const location = useLocation()
    const { children, to } = props
    return (
        <li>
            <RLink to={to} className={location.pathname === to ? NavBarcss.selected : ''}>
                {children}
                <img src={NavArrow} alt={"Navbar Arrow"} />
            </RLink>
        </li>
    )
}

export default NavBar;