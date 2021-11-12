import React, {Component} from "react";
import PositionItem from "./Position_item";
import ReferCSS from "./main_refer.module.css"
import JobListingFilter from "./JobListingFilter";

let fakeData = [
    {
        id: 1,
        title: 'Software Engineer',
        description: 'Python and java skills.',
        minYearExperience: 2,
        salary: 64000,
        manager: {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'johnD@gmail.com',
            positionTitle: 'manager II'
        },
        tags: ['Python', 'Java']
    },
    {
        id: 2,
        title: 'Senior Software Engineer',
        description: 'You must know everything.',
        minYearExperience: 20,
        salary: 200000,
        manager: {
            id: 2,
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'janeDoe@hotmail.com',
            positionTitle: 'manager IV'
        },
        tags: ['C++', 'C', 'C#', 'Objective-C']
    },
    {
        id: 1,
        title: 'Junior Software Engineer',
        description: 'JS developer',
        minYearExperience: 0,
        salary: 50000,
        manager: {
            id: 1,
            firstName: 'Some',
            lastName: 'Person',
            email: 'somePerson@gmail.com',
            positionTitle: 'manager II'
        },
        tags: ['JS', 'Node.js']
    },
    {
        id: 1,
        title: 'Junior Software Engineer',
        description: 'JS developer',
        minYearExperience: 0,
        salary: 50000,
        manager: {
            id: 1,
            firstName: 'Some',
            lastName: 'Person',
            email: 'somePerson@gmail.com',
            positionTitle: 'manager II'
        },
        tags: ['JS', 'Node.js']
    },
    {
        id: 1,
        title: 'Junior Software Engineer',
        description: 'JS developer',
        minYearExperience: 0,
        salary: 50000,
        manager: {
            id: 1,
            firstName: 'Some',
            lastName: 'Person',
            email: 'somePerson@gmail.com',
            positionTitle: 'manager II'
        },
        tags: ['JS', 'Node.js']
    }
]

const positionsDisplay = fakeData.map(
    e => {
        return ( <div className={`mb-2 ${ReferCSS.positionItemContainer}`}><PositionItem {...e} /></div> );
    }
);

class referal extends Component {
    render() {
        return (
            <div className={ReferCSS.container}>
                <JobListingFilter />
                <div id={ReferCSS.positions} className='mt-5'>
                {
                    positionsDisplay
                }
                </div>
            </div>
        )
    }

















    /*constructor(props){
        super(props)
        this.state = {refereeName: "", currentEmployee:false,
        refereeEmail: "", resume:null, description: "", employeeID: 0}
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        //add positionID: number from job posting
    }

    handleSubmit(event){
        alert('Form Submitted');
        event.preventDefault();
    }


    handleInputChange(event){
        var target = event.target;
        var value = target.value;
        var name = target.name;
        console.log(target, value, name);
        if(name = "currentEmployee"){
            if(value="yes"){
                value = true;
            }
            else{
                value = false;
            }


        }
        console.log(this.state);
        this.setState({
            [name]: value
        });
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit} className = {ReferCSS.container}>
                    {/* <label >
                        Current Employee:
                        <select value={this.state.currentEmployee}
                        onChange={this.handleInputChange}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>

                        </select>
                    </label> *//*}
                    <br/>

                    <label className={ReferCSS.current}>
                         Current Employee:
                        <input type="radio" name="choice" value="yes" id="choice-yes" onClick="showHideDiv()"/>
                        <label for="choice-yes">Yes  </label>
                        <input type="radio" name="choice" value="no" id="choice-no" onClick="showHideDiv()"/>
                        <label for="choice-no">No  </label>
                    </label>

                    <br/>
                    <br/>
                    <label id = "employeeID">
                        <input  type="long" defaultValue={this.state.refereeName}
                        onChange={this.handleInputChange} className={ReferCSS.id}
                        placeholder={"Employee ID"}/>

                    </label>
                    <br/>
                    <br/>
                    <label >
                        <input type="text" defaultValue={this.state.refereeName}
                        onChange={this.handleInputChange} className={ReferCSS.name} placeholder={"Name"} name='refereeName'/>

                    </label>
                    <br/>
                    <br/>
                    <label>
                        <input type="email" defaultValue={this.state.refereeEmail}
                        onChange={this.handleChange} className={ReferCSS.email} placeholder={"Email"} name = 'refereeEmail'/>
                    </label>
                    <br/>
                    <br/>
                    <label>
                        Resume:
                        <input type="file" defaultValue={this.state.resume}
                        onChange={this.handleInputChange} className={ReferCSS.resume}
                        placeholder={"Resume"} name='resume'/>
                    </label>
                    <br/>
                    <label >
                        <br/>
                        <textarea defaultValue={this.state.description}
                        onChange={this.handleInputChange} className={ReferCSS.reason}
                        placeholder={"Reason for Referal"} name='description'/>
                    </label>
                    <input type="submit" value="submit"/>
                </form>
            </div>
        )}*/
        }
export default referal