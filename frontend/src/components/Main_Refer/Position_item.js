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
            {/* Div that contains position title, years experience and refer button */}
            <div className={`col-3 p-0 m-0`}>
                <div className='mb-2'><h5 className='text-center'><strong>{props.title}</strong></h5></div>
                <div className={`text-center`}><p className='p-0 m-0'><strong>Salary: </strong>${props.salary}</p></div>
                <div className={`text-center p-0 m-0`}><p className='p-0 m-0'><strong>Years Experience: </strong>{props.minYearExperience}</p></div>
                <div className={`mt-4 text-center ${ReferCSS.referBtnContainer}`}>
                    {/* Link to create refer page, passes position info in props as state */}
                    <Link className='link' to={{ pathname: paths.CREATE_REFER, state: props }}>
                        <button className={ReferCSS.referBtn}>REFER</button>
                    </Link>
                </div>
            </div>
            {/* Div that contains description and tags */}
            <div className={`col-7 h-100 ${ReferCSS.tagContainer}`}>
                <div>
                    {(props.description.length > 250) ?
                    <>
                        <p>{props.description.substring(0, 250) + "... "}
                            <Link className={``} to={{ pathname: paths.CREATE_REFER, state: props }}>
                                (view more)
                            </Link>
                        </p>
                    </>
                    : <p>{props.description}</p>}
                </div>
                <div className={`${ReferCSS.tags}`}>
                    <h5 className='d-inline'><strong>Tags: </strong></h5>
                    <p className={`d-inline-block m-0 mb-1 p-0`}>
                        {tags}
                    </p>
                </div>
            </div>
            {/* Div that manager info */}
            <div className={`col-2`}>
                <table className={`${ReferCSS.table}`}><tbody>
                    <tr><td>
                        <h5 className={`text-end`}>
                            {props.manager.firstName + " " + props.manager.lastName}
                        </h5>
                    </td></tr>
                    <tr><td className={`text-end`}>
                        <p>{props.manager.positionTitle}</p>
                    </td></tr>
                </tbody></table>
            </div>
        </div>
    );
}

// Export PositionItem component for use in Main_Refer.js
export default PositionItem;