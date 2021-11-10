import React, { Component } from "react"
import NavBarcss from "./navBar.module.css";
import { Link } from 'react-router-dom'
import * as paths from "../../utils/paths"

class NavBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
                <ul className={NavBarcss.NavBarContainer}>
                    <li>
                        <Link to='/'>
                            HOME
                        </Link>
                    </li>
                    <li>
                        <Link to={paths.REFER}>
                            REFER
                        </Link>
                    </li>
                    <li>
                        <Link to={paths.MAILBOX}>
                            MAILBOX
                        </Link>
                    </li>
                    <li>
                        <Link to={paths.PREV_REF}>
                            PREVIOUS REF
                        </Link>
                    </li>
                    <li>
                        <Link to={paths.EXPLORE}>
                            EXPLORE
                        </Link>
                    </li>
                    {this.props.isManager ?
                    <li>
                        <Link to={paths.CREATE_POSTING}>
                            CREATE POSTING
                        </Link>
                    </li>
                    :
                    null
                    }
                </ul>
        )
    }
}

export default NavBar;