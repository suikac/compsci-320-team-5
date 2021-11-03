import React from "react"
import NavBarcss from "./navBar.module.css";
import { Link } from 'react-router-dom'

function NavBar(){
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
                </ul>
    )
}

export default NavBar;