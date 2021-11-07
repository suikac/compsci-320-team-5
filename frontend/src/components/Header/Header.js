import React, { Component, useState } from "react";
import logo from "../Login/Logo2.png";
import NotifPic from "./Notif.png";
import ProfPic from "./ProfPic.png";
import searchicon from "./searchicon.png"
import headercss from "./Header.module.css";
import { DropdownButton, Dropdown, Stack } from "react-bootstrap"

function Header(props) {
    return (
        <div className={headercss.HeaderContainer}>
            <Stack direction='horizontal' className={headercss.hstack}>
                <img className={headercss.logoimg} src={logo} alt="A logo"></img>
                <h1> Insert Company logo here from the backend </h1>
                <Dropdown className='ms-auto'>
                    <Dropdown.Toggle variant='default' bsPrefix='p-0'>
                        <img src={ProfPic} className={headercss.profpic}></img>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                        onClick={props.onLogout}>
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <img className={headercss.notifpic} src={NotifPic} alt="NotifPic"></img>
            </Stack>
        </div>
    )
}

export default Header;
