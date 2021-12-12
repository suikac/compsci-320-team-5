import React from "react";
import styles from "./Tags.module.css"

function TagStore(props){
    const tags = props.tags
    const listItem = tags.map((tag,i) => (
        <div key = {tag+i}
            className = {styles.tagHolder}>
            {tag}
            <button
                    className = {styles.cancelButton}
                    type = 'button'
                    onClick = {()=>{
                        let removeIndex = tags.indexOf(tag)
                        let temp = tags.slice()
                        temp.splice(removeIndex,1)
                        props.fun(temp)
                        console.log(props.tags)
                    }
                }>X</button>
        </div>
    ))
    return(
        <div className={styles.tagStoreContainer}>
            {listItem}
        </div>
    )
}
export default TagStore