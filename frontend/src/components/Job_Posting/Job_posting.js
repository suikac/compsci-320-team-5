import React, {Component, useEffect, useState } from "react";
import styles from "./Job_posting.module.css"
import { apiPost } from "../../utils/api-fetch"
import { toast } from "react-toastify";


class CreateJobPosting extends Component{
    constructor(props) {
        super(props)
        this.state = {title: "", salary: "", minYearsExperience: "", tags:[], searchBarTag: "",
        description:"",createJobSuccess:false,isLoaded:false,defaultTag:[]}
        this.submit_credentials = this.submit_credentials.bind(this)
        this.handleCredentialsChange = this.handleCredentialsChange.bind(this)
        this.addValueToTag = this.addValueToTag.bind(this)
    }
    reset(){
        this.setState({
            title: "",
            salary: "",
            minYearsExperience: "",
            tags:[],
            description:"",
            isLoaded:false,
            searchBarTag:"",
            defaultTag:[]
        })
        this.setTagsArray()
    }
    handleCredentialsChange(event) {
        const type = event.target.name
        this.setState({
            [type]: event.target.value
        })
    }
    addValueToTag(event){
        event.preventDefault()
        let temp = this.state.tags.slice()
        temp.push(this.state.searchBarTag.trim())
        this.setState({
            tags:temp,
            searchBarTag:''
        })
    }
    render(){
        const listItem = this.state.tags.map((tag,i) => (
            <li className = {styles.tagHolder} key = {tag+i}>
                {tag}
                <button
                        type = 'button'
                        className = {styles.cancelButton}
                        onClick = {()=>{
                            let removeIndex = this.state.tags.indexOf(tag)
                            let temp = this.state.tags.slice()
                            temp.splice(removeIndex,1)
                            this.setState({
                                tags:temp,
                            })
                        }
                    }>X</button>
            </li>
        ))
        if(!this.state.isLoaded){
            this.setTagsArray()
            return <div>loading</div>
        }
        else{
            return(
                <form>
                    <h2 className={styles.h2}>
                        <p className={styles.p}> Job Creating </p>
                        <div className = {styles.jobTitleContainer} >
                            <label className = {styles.labelText1} for="Job Title">Job Title</label>
                            <input
                                id="Job Title"
                                name='title'
                                type="text"
                                value = {this.state.title}
                                className = {styles.jobTitleText}
                                onChange={this.handleCredentialsChange}
                                placeholder = "Enter Job Title"
                            >
                            </input>
                        </div>
                        <div className = {styles.salaryContainer}>
                            <label className = {styles.labelText1} for="Salary">Salary</label>
                            <input
                                id = "Salary"
                                name = 'salary'
                                type = 'number'
                                className = {styles.salaryText}
                                value = {this.state.salary}
                                onChange={this.handleCredentialsChange}
                                placeholder = "Salary"
                            />
                        </div>
                        <div className = {styles.minYearofExpContainer}>
                        <label className = {styles.labelText1} for="Min Year">Min Year</label>
                            <input
                                id = "Min Year"
                                name = 'minYearsExperience'
                                type = 'number'
                                className={styles.minYearofExpText}
                                value = {this.state.minYearsExperience}
                                onChange={this.handleCredentialsChange}
                                placeholder = "Year"
                            />
                        </div>

                        <div className = {styles.tagSearchBarContainer}>
                            <label className = {styles.labelText3} for="Search Tag">Search Tag</label>
                            <input  id="Search Tag"
                                    list="brow"
                                    name = 'Search Tag'
                                    type = 'text'
                                    value = {this.state.searchBarTag}
                                    onChange={this.handleCredentialsChange}
                                    placeholder = "Enter Tag"
                                    className = {styles.tagSearchBarText}/>
                                <datalist id="brow">
                                {this.state.defaultTag.map(tags => (
                                    <option>{tags}</option>
                                ))}
                                </datalist>
                                {this.state.searchBarTag.trim() != ''?
                                <button type = 'button'
                                        className = {styles.addButton}
                                        onClick = {this.addValueToTag}
                                        >add</button>:
                                <button className = {styles.disabledaddButton}
                                        disabled
                                        >add</button>
                                }
                            <ul className = {styles.tagStoreContainer}>
                                {listItem}
                            </ul>
                        </div>
                        <div className = {styles.DescriptionContainer}>
                            <label className = {styles.labelText2} for="Description">Description</label>
                            <textarea
                                id= "Description"
                                type= 'text'
                                name = 'description'
                                className = {styles.DescriptionText}
                                value = {this.state.description}
                                onChange={this.handleCredentialsChange}
                                placeholder = "Job Description"
                            />
                        </div>
                        {this.state.title != "" && this.state.description !=""?
                                <button
                                type = 'button'
                                onClick = {this.submit_credentials}
                                className = {styles.createButton}>Create</button>
                                :
                                <button
                                type = 'button'
                                disabled
                                className = {styles.disabledcreateButton}>Create
                                </button>
                        }
                    </h2>
                </form>
            );
        }
    }
    //}
    async submit_credentials() {
        const payload = {
            tags:this.state.tags,
            title:this.state.title,
            minYearExperience:this.state.minYearsExperience,
            description:this.state.description,
            salary:this.state.salary
        }
        const response = await apiPost('/position/createPosition', payload)
        console.log(response.status)
        if(response.ok){
            toast.success('Job posting created successfully!')
            this.reset()
        }
    }
    async getTags() {
        const a = await apiPost('/tag/get')
        return a
    }
    setTagsArray(){
        this.getTags().then(a => a.json()).then( a =>{
            this.setState({
                        defaultTag:a.map(x => x.name),
                        isLoaded:true
                    })
        })
    }
}

export default CreateJobPosting
