import React, {Component} from "react";
import Email_Bar from "./email_bar";
import "./main_mailbox.module.css";
import main_mailboxcss from "./main_mailbox.module.css";

function Main_Mailbox() {
    return (
        <ul className={main_mailboxcss.Mailbox}>
            <li><Email_Bar/></li>
            <li><Email_Bar/></li>
            <li><Email_Bar/></li>
            <li><Email_Bar/></li>
            <li><Email_Bar/></li>
            <li><Email_Bar/></li>
            <li><Email_Bar/></li>
            <li><Email_Bar/></li>
            <li><Email_Bar/></li>
            <li><Email_Bar/></li>
        </ul>
    );
}

export default Main_Mailbox