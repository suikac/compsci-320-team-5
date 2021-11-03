import React, { Component } from "react"
import NavBarcss from "./navBar.module.css";
import { Link } from 'react-router-dom'

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
                        <Link to='/refer'>
                            REFER
                        </Link>
                    </li>
                    <li>
                        <Link to='/mailbox'>
                            MAILBOX
                        </Link>
                    </li>
                    <li>
                        <Link to='/prevRef'>
                            PREVIOUS REF
                        </Link>
                    </li>
                    <li>
                        <Link to='/explore'>
                            EXPLORE
                        </Link>
                    </li>
                    {this.props.isManager ?
                    <li>
                        <Link to='/createPosting'>
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