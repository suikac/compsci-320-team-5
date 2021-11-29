import React, { Component, useEffect, useState } from 'react';
import Footer from "../Footer/Footer";
import maincss from "./main_home.module.css";
import { apiGet,apiPost } from '../../utils/api-fetch';

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
  
  let [index, setIndex] = useState(0);
  const incrementIndex = () => setIndex(index + 1);
  const decrementIndex = () => setIndex(index - 1);
  if(index<0) {
    index=4;
  }
  if(index>4) {
    index = 0
  }
    
  
  if (!isLoad){
    return <div>Loading...</div>;
  } else {
    console.log(positionData)
    
    return(
      <div className={maincss.MainContainer}>
        <h1 className="rec"> RECOMMENDED</h1>

        <div className={maincss.MainJobContainer}>
          <button onClick={incrementIndex}>Next</button>
          <button onClick={decrementIndex}> Prev </button>
          <h2 className="jobTitle">Job Title: {positionData[index].title} </h2>
          <h2 className="managerInfo">Manager:  {positionData[index].manager.firstName} {positionData[index].manager.lastName}</h2>
          <h2 className="tags">Tags: {positionData[index].tags.join(', ')}</h2>
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
  return await apiPost("/position/get",{limit:'5'});
}


export default Main_Home;
