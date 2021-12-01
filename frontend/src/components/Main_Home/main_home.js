import React, { Component, useEffect, useState } from 'react';
import Footer from "../Footer/Footer";
import maincss from "./main_home.module.css";
import { apiGet,apiPost } from '../../utils/api-fetch';
import left from './left_arrow.png'
import right from './right_arrow.png'
import { Link } from 'react-router-dom';
import * as paths from '../../utils/paths'
import ReferCSS from '../Main_Refer/main_refer.module.css'

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
  const titleStyle = {
    fontSize: 20,
    color: "black",
    textAlign: "right",
    paddingTop: "30px",
    paddingRight:"15px",
  }
  const managerStyle = {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    paddingTop: "30px",

  }
  const tagsStyle = {
    fontSize: 20,
    color: "black",
    textAlign: "left",
    paddingTop: "30px",
    paddingLeft:"15px",
  }

  const recStyle = {
    color: "gray",

  }


  if (!isLoad){
    return <div>Loading...</div>;
  } else {
    return(
      <div className={maincss.MainContainer}>
        <h1 style = {recStyle}> RECOMMENDED</h1>

        <div className={maincss.MainJobContainer}>
          <button type="prev-next"><img src={left} onClick={decrementIndex}/></button>
          <button type="prev-next"><img src={right} onClick={incrementIndex}/></button>

          <h2 style = {titleStyle}>Job Title: {positionData[index].title} </h2>
          <h2 style = {managerStyle}>Manager:  {positionData[index].manager.firstName} {positionData[index].manager.lastName}</h2>
          <h2 style = {tagsStyle}>Tags: {positionData[index].tags.join(', ')}</h2>
          <div className={maincss.refButton}>
            <Link to={{ pathname: paths.CREATE_REFER, state: positionData[index] }}>
              <button className={ReferCSS.referBtn}>REFER</button>
            </Link>
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
