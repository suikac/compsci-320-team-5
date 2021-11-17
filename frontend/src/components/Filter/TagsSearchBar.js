import React, {useRef, useEffect, useState } from "react";
import { apiPost } from "../../utils/api-fetch"

function TagsSearchBar(props) {
    const [curTag,setCurTag] = useState('')
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

    return(
        <div>
            <input list="brow" 
                    onKeyDown = {curTag != '' ? async (e) => {
                        if(e.key == 'Enter'){
                            let temp = [...props.tags]
                            temp.push(curTag)
                            props.fun(temp)
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