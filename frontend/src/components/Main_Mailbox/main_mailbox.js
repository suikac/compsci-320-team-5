import React, {Component} from "react";
import Email_Bar from "./email_bar";
import "./main_mailbox.module.css";
import main_mailboxcss from "./main_mailbox.module.css";
import { apiGet, apiPost } from '../../utils/api-fetch';


let referrals = []

async function Main_Mailbox() {
  await getUnreadReferral()
  console.log(referrals['0']['position']['title'])
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

async function getUnreadReferral() {
  const data = await apiGet("/referral/get?isRead=0")
  data.json().then(res => referrals = res)
}

export default Main_Mailbox
