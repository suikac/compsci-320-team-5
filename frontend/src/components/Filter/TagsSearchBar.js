import React, {useRef, useEffect, useState } from "react";
import { apiPost } from "../../utils/api-fetch"

function TagsSearchBar(props) {
    const [curTag,setCurTag] = useState('')
    const [selectedTags,setSeletedTags] = useState([])
    const [isLoaded,setLoad] = useState(false)
    const [deafaultTags,setDefaultTags] = useState([])
    const target = useRef(null)
    async function getTags() {
        const a = await apiPost('/tag/get')
        return a
    }
    
    useEffect(()=>{
        let temp = []
        getTags().then(a => a.json()).then(a =>{
            setDefaultTags(a.map(x => x.name))
        })
    },[])

    function _onKeyDown(e){
       // if(e.key == 'Enter'){
            let temp = [...selectedTags]
            temp.push(curTag)
            console.log(temp)
            // setSeletedTags(temp)
            // console.log(selectedTags)
        //}
    }

    return(
        <div>
            <input list="brow" 
                    onKeyDown = {curTag != '' ? async (e) => {
                        if(e.key == 'Enter'){
                            let temp = [...selectedTags]
                            temp.push(curTag)
                            setSeletedTags(temp)
                            props.fun(selectedTags)
                        }
                      }:undefined}
                    value = {curTag}
                    onChange = {async (e) => {
                        setCurTag(e.target.value)
                        // console.log(curTag)
                      }}
            />
                <datalist id="brow" >
                {deafaultTags.map(tags => (
                    <option key = {tags} >{tags}</option>
                ))}
                </datalist>
        </div>
    )
}
export default TagsSearchBar