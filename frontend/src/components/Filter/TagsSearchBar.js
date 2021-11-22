import React, {useRef, useEffect, useState } from "react";
import { apiPost } from "../../utils/api-fetch"
import styles from "./Tags.module.css"

function TagsSearchBar(props) {
    const [curTag,setCurTag] = useState('')
    const [ShowToolTip,setShowToolTip] = useState(false)
    const [deafaultTags,setDefaultTags] = useState([])
    const [ToolTipMassage,setToolTipMassage] = useState('None thing here')
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
                            if(deafaultTags.includes(curTag) && !props.tags.includes(curTag)){
                                temp.push(curTag)
                                props.fun(temp)
                                setCurTag('')
                            }
                            else{
                                if(!deafaultTags.includes(curTag)){
                                    setToolTipMassage('Tag do not exist')
                                }
                                else{
                                    setToolTipMassage('Tag already selected')
                                }
                                setCurTag('')
                                setShowToolTip(true)
                                setTimeout(
                                    (()=>{
                                        setShowToolTip(false)
                                        setToolTipMassage('None thing here')
                                    }), 1500)
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
                <div className = {ShowToolTip?
                    styles.tooltipFontS:styles.tooltipFontH}>{ToolTipMassage}</div>
        </div>
    )
}
export default TagsSearchBar