import React from "react";
import {AkiLogo, CompanyLogo, ProfileLogo} from "../../assets";
import headercss from "./Header.module.css";
import { Dropdown, Stack } from "react-bootstrap"
import {Link} from "react-router-dom"

function Header(props) {
    console.log(props);
    return (
        <div className={headercss.HeaderContainer}>
            <Stack direction='horizontal' className={headercss.hstack}>
                <Link to = "/">
                    <img className={headercss.logoimg} src={AkiLogo} alt="A logo"></img>
                </Link>
                <div className = "mx-auto"><img className = {headercss.complogo} src = {CompanyLogo} alt = "Company Logo"></img></div>
                <Dropdown>
                    <Dropdown.Toggle variant='default' bsPrefix='p-0'>
                        <img src={ProfileLogo} className={headercss.profpic} alt="Profile"></img>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                        onClick={props.onLogout}>
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Stack>
        </div>
    )
}

export default Header;
