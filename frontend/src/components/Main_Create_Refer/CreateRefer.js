import React, { useState, useRef } from "react";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom'
import CreateReferCSS from "./CreateRefer.module.css";
import * as paths from "../../utils/paths"
import * as api from '../../utils/api-fetch'

function CreateRefer(props) {
    let [referType, setReferType] = useState(null);
    function changeReferType(e) {
        changeInput(['refereeEmail', 'firstName', 'lastName', 'description'], ['', '', '', '']);
        setEmployee(null);
        setReferType(e.target.value)
    }

    let [employee, setEmployee] = useState(null);
    function searchEmployee(e) {
        async function loadData() {
            let json = { "email": input.refereeEmail };
            let response = await api.apiPost('/employee/get', json)
                .then(res => res.json());
            console.log(response);
            if (response !== null && response.length === 1) {
                changeInput(
                    ['firstName', 'lastName', 'refereeEmail'],
                    [response[0].firstName, response[0].lastName, response[0].email]
                );
                setEmployee(response);
            } else {
                changeInput(['refereeEmail', 'firstName', 'lastName', 'description'], ['', '', '', '']);
                setEmployee(null);
            }
        }
        loadData();
    }

    let [input, setInput] = useState({
        refereeEmail: '',
        firstName: '',
        lastName: '',
        description: '',
        file: ''
    });
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

    function submitReferral() {
        const submission = {...input};
        submission['refereeName'] = input.firstName + " " + input.lastName;
        delete submission.firstName;
        delete submission.lastName;
        delete submission.file;
        submission['positionId'] = state.id;
        submission['referrerId'] = 5010;
        console.log(submission);
        const json = JSON.stringify(submission);
        api.apiPost('/referral/create', json);
    }

    const state = props.location.state;

    //console.log(input);
    
    return (
        <div className={`row`}>
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
            <div className={`col-6 p-5 text-center`}>
                <select
                    className={`mt-5`}
                    onChange={changeReferType}
                >
                    <option selected disabled hidden>Select a Type of Referral</option>
                    <option value='1'>Current Employee</option>
                    <option value='0'>Outside Referrence</option>
                </select>
                {
                    referType !== null ?
                    <>
                        <div className={`row mt-5`}>
                            <div className={`col-6 w-50 pl-3 text-end`}>
                                <input
                                    type='text'
                                    value={input.refereeEmail}
                                    onChange={ (e) => changeInput(['refereeEmail'], [e.target.value]) }
                                    placeholder='Employee email'
                                />
                                {referType == '1' ? <button onClick={searchEmployee}>Search</button> : <></>}
                            </div>
                            <div className={`col-6 pr-3 text-start`}>
                                    <input
                                        type='file'
                                        value={input.file}
                                        onChange={ (e) => changeInput(['file'], [e.target.value]) }
                                    />
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className={`col-6 pl-3 text-end`}>
                                    <input
                                        type='text'
                                        placeholder='First Name'
                                        value={input.firstName}
                                        onChange={(e) => changeInput(['firstName'], [e.target.value]) }
                                    />
                            </div>
                            <div className={`col-6  pr-3 text-start`}>
                                    <input
                                        type='text'
                                        placeholder='Last Name'
                                        value={input.lastName}
                                        onChange={ (e) => changeInput(['lastName'], [e.target.value]) }
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
                                    className={`${CreateReferCSS.referBtn}`}
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
            <div className={`col-12`}>
                <Link to={paths.REFER} className={`d-block`}>
                    <button className={`${CreateReferCSS.cancelBtn}`}>{'< Cancel'}</button>
                </Link>
            </div>
        </div>
    )
}

export default withRouter(CreateRefer);