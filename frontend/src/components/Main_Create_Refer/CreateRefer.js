import React, { useState, useRef } from "react";
import { withRouter } from "react-router";
import { Link, useHistory, Redirect } from 'react-router-dom'
import CreateReferCSS from "./CreateRefer.module.css";
import * as paths from "../../utils/paths"
import * as api from '../../utils/api-fetch'
import { toast } from "react-toastify";
import EmployeeSearch from "./EmployeeSearch";

// Function component used for create refer page
function CreateRefer(props) {
    // Input is object that stores information entered in refer inputs
    let [input, setInput] = useState({
        refereeEmail: '',
        firstName: '',
        lastName: '',
        description: '',
        file: ''
    });

    const [showEmployeeSearch, setShowEmployeeSearch] = useState(true)

    // This function changes given input fields and rerenders component with useState hook
    function changeInput(fields, values) {
        const updatedValue = {}
        for (let i = 0; i < fields.length; ++i) {
            updatedValue[fields[i]] = values[i];
        }
        setInput({
            ...input,
            ...updatedValue
        });
    }

    // referType stores whether the referral is a current employee or outside referral
    let [referType, setReferType] = useState(null);

    // This function changes referType and rerenders component using useState
    function changeReferType(e) {
        if (referType !== null) {
            ['email-field', 'first-name-field', 'last-name-field'].forEach(e => {
                let selector = document.getElementById(e);
                if (selector.classList.contains(`${CreateReferCSS.mustFill}`)) {
                    selector.classList.remove(`${CreateReferCSS.mustFill}`);
                }
            });
            if (input.file !== '') {
                input.file = '';
            }
        }
        changeInput(['refereeEmail', 'firstName', 'lastName', 'description'], ['', '', '', '']);
        setReferType(e.target.value);
    }

    // This function searches db for employee with the entered email
    // It only performs correctly when a single employee is returned
    // ** Might want to change this to async function **
    function searchEmployee(e) {
        // Function that queries db
        // Sends post request to /api/employee/get, with object containing email key-value pair
        async function loadData() {
            let json = { "email": input.refereeEmail };
            let response = await api.apiPost('/employee/get', json)
                .then(res => res.json());
            // Change input values to employee info if one employee is returned
            if (response !== null && response.length === 1) {
                changeInput(
                    ['firstName', 'lastName', 'refereeEmail'],
                    [response[0].firstName, response[0].lastName, response[0].email]
                );
            }
            // Otherwise clear input values because response isn't valid
            else {
                changeInput(['refereeEmail', 'firstName', 'lastName', 'description'], ['', '', '', '']);
            }
        }
        loadData();
    }

    const fileInputElement = useRef(null)

    function validateSubmission() {
        function addMustFill(id) {
            if (!document.getElementById(id).classList.contains(`${CreateReferCSS.mustFill}`)) {
                document.getElementById(id).classList.add(`${CreateReferCSS.mustFill}`);
            }
        }
        let fields = []
        let valid = true;
        if (input.refereeEmail.length === 0) {
            addMustFill('email-field');
            fields.push('Email');
            valid = false;
        } else if (!(input.refereeEmail.includes('@') && input.refereeEmail.includes('.'))) {
            toast.error("Must enter a valid email string.");
            valid = false;
        }
        if (referType === '0') {
            if (input.firstName.length === 0) {
                addMustFill('first-name-field');
                fields.push('First Name');
                valid = false;
            }
            if (input.lastName.length === 0) {
                addMustFill('last-name-field');
                fields.push('Last Name');
                valid = false;
            }
            if (document.getElementById('file-field').files.length === 0) {
                fields.push('Resume');
                valid = false;
            }
        }
        if (fields.length !== 0) {
            let str = fields.reduce((acc, e) => acc + e + ', ', '');
            toast.error(str.substring(0, str.length - 2) + ' ' + (fields.length > 1 ? 'fields ' : 'field ') + 'required for submission.');
        }
        return valid;
    }

    // Function used to submit a referral
    // Submits information to /api/referral/create
    // Information contained in input state
    async function submitReferral() {
        if (!validateSubmission()) {
            return;
        }
        // Submission object set to contain referral info, so data is formatted correctly
        const submission = {...input};
        // Set refereeName from first and last name fields in input
        submission['refereeName'] = input.firstName + " " + input.lastName;
        // Delete fields that aren't used in referral creation
        delete submission.firstName;
        delete submission.lastName;
        delete submission.file;
        // Set values needed for creating referral
        submission['positionId'] = state.id;
        submission['isInternal'] = referType === '1' ? 1 : 0;
        submission['isRead'] = 0;
        // Get the employee id of the person currently logged in to set referrerId
        submission['file'] = fileInputElement.current.files[0]
        // Send POST to /api/referral/create to create referral

        const formData = new FormData()
        for (const [k, v] of Object.entries(submission)) {
            formData.append(k, v)
        }

        let response = await api.apiPostFormData('/referral/create', formData)
        let body = await response.json()
        // Process response
        if (response.ok) {
            toast.success('Referral submitted for review.')
        } else {
            toast.error('Your submission could not be completed.');
        }
    }

    function removeRed(e) {
        if (e.target.classList.contains(`${CreateReferCSS.mustFill}`)) {
            e.target.classList.remove(`${CreateReferCSS.mustFill}`);
        }
    }

    // state contains that information about position on this page
    const state = props.location.state;
    const history = useHistory()

    // Return html to be rendered
    if (state == undefined) {
        return <Redirect to={paths.NOT_FOUND}/>
    }
    return (
        // Containing div
        <div className={`row`}>
            <EmployeeSearch
                show={showEmployeeSearch}
                onHide={() => setShowEmployeeSearch(false)}
            />
            {/* Div that contains position and manager info */}
            <div className={`col-6 m-0 p-5`}>
                <table className={`w-100 h-100`}><tbody>
                    <tr><td className={``}>
                        <h1>{state.title}</h1>
                    </td></tr>
                    <tr><td className={`text-end`}>
                        <h5>Job ID: {state.id}</h5>
                    </td></tr>
                    <tr><td className={``}>
                        <h5>Job Description:</h5>
                        <p>{state.description}</p>
                    </td></tr>
                    <tr><td className={``}>
                        <h5>Salary: {state.salary}</h5>
                    </td></tr>
                    <tr><td className={``}>
                        <h5>Minimum Years Experience: {state.minYearExperience}</h5>
                    </td></tr>
                    <tr><td className={`pt-5`}>
                        <h5>Manager:</h5>
                        <p>{state.manager.firstName} {state.manager.lastName}</p>
                        <p>{state.manager.email}</p>
                        <p>{state.manager.positionTitle}</p>
                    </td></tr>
                </tbody></table>
            </div>
            {/* Div that contains inputs for referral */}
            <div className={`col-6 p-5 text-center`}>
                {/* Referral type dropdown */}
                <select
                    className={`mt-5 ${CreateReferCSS.referralDropdown}`}
                    onChange={changeReferType}
                    defaultValue={'-1'}
                >
                    <option value='-1' disabled hidden>Select a Type of Referral</option>
                    <option value='1'>Current Employee</option>
                    <option value='0'>Outside Referrence</option>
                </select>
                {/* Conditionally render email, first name, last name, description and refer button */}
                {
                    referType !== null ?
                    <>
                        <div className='mt-2'><p className={`text-danger ${CreateReferCSS.bold}`}>* is required field</p></div>
                        <div className={`row mt-5`}>
                            <div className={`col-12 col-xl-6 pl-3 text-start text-xl-end mb-3 mb-xl-0`}>
                                <p className={`${CreateReferCSS.required} d-inline`}>* </p>
                                <input
                                    type='text'
                                    value={input.refereeEmail}
                                    onChange={ (e) => changeInput(['refereeEmail'], [e.target.value]) }
                                    onClick={(e) => removeRed(e)}
                                    placeholder='Employee email'
                                    id='email-field'
                                    className={`${CreateReferCSS.inputField}`}
                                />
                                {referType === '1' ? <div className={`text-end`}><button onClick={searchEmployee} className={`${CreateReferCSS.btn}`}>SEARCH</button></div> : <></>}
                            </div>
                            <div className={`col-12 col-xl-6 pr-3 text-start`}>
                                {referType == 0 ? <p className={`${CreateReferCSS.required} d-inline`}>* </p> : null}
                                <input
                                    ref={fileInputElement}
                                    type='file'
                                    value={input.file}
                                    onChange={ (e) => changeInput(['file'], [e.target.value]) }
                                    id='file-field'
                                    className={`${CreateReferCSS.inputField}`}
                                />
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className={`col-12 col-xl-6 pl-3 text-start text-xl-end mb-3 mb-xl-0`}>
                                {referType == 0 ? <p className={`${CreateReferCSS.required} d-inline`}>* </p> : null}
                                <input
                                    type='text'
                                    placeholder='First Name'
                                    value={input.firstName}
                                    onChange={(e) => changeInput(['firstName'], [e.target.value]) }
                                    onClick={(e) => removeRed(e)}
                                    id='first-name-field'
                                    className={`${CreateReferCSS.inputField}`}
                                />
                            </div>
                            <div className={`col-12 col-xl-6 pr-3 text-start mb-3 mb-xl-0`}>
                                {referType == 0 ? <p className={`${CreateReferCSS.required} d-inline`}>* </p> : null}
                                <input
                                    type='text'
                                    placeholder='Last Name'
                                    value={input.lastName}
                                    onChange={ (e) => changeInput(['lastName'], [e.target.value]) }
                                    onClick={(e) => removeRed(e)}
                                    id='last-name-field'
                                    className={`${CreateReferCSS.inputField}`}
                                />
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <textarea
                                placeholder='Enter a brief description as to why you think this candidate would be a good hire...'
                                value={input.description}
                                onChange={ (e) => changeInput(['description'], [e.target.value]) }
                            />
                        </div>
                        <div className='row mt-5'>
                            <div className='col-12'>
                                <button
                                    className={`${CreateReferCSS.btn} ${CreateReferCSS.referBtn}`}
                                    onClick={submitReferral}
                                >
                                    REFER
                                </button>
                            </div>
                        </div>
                    </>
                    : <></>
                }
            </div>
            {/* cancel button */}
            <div className={`col-12`}>
                <button className={`${CreateReferCSS.cancelBtn}`}
                onClick={() => history.goBack()}>
                    {'< Cancel'}
                </button>
            </div>
        </div>
    )
}

// Export CreateRefer item, use withRouter() so it can store state (position info) passed to it
export default withRouter(CreateRefer);
