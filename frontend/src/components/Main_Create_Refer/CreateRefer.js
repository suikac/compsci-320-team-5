import React, {Component} from "react";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom'
import CreateReferCSS from "./CreateRefer.module.css";
import * as paths from "../../utils/paths"

class CreateRefer extends Component {
    render() {
        const state = this.props.location.state; 
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
                <div className={`col-6 p-5`}>
                    <div className='row'>
                        <div className='col-6'>
                            <div>
                                <input type='radio' name='employee_type' value='current_employee' />
                                <label for='in-house'>Current Employee</label>
                            </div>
                            <div>
                                <input type='radio' name='employee_type' value='outside_referral' />
                                <label for='in-house'>Outside Referral</label>
                            </div>
                        </div>
                        <div className={`col-6 d-flex align-items-center`}>
                            <input className='my-auto' type='text' id='name' name='name' placeholder='Name' required/>
                        </div>
                    </div>
                    <div className='row mt-4'>
                        <div className='col-6'>
                            <input className='my-auto' type='text' id='email' name='email' placeholder='Email' required/>
                        </div>
                        <div className={`col-6 d-flex align-items-center`}>
                            <input className='my-auto' type='text' id='resume' name='resume' placeholder='Attach Resume' required/>
                        </div>
                    </div>
                    <div className='row mt-4'>
                        <div className='col-12'>
                            <textarea
                                id='description'
                                name='description'
                                placeholder='Brief description as to why you think this candidate would be a good hire...'>

                            </textarea>
                        </div>
                    </div>
                </div>
                <div className={`col-6 `}>
                    <Link to={paths.REFER} className={`d-block`}>
                        <button className={`${CreateReferCSS.cancelBtn}`}>{'< Cancel'}</button>
                    </Link>
                </div>
                <div className={`col-6 p-5`}>
                    <button className={`d-block mx-auto ${CreateReferCSS.referBtn}`}>REFER</button>
                </div>
            </div>
        )
    }
}

export default withRouter(CreateRefer);