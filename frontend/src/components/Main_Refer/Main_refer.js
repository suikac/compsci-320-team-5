import React, { useState, useEffect } from "react";
import PositionItem from "./Position_item";
import ReferCSS from "./main_refer.module.css";
import * as api from "../../utils/api-fetch";
import JobListingFilter from "./JobListingFilter";

// Function based component for refer page
function Referral() {
    // State object that stores data on positions
    let [data, setData] = useState(null);

    // Hook that loads data when component is rendered
    useEffect(() => {
        // Function that makes request to api/position/get for positions
        async function loadData() {
            let response = await api.apiPost('/position/get')
                .then(res => res.json());
            setData(response);
        }
        loadData();
    }, []);

    // If data has not loaded yet, render a basic laoding message
    if (data === null) {
        return (<div> loading... </div>);
    }
    // Otherwise render the normal refer page
    else {
        return (
            <div className={ReferCSS.container}>
                {/* Component used for filtering position data */}
                <JobListingFilter setResult={setData}/>

                {/* Component that displays position data with PositionItem components */}
                <div id={ReferCSS.positions} className='mt-5'>
                {
                    data.map((e) => {
                        return (<div className={`mb-2 ${ReferCSS.positionItemContainer}`}> <PositionItem key={e.id} {...e} /></div> );
                    })
                }
                </div>
            </div>
        )
    }
}

// Export component for use in Main.js
export default Referral;

























// Not really sure what this code is for so I just commented it out


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