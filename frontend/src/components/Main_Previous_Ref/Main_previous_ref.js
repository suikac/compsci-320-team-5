import React, { useEffect, useState } from 'react';
import RefBox from './Previous_refs';
import { apiGet } from '../../utils/api-fetch';

function MainPreviousRef(){
    const [prevrefdata, setPrevrefdata] = useState([])
  const [isLoad, setIsLoad] = useState(false)
    useEffect(() => {
        getReferral()
          .then(r => r.json())
          .then(r => {
            setPrevrefdata(r);
            setIsLoad(true);
          })
      }
    , [])

    if (!isLoad){
      return <div>Loading...</div>;
    } else {
      console.log(prevrefdata['0']['position'])
      const prevRefComponents =
        prevrefdata.map(refData => <RefBox refTitle={refData?.refTitle}
                                                                   referred={refData?.referred}
                                                                   referredDesc={refData?.referredDesc}
                                                                   imgUrl={refData?.imgUrl} refStat={refData?.refStat}
                                                                   refStatDesc={refData?.refStatDesc} />)
      return (
        <React.Fragment>{prevRefComponents}</React.Fragment>
      )
    }
}

async function getReferral() {
  return await apiGet("/referral/get?isManager=1&isRead=0");
}

export default MainPreviousRef;
