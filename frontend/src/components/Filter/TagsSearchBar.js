import React, {Component, useEffect, useState } from "react";
import { apiPost } from "../../utils/api-fetch"

function TagsSearchBar(props) {
    const [curTag,setCurTag] = useState('')
    const [selectedTags,setSeletedTag] = useState([])
    const [isLoaded,setLoad] = useState(false)
    const [deafaultTags,setDefaultTags] = useState([])

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
            <input list="brow"/>
                <datalist id="brow">
                {deafaultTags.map(tags => (
                    <option>{tags}</option>
                ))}
                </datalist>
        </div>
    )
}
export default TagsSearchBar