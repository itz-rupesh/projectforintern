import React from "react";
import { HR } from "./ShowProject";
import ReactTooltip from "react-tooltip";
const ShowEducation = (props) => {

    return (
        <>
            <div className='container-fluid text-white ps-5 pe-5 pb-5 mt-2 mb-2' style={{ backgroundColor: "#000", borderRadius: "10px" }}>
                <div className='container-row text-end pt-4' >
                    {(props.showDeleteBtn) ? <i data-tip="Delete Record" data-for='delete' className="fas fa-trash-alt fa-lg" onClick={() => props.onSelect(props.id)}></i> : ''}
                    <ReactTooltip place="top" id='delete' type="error" effect="solid" />
                </div>
                <div className='container-row pt-5'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 col-xl-6 pb-4'>
                            <HR title="Degree Type" />
                            <h4>{props.type}</h4>
                        </div>
                        <div className='col-sm-12 col-md-6 col-xl-6 pb-4'>
                            <HR title="Name of Degree" />
                            <h4>{props.degree}</h4>
                        </div>
                    </div>
                </div>

                <div className='container-row'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 col-xl-6 pb-4'>
                            <HR title="College Name" />
                            <h4>{props.college}</h4>
                        </div>
                        <div className='col-sm-12 col-md-6 col-xl-6 pb-4'>
                            <HR title="Year of Passing" />
                            <h4>{props.yop}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default ShowEducation;