import React, { Component, useEffect, useState } from 'react';
import Footer from "../Footer/Footer";
import maincss from "./main_home.module.css";
import { apiGet } from '../../utils/api-fetch';

function Main_Home(){
  const [positionData, setPositionData] = useState([])
  const [isLoad, setIsLoad] = useState(false)
  useEffect(() => {
      getPosition()
        .then(r => r.json())
        .then(r => {
          setPositionData(r);
          setIsLoad(true);
        })
    }
    , [])

  if (!isLoad){
    return <div>Loading...</div>;
  } else {
    console.log(positionData)
    
    return(
      <div className={maincss.MainContainer}>
        <h1 className="rec"> RECOMMENDED</h1>
        <div className={maincss.MainJobContainer}>
          <h1 className="jobTitle">Role: {positionData[0].title} </h1>
          <h1 className="managerInfo">Manager:  {positionData[0].managerId}</h1>
          <h1 className="tags">Tags: {positionData[0].tags.join(', ')}</h1>
          <div className={maincss.refButton}>
            <input type="submit" value="REFER" className="refer-button" />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

async function getPosition() {
  return await apiGet("/position/getRecommendedPositions?page=0");
}
/*async function getEmployee(){
  return await apiGet("/")
}
*/

export default Main_Home;
