import React, {Component} from "react";
import Email_Bar from "./email_bar";
import "./main_mailbox.module.css";
import main_mailboxcss from "./main_mailbox.module.css";
import { apiGet, apiPost } from '../../utils/api-fetch';


let referrals = []

function Main_Mailbox() {
  getUnreadReferral().then(r => console.log(r))
    return (
        <ul>
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

async function getUnreadReferral() {
  const data = await apiGet("/referral/get?isManager=1&isRead=0")
  return data.json()
}

export default Main_Mailbox
