import React, { Component } from "react"
import NavBarcss from "./navBar.module.css";
import {Row, Col} from "react-bootstrap"
import { Link as RLink, useLocation } from 'react-router-dom'
import * as paths from "../../utils/paths"
import ArrowImg from './arrow.png'

class NavBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
                <ul className={NavBarcss.NavBarContainer}>
                        <Link to='/'>
                            HOME
                        </Link>
                        <Link to={paths.REFER}>
                            REFER
                        </Link>
                        <Link to={paths.PREV_REF}>
                            PREVIOUS REF
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
                            MANAGE JOB REFERRALS
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
    const {children, to, ..._props} = props
    return (
        <li>
            <RLink to={to} className={location.pathname === to ? NavBarcss.selected : ''}>
                {children}
                <img src={ArrowImg} alt={"Navbar Arrow"}/>
            </RLink>
        </li>
    )
}

export default NavBar;