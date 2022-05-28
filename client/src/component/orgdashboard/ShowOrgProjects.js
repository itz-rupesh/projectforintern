import React from "react";
import ReactTooltip from 'react-tooltip';
import { ProjTech } from "../setupProfile/ShowProject";
import { HR } from "../setupProfile/ShowProject";
const ShowOrgProjects = (props) => {
    const {
        title,
        start_date,
        memebers_required,
        description,
        technologies,
        role,
        work_type,
        location,
        compensation
    } = props.project;
    return (
        <>
            <div className='container-fluid text-white ps-5 pe-5 pb-5 mt-2 mb-2' style={{ backgroundColor: "#000", borderRadius: "10px" }}>
                <div className='container-row text-end pt-4' >
                    {/* {(!props.link) ? '' : <a style={{ color: "#a7a7a7" }} href={props.link} target="_blank" data-tip="Project Link" data-for='link'>
                        <i className="fas fa-external-link-alt fa-lg "></i></a>}
                    <ReactTooltip id="link" place="top" type="info" effect="solid" /> */}
                    {(props.showDeleteBtn) ? <> &nbsp; &nbsp; <i data-tip="Add to Past Projects" data-for='delete' className="fa-solid fa-arrow-right-from-bracket fa-lg" onClick={() => props.onSelect(props.id)}></i> </> : ''}
                    <ReactTooltip place="top" id='delete' type="info" effect="solid" className="pt-1 pb-1 ps-2 pe-2" />
                </div>
                <div className='container-row pt-5'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-5 col-xl-5 text-capitalize pb-4'>
                            <HR title="Project Title " />
                            <h6>{title}</h6>
                        </div>
                        <div className='col-6 col-md-4 col-xl-4 pb-4'>
                            <HR title="Role " />
                            <h6>{role}</h6>
                        </div>
                        <div className='col-6 col-md-3 col-xl-3 pb-4'>
                            <HR title="Member required " />
                            <h6>{memebers_required}</h6>
                        </div>
                    </div>
                </div>
                <div className='container-row '>
                    <div className='row'>
                        <div className='col-sm-12 col-md-5 col-xl-5 text-justify pt-3 pb-4'>
                            <HR title="Compensation" />
                            <h6>{compensation}</h6>
                        </div>
                        <div className='col-6 col-md-4 col-xl-4 pt-3 pb-4'>
                            <HR title="Work Type" />
                            <h6>{work_type} - {location.toUpperCase()}</h6>
                        </div>
                        <div className='col-6 col-md-3 col-xl-3 pt-3 pb-4'>
                            <HR title="Work Start Date" />
                            <h6>{new Date(start_date).toLocaleDateString('en-us', { day: "numeric", year: "numeric", month: "short" })}</h6>
                        </div>
                    </div>
                </div>

                <div className='container-row '>
                    <div className='row text-justify '>

                        <div className='col-sm-12 col-md-5 col-xl-5 text-justify pt-3 pb-4'>
                            <HR title="Skills Required" />
                            <div > <small>
                                {technologies.map((tag, index) => {
                                    return <ProjTech
                                        key={index}
                                        index={index}
                                        tag={tag}
                                    />
                                }
                                )}
                            </small>
                            </div>
                        </div>
                        <div className='col-sm-12 col-md-7 col-xl-7 text-justify pt-3 ' >
                            <HR title="Description" />
                            <p ><small>{description}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShowOrgProjects;
