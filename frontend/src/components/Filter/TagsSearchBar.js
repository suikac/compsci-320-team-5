import React, {useEffect, useState } from "react";
import { apiPost } from "../../utils/api-fetch"
import styles from "./Tags.module.css"

function TagsSearchBar(props) {
    const [curTag,setCurTag] = useState('')
    const [ShowToolTip,setShowToolTip] = useState(false)
    const [deafaultTags,setDefaultTags] = useState([])
    const [ToolTipMassage,setToolTipMassage] = useState('None thing here')
    async function getTags() {
        const a = await apiPost('/tag/get')
        return a
    }

    useEffect(()=>{
        getTags().then(a => a.json()).then(a =>{
            setDefaultTags(a.map(x => x.name))
        })
    },[])

    function addAndReset() {
        let temp = [...props.tags]
        const upperCaseTag = curTag.toUpperCase()
        const dbTag = deafaultTags.find(x => x.toUpperCase() === upperCaseTag);
        if(dbTag && !props.tags.includes(dbTag)){
            temp.push(dbTag)
            props.fun(temp)
            setCurTag('')
            setShowToolTip(false)
        }
        else {
            if(!dbTag){
                setToolTipMassage('Tag do not exist')
            }
            else{
                setToolTipMassage('Tag already selected')
            }
            // setCurTag('')
            setShowToolTip(true)
        }
    }

    return(
        <div className={styles.searchContainer}>
            <div className={styles.inputAddContainer}>
                <input list="brow"
                    className={ShowToolTip ? styles.badInput : undefined}
                    onKeyDown = {curTag !== '' ? async (e) => {
                        if(e.key === 'Enter'){
                            addAndReset()
                        }
                      }:undefined}
                    value = {curTag}
                    onChange = {async (e) => {
                        setCurTag(e.target.value)
                        setShowToolTip(false)
                      }}
                />
                <button
                    aria-label='Add current tag'
                    className={`${styles.clearFieldButton} ${props.addButtonClass}`}
                    onClick={addAndReset}>
                    Add
                </button>
            </div>

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