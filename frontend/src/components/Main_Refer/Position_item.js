import React from "react";
import ReferCSS from "./main_refer.module.css"
import { Link } from 'react-router-dom'
import * as paths from "../../utils/paths"

// Functional component that contains a single position on the refer page
// Props contains the information about a position
function PositionItem(props) {
    // Convert tags array to a comma separated string
    let tags = props.tags.reduce((acc, e) => acc + e + ", ", "");
    tags = tags.substring(0, tags.length - 2)

    // Return component to be rendered
    return (
        // Containing div
        <div className={`${ReferCSS.positionContainer} row`}>
            {/* Wireframe had images for position, not really sure what to put here */}
            <div className={`col-1`}>img</div>
            {/* Div that contains position title, years experience and refer button */}
            <div className={`col-3 p-0 m-0`}>
                <table className={`w-100 h-100`}>
                    <tr><td><h4 className='text-center'>{props.title}</h4></td></tr>
                    <tr><td><p className={`text-center`}>Years Experience: {props.minYearExperience}</p></td></tr>
                    <tr><td>
                        <div className={`text-center ${ReferCSS.referBtnContainer}`}>
                            {/* Link to create refer page, passes position info in props as state */}
                            <Link className='link' to={{ pathname: paths.CREATE_REFER, state: props }}>
                                <button className={ReferCSS.referBtn}>REFER</button>
                            </Link>
                        </div>
                    </td></tr>
                </table>
            </div>
            {/* Div that contains description and tags */}
            <div className={`col-6`}>
                <table className={`w-100 h-100`}>
                    <tr>
                        <td valign='top'>
                            <p className={``}>
                                {props.description}
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
            {/* Div that manager info */}
            <div className={`col-2`}>
                <table className='w-100 h-100'>
                    <tr><td>
                        <h5 className={`text-center`}>
                            {props.manager.firstName + " " + props.manager.lastName}
                        </h5>    
                    </td></tr>
                    <tr><td className={`text-end`}>
                        <p>{props.manager.positionTitle}</p>    
                    </td></tr>
                    <tr><td className={`text-end`}>
                        <p>{props.manager.email}</p>  
                    </td></tr>
                </table>
            </div>
        </div>
    );
}

// Export PositionItem component for use in Main_Refer.js
export default PositionItem;