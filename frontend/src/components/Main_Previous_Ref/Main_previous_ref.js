import React, { useEffect, useState } from 'react';
import { Row, Col } from "react-bootstrap";
import RefBox from './Previous_refs';
import { apiGet } from '../../utils/api-fetch';
import {EmptyLogo} from "../../assets";

function MainPreviousRef() {
  const [refData, setRefData] = useState([])
  const [isLoad, setIsLoad] = useState(false)
  useEffect(() => {
    getReferral()
      .then(r => r.json())
      .then(r => {
        setRefData(r);
        setIsLoad(true);
      })
  }
    , [])

  if (!isLoad) {
    return <div>Loading...</div>;
  } else {
    const prevRefComponents =
      refData.map(refData => <RefBox refTitle={refData.position.title}
        referred={refData.refereeName}
        jobDesc={refData.position.description}
        salary={refData.position.salary}
        minExp={refData.position.minYearExperience}
        refDesc={refData.description} />);
    return (
      <React.Fragment>
        {refData.length !== 0 ?
          prevRefComponents
          :
          (<Row style={{ alignItems: "center", justifyContent: "center", height: "30em", borderRadius: "3em"}}>
            <Col style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
              <img src={EmptyLogo} alt="Empty" style={{width: "8em", height: "auto", opacity: "0.85"}}/>
              <h3> No previous referrals exist!</h3>
            </Col>
          </Row>)
        }
      </React.Fragment>
    )
  }
}

async function getReferral() {
  return await apiGet("/referral/get?isRead=0");
}

export default MainPreviousRef;
