import React, { useEffect, useState } from 'react';
import EmailBar from './email_bar';
import './main_mailbox.module.css';
import { apiGet } from '../../utils/api-fetch';


function Main_Mailbox() {
  const [isload, setIsLoad] = useState(false);
  const [referrals, setReferrals] = useState([]);
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
          <li>
            <EmailBar
              job={referral.position.title}
              referrer={referral.referrer.firstName + " " + referral.referrer.lastName}
              referee={referral.referee === undefined ? referral.refereeName :
                referral.referee.firstName + " " + referral.referee.lastName}/>
          </li>
        ))}
      </ul>
    );
  }
}

async function getUnreadReferral() {
  return await apiGet("/referral/get?isManager=1&isRead=0")
}

export default Main_Mailbox
