import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./Job_posting.module.css"
import { apiPost } from "../../utils/api-fetch"
import { toast } from "react-toastify";


class CreateJobPosting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "", salary: '', minYearsExperience: '', tags: [], searchBarTag: "",
            description: "", createJobSuccess: false, isLoaded: false, defaultTag: []
        }
        this.submit_credentials = this.submit_credentials.bind(this)
        this.handleCredentialsChange = this.handleCredentialsChange.bind(this)
        this.addValueToTag = this.addValueToTag.bind(this)
        this.reset = this.reset.bind(this)
    }
    reset() {
        this.setState({
            title: "",
            salary: 0,
            minYearsExperience: 0,
            tags: [],
            description: "",
            isLoaded: false,
            searchBarTag: "",
            defaultTag: []
        })
        this.setTagsArray()
    }
    handleCredentialsChange(event) {
        const type = event.target.name
        this.setState({
            [type]: event.target.value
        })
    }
    addValueToTag(event) {
        event.preventDefault()
        let temp = this.state.tags.slice()
        let curTag = this.state.searchBarTag.trim()
        let lowercased = curTag.trim().toLowerCase()
        let filtered = this.state.defaultTag.filter(tag => tag.toLowerCase() === lowercased)
        if (filtered.length > 0) {
            curTag = filtered[0]
        }
        filtered = temp.filter(tag => tag.toLowerCase() === lowercased)
        if (filtered.length > 0) {
            toast.error('This tag already been selected')
            return
        }
        temp.push(curTag)
        this.setState({
            tags: temp,
            searchBarTag: ''
        })
    }

    render() {
        const listItem = this.state.tags.map((tag, i) => (
            <li className={styles.tagHolder} key={tag + i}>
                {tag}
                <button
                    type='button'
                    className={styles.cancelButton}
                    onClick={() => {
                        let removeIndex = this.state.tags.indexOf(tag)
                        let temp = this.state.tags.slice()
                        temp.splice(removeIndex, 1)
                        this.setState({
                            tags: temp,
                        })
                    }
                    }>X</button>
            </li>
        ))
        if (!this.state.isLoaded) {
            this.setTagsArray()
            return <div>loading</div>
        }
        else {
            return (
                <form>
                    <div className={styles.container}>
                        <Row style={{ justifyContent: "center", alignItems: "center" }}>
                            <h2 className={styles.p}> Job Creation </h2>
                        </Row>
                        <Row style={{ justifyContent: "center", alignItems: "center" }}>
                            <div className={styles.jobTitleContainer} >
                                <label className={styles.labelText1} for="Job Title">Job Title <span className={styles.redText}>*</span></label>
                                <input
                                    id="Job Title"
                                    name='title'
                                    type="text"
                                    value={this.state.title}
                                    className={styles.jobTitleText}
                                    onChange={this.handleCredentialsChange}
                                    placeholder="Enter Job Title"
                                >
                                </input>
                            </div>
                            <div className={styles.salaryContainer}>
                                <label className={styles.labelText1} for="Salary">Salary</label>
                                <input
                                    id="Salary"
                                    name='salary'
                                    type='number'
                                    className={styles.salaryText}
                                    value={this.state.salary}
                                    onChange={this.handleCredentialsChange}
                                    placeholder="Salary"
                                />
                            </div>
                            <div className={styles.minYearofExpContainer}>
                                <label className={styles.labelText1} for="Min Year">Min Year</label>
                                <input
                                    id="Min Year"
                                    name='minYearsExperience'
                                    type='number'
                                    className={styles.minYearofExpText}
                                    value={this.state.minYearsExperience}
                                    onChange={this.handleCredentialsChange}
                                    placeholder="Year"
                                />
                            </div>
                        </Row>
                        <Row style={{ justifyContent: "center", alignItems: "center" }}>
                            <div className={styles.tagSearchBarContainer}>
                                <label className={styles.labelText3} for="Search Tag">Search Tag</label>
                                <input id="Search Tag"
                                    list="brow"
                                    name='searchBarTag'
                                    type='text'
                                    value={this.state.searchBarTag}
                                    onChange={this.handleCredentialsChange}
                                    placeholder="Enter Tag"
                                    className={styles.tagSearchBarText} />
                                <datalist id="brow">
                                    {this.state.defaultTag.map((tags, index) => (
                                        <option key={index}>{tags}</option>
                                    ))}
                                </datalist>
                                {this.state.searchBarTag.trim() !== '' ?
                                    <button type='button'
                                        className={styles.addButton}
                                        onClick={this.addValueToTag}
                                    >Add</button> :
                                    <button className={styles.disabledaddButton}
                                        disabled
                                    >Add</button>
                                }
                                <ul className={styles.tagStoreContainer}>
                                    {listItem}
                                </ul>
                            </div>
                            <div className={styles.DescriptionContainer}>
                                <label className={styles.labelText2} for="Description">Description</label>
                                <textarea
                                    id="Description"
                                    type='text'
                                    name='description'
                                    className={styles.DescriptionText}
                                    value={this.state.description}
                                    onChange={this.handleCredentialsChange}
                                    placeholder="Job Description"
                                />
                            </div>
                        </Row>
                        <Row style={{ justifyContent: "flex-end", alignItems: "center" }}>
                            {this.state.title !== "" ?
                                <button
                                    type='button'
                                    onClick={this.submit_credentials}
                                    className={styles.createButton}>Create</button>
                                :
                                <button
                                    type='button'
                                    disabled
                                    className={styles.disabledcreateButton}>Create
                                </button>
                            }
                            <button type='button' onClick={this.reset} className={styles.createButton}>
                                Clear
                            </button>
                        </Row>
                    </div>
                </form>
            );
        }
    }
    //}
    async submit_credentials() {
        if (isNaN(parseInt(this.state.minYearsExperience)) || isNaN(parseInt(this.state.salary))) {
            if (isNaN(parseInt(this.state.minYearsExperience)) && isNaN(parseInt(this.state.salary))) {
                toast.error('Minimal Year Experience and Salary has to be a number!')
                return
            }
            if (isNaN(parseInt(this.state.salary))) {
                toast.error('Salary has to be a number!')
                return
            }
            else {
                toast.error('Minimal Year Experience has to be a number!')
                return
            }
        }
        // console.log('success')
        const payload = {
            tags: this.state.tags,
            title: this.state.title,
            minYearExperience: this.state.minYearsExperience,
            description: this.state.description,
            salary: this.state.salary
        }
        const response = await apiPost('/position/createPosition', payload)
        if (response.ok) {
            toast.success('Job posting created successfully!')
            this.reset()
        }
    }
    async getTags() {
        const a = await apiPost('/tag/get')
        return a
    }
    setTagsArray() {
        this.getTags().then(a => a.json()).then(a => {
            this.setState({
                defaultTag: a.map(x => x.name),
                isLoaded: true
            })
        })
    }
}

export default CreateJobPosting
