import { useEffect, useState } from "react"
import { apiPost } from "../../utils/api-fetch"

function tags(props) {
    const [curTag,setCurTag] = useState('')
    const [selectedTags,setCurTag] = useState([])
    const [deafaultTags,setDefaultTags] = useState([])
    const dataBasetags
    
    useEffect(()=>{
        dataBasetags = await apiPost('/tag/get')
        var temp = []
        dataBasetags.then(a => a.json()).then(a =>{
            temp.push(a)
        })
        setDefaultTags(temp)
    },[])


    return(
        <div>
            
        </div>
    )
}