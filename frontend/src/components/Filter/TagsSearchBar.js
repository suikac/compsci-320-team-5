import React, {useRef, useEffect, useState } from "react";
import { Tooltip } from "react-bootstrap";
import { apiPost } from "../../utils/api-fetch"

function TagsSearchBar(props) {
    const [curTag,setCurTag] = useState('')
    const [ShowToolTip,setShowToolTip] = useState(false)
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

    return(
        <div>
            <input list="brow" 
                    onKeyDown = {curTag != '' ? async (e) => {
                        if(e.key == 'Enter'){
                            let temp = [...props.tags]
                            if(deafaultTags.includes(curTag)){
                                temp.push(curTag)
                                props.fun(temp)
                            }
                            else{
                                setCurTag('')
                                setShowToolTip(true)
                            }
                        }
                      }:undefined}
                    value = {curTag}
                    onChange = {async (e) => {
                        setCurTag(e.target.value)
                        setShowToolTip(false)
                      }}
            />
                <datalist id="brow" >
                {deafaultTags.map(tags => (
                    <option key = {tags} >{tags}</option>
                ))}
                </datalist>
                {/* {ShowToolTip == true?
                <div className = {{fontsize:5}}>Tag do not exist</div>:''} */}
        </div>
    )
}
export default TagsSearchBar