import React, {Component} from "react";
import ReferCSS from "./main_refer.module.css"
import { Link } from 'react-router-dom'
import * as paths from "../../utils/paths"

class PositionItem extends Component {
    render() {
        let tags = this.props.tags.reduce((acc, e) => acc + e + ", ", "");
        tags = tags.substring(0, tags.length - 2)
        return (
            <div className={`${ReferCSS.positionContainer} row`}>
                <div className={`col-1`}>img</div>
                <div className={`col-3 p-0 m-0`}>
                    <table className={`w-100 h-100`}>
                        <tr><td><h4 className='text-center'>{this.props.title}</h4></td></tr>
                        <tr><td><p className={`text-center`}>Years Experience: {this.props.minYearExperience}</p></td></tr>
                        <tr><td>
                            <div className={`text-center ${ReferCSS.referBtnContainer}`}>
                                <Link className='link' to={{ pathname: paths.CREATE_REFER, state: this.props }}>
                                    <button className={ReferCSS.referBtn}>REFER</button>
                                </Link>
                            </div>
                        </td></tr>
                    </table>
                </div>
                <div className={`col-6`}>
                    <table className={`w-100 h-100`}>
                        <tr>
                            <td valign='top'>
                                <p className={``}>
                                    {this.props.description}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td valign='bottom'>
                                <h5 className='d-inline'>Tags: </h5>
                                <p className={`d-inline-block`}>
                                    {tags}
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className={`col-2`}>
                    <table className='w-100 h-100'>
                        <tr><td>
                            <h5 className={`text-center`}>
                                {this.props.manager.firstName + " " + this.props.manager.lastName}
                            </h5>    
                        </td></tr>
                        <tr><td className={`text-end`}>
                            <p>{this.props.manager.positionTitle}</p>    
                        </td></tr>
                        <tr><td className={`text-end`}>
                            <p>{this.props.manager.email}</p>  
                        </td></tr>
                    </table>
                </div>
            </div>
        );
    }
}

export default PositionItem;