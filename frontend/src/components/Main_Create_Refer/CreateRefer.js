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
        file: '',
        refereeId: undefined
    });

    const [showEmployeeSearch, setShowEmployeeSearch] = useState(false)

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
    //let [referType, setReferType] = useState(null);
    let [referType, setReferType] = useState('1');

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
        changeInput(['refereeEmail', 'firstName', 'lastName', 'description', 'refereeId'], ['', '', '', '', undefined]);
        setReferType(e.target.value);
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
            if (v == undefined) {
                continue
            }
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
        <div id={CreateReferCSS.outerContainer} className={`row pb-5`}>
            <EmployeeSearch
                show={showEmployeeSearch}
                onHide={() => setShowEmployeeSearch(false)}
                setEmployeeSelection={(e) => {
                    setInput({
                        ...input,
                        refereeEmail: e.email,
                        firstName: e.firstName,
                        lastName: e.lastName,
                        refereeId: e.id
                    })
                    setShowEmployeeSearch(false)
                }}
            />
            {/* Div that contains position and manager info */}
            <div className={`col-6 m-0 p-5`}>
                <div className='text-center mb-4'><h3>{state.title}</h3></div>
                <div className='text-end mb-3'><h5><strong>Job ID:</strong> {state.id}</h5></div>
                <div className='mb-3'>
                    <h5><strong>Job Description:</strong></h5>
                    <p>{state.description}</p>
                </div>
                <div className='mb-3'><h5><strong>Salary:</strong> {state.salary}</h5></div>
                <div className='mb-3'><h5><strong>Minimum Years Experience:</strong> {state.minYearExperience}</h5></div>
                <div>
                    <h5><strong>Manager:</strong></h5>
                    <p className='p-0 m-0'>{state.manager.firstName} {state.manager.lastName}</p>
                    <p className='p-0 m-0'>{state.manager.email}</p>
                    <p className='p-0 m-0'>{state.manager.positionTitle}</p>
                </div>
            </div>
            {/* Div that contains inputs for referral */}
            <div className={`col-6 p-5 text-center`}>
                {/* Referral type dropdown */}
                <div className='text-start'>
                    <div>
                        <input
                            type="radio"
                            name="refer-type"
                            id="current-employee"
                            defaultChecked={referType === '1'}
                            onChange={changeReferType}
                            value='1'
                        />
                        <label className={CreateReferCSS.label} for="current-employee">Current Employee</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="refer-type"
                            id="outside-referral"
                            defaultChecked={referType === '0'}
                            onChange={changeReferType}
                            value='0'
                        />
                        <label className={CreateReferCSS.label} for="outside-referral">Outside Referral</label>
                    </div>
                    <div className='mt-2'><p className={`text-danger ${CreateReferCSS.bold}`}>* is required field</p></div>
                </div>
                {referType === '1' ?
                    <div className={`text-center mt-3`}>
                        <p className={`${CreateReferCSS.required} d-inline`}>* </p>
                        <button onClick={() => setShowEmployeeSearch(true)} className={`${CreateReferCSS.btn}`}>SEARCH EMPLOYEE</button>
                    </div>
                : <></>}
                <div className={`row mt-3`}>
                    <div className={`col-12 col-xl-6 pl-3 text-start text-xl-end mb-3 mb-xl-0`}>
                        <label className={`d-block text-start`} for='email-field'><strong>Employee Email:</strong></label>
                        {referType == 0 ? <p className={`${CreateReferCSS.required} d-inline`}>* </p> : null}
                        <input
                            disabled={referType === '1'}
                            type='text'
                            value={input.refereeEmail}
                            onChange={ (e) => changeInput(['refereeEmail'], [e.target.value]) }
                            onClick={(e) => removeRed(e)}
                            placeholder='Employee email'
                            id='email-field'
                            name='email-feild'
                            className={`${CreateReferCSS.inputField}`}
                        />
                    </div>
                    <div className={`col-12 col-xl-6 pr-3 text-start`}>
                        <label className={`d-block text-start`} for='file-field'><strong>Attach Resume:</strong></label>
                        {referType == 0 ? <p className={`${CreateReferCSS.required} d-inline`}>* </p> : null}
                        <input
                            ref={fileInputElement}
                            type='file'
                            accept='.pdf'
                            value={input.file}
                            onChange={ (e) => changeInput(['file'], [e.target.value]) }
                            id='file-field'
                            name='file-feild'
                            className={`${CreateReferCSS.inputField}`}
                        />
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className={`col-12 col-xl-6 pl-3 text-start text-xl-end mb-3 mb-xl-0`}>
                        <label className={`d-block text-start`} for='first-name-field'><strong>First Name:</strong></label>
                        {referType === '0' ? <p className={`${CreateReferCSS.required} d-inline`}>* </p> : null}
                        <input
                            disabled={referType === '1'}
                            type='text'
                            placeholder='First Name'
                            value={input.firstName}
                            onChange={(e) => changeInput(['firstName'], [e.target.value]) }
                            onClick={(e) => removeRed(e)}
                            id='first-name-field'
                            name='first-name-feild'
                            className={`${CreateReferCSS.inputField}`}
                        />
                    </div>
                    <div className={`col-12 col-xl-6 pr-3 text-start mb-3 mb-xl-0`}>
                        <label className={`d-block text-start`} for='last-name-field'><strong>Last Name:</strong></label>
                        {referType == 0 ? <p className={`${CreateReferCSS.required} d-inline`}>* </p> : null}
                        <input
                            disabled={referType === '1'}
                            type='text'
                            placeholder='Last Name'
                            value={input.lastName}
                            onChange={ (e) => changeInput(['lastName'], [e.target.value]) }
                            onClick={(e) => removeRed(e)}
                            id='last-name-field'
                            name='last-name-feild'
                            className={`${CreateReferCSS.inputField}`}
                        />
                    </div>
                </div>
                <div className='row mt-3'>
                    <label className={`d-block text-start`} for='description'><strong>Description:</strong></label>
                    <textarea
                        placeholder='Enter a brief description as to why you think this candidate would be a good hire...'
                        value={input.description}
                        onChange={ (e) => changeInput(['description'], [e.target.value]) }
                        id='description'
                        name='description'
                    />
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <button
                        className={`${CreateReferCSS.cancelBtn}`}
                        onClick={() => history.goBack()}
                    >
                        {'< Cancel'}
                    </button>
                </div>
                <div className='col-6 text-center'>
                    <button
                            className={`${CreateReferCSS.btn} ${CreateReferCSS.referBtn}`}
                            onClick={submitReferral}
                        >
                        REFER
                    </button>
                </div>
            </div>
        </div>
    )
}

// Export CreateRefer item, use withRouter() so it can store state (position info) passed to it
export default withRouter(CreateRefer);
