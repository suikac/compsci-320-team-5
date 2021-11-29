import React, { Component, useState } from "react";
import logo from "../Login/Logo2.png";
import NotifPic from "./Notif.png";
import ProfPic from "./ProfPic.png";
import searchicon from "./searchicon.png"
import headercss from "./Header.module.css";
import { DropdownButton, Dropdown, Stack } from "react-bootstrap"
import CompanyLogo from "./companylogo.png"

function Header(props) {
    return (
        <div className={headercss.HeaderContainer}>
            <Stack direction='horizontal' className={headercss.hstack}>
                <img className={headercss.logoimg} src={logo} alt="A logo"></img>
                <div className = "mx-auto"><img className = {headercss.complogo} src = {CompanyLogo} alt = "Company Logo"></img></div>
                <Dropdown>
                    <Dropdown.Toggle variant='default' bsPrefix='p-0'>
                        <img src={ProfPic} className={headercss.profpic} alt="Profile Picture"></img>
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
