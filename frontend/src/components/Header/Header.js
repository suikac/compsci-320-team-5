import React, { Component } from "react";
import logo from "../Login/Logo2.png";
import NotifPic from "./Notif.png";
import ProfPic from "./ProfPic.png";
import searchicon from "./searchicon.png"
import headercss from "./Header.module.css";
import {DropdownButton, Dropdown, Stack} from "react-bootstrap"

class Header extends Component {
    render() {
       return (
           <div className = {headercss.HeaderContainer}>
            <Stack direction='horizontal' className={headercss.hstack}>
                {/* <div className={headercss.logoContainer}> */}
                <img className = {headercss.logoimg} src = {logo} alt = "A logo"></img>
                {/* </div> */}
                <h1> Insert Company logo here from the backend </h1>
                <Dropdown>
                    <Dropdown.Toggle variant='default' bsPrefix='p-0'>
                        <img src= {ProfPic} className ={headercss.profpic}></img>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Stack>
           </div>
        )
    }
}

export default Header;
