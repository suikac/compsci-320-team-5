import React, { useEffect, useState } from 'react';
import Email_Bar from './email_bar';
import './main_mailbox.module.css';
import { apiGet } from '../../utils/api-fetch';


function Main_Mailbox() {
  const [isload, setIsLoad] = useState(false);
  const [referrals, setReferrals] = useState();
  useEffect(() => {
    getUnreadReferral()
      .then(r => r.json())
      .then(r => {
        setReferrals(r);
        setIsLoad(true);
      })
  }, [])

  if (!isload) {
    return <div>loading</div>
  } else {
    console.log(referrals)
    return (
      <ul>
        {referrals.map(referral => (
          <li key={referral.id}>
            {referral.position.title} {referral.position.salary}
          </li>
        ))}
        <li>this.referrals[0]<Email_Bar /></li>
        <li><Email_Bar /></li>
        <li><Email_Bar /></li>
        <li><Email_Bar /></li>
        <li><Email_Bar /></li>
        <li><Email_Bar /></li>
        <li><Email_Bar /></li>
        <li><Email_Bar /></li>
        <li><Email_Bar /></li>
        <li><Email_Bar /></li>
      </ul>
    );
  }
}

async function getUnreadReferral() {
  return await apiGet("/referral/get?isManager=1&isRead=0")
}

export default Main_Mailbox
