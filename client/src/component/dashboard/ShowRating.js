import React from "react";
import { HR, ProjTech } from "../setupProfile/ShowProject";
import ReactStarsRating from 'react-awesome-stars-rating';
import ReactTooltip from "react-tooltip";
const ShowRating = (props) => {

    const { org_name,
        // organization,
        performance,
        role,
        technologies,
        start_date,
        end_date,
        feedback,
        star,
        certificate,
        date
    } = props.rating;
    return (
        <>
            <div className='container-fluid text-white ps-5 pe-5 pb-2 mt-2 mb-2' style={{ backgroundColor: "#000", borderRadius: "10px" }}>
                <div className='container-row text-end pt-4 mb-4' >
                    <ReactStarsRating value={star} count={5} size={20} isEdit={false} isHalf={true} starGap={2} className="pe-4" id="user_dashboard_rating" />
                    <ReactTooltip place="top" id='delete' type="error" effect="solid" />
                    {/* {(true) ? '' : <a style={{ color: "#a7a7a7" }} href="https://www.google.com" data-tip="certificate" data-for='certificate'></a>} */}
                    {certificate !== "" ? <a href={certificate} target="true"> <i className="fas fa-external-link-alt fa-lg" data-tip="certificate" data-for='certificate'></i></a> : ""}
                    <ReactTooltip id="certificate" place="top" type="info" effect="solid" />
                </div>
                <div className='container-row'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 col-xl-6 text-capitalize pb-4'>
                            <HR title="Company/ Organization name " />
                            <div>
                                <h6>{org_name} </h6>
                            </div>
                        </div>
                        <div className='col-sm-12 col-md-6 col-xl-6 pb-4'>
                            <HR title="Performance " />
                            <h6>{performance}</h6>
                        </div>
                    </div>
                </div>
                <div className='container-row '>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 col-xl-6 text-justify pt-3 pb-4'>
                            <HR title="Technologies" />
                            <div style={{ fontSize: "smaller" }}>
                                {technologies.map((tag, index) => {
                                    return <ProjTech
                                        key={index}
                                        index={index}
                                        tag={tag}
                                    />
                                }
                                )}
                            </div>
                        </div>
                        <div className='col-sm-12 col-md-6 col-xl-6 pt-3 pb-4'>
                            <HR title="Role/Task in project" />
                            <h6>{role}</h6>
                        </div>
                    </div>
                </div>

                <div className='container-row '>
                    <div className='row text-justify '>
                        <div className='col-sm-12 col-md-3 pt-3 pb-4 col-xl-3 text-justify' >
                            <HR title="Work Duration" />
                            <h6>{new Date(start_date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })} - {new Date(end_date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
                            </h6>
                        </div>
                        <div className='col-sm-12 col-md-9  pt-3 col-xl-9 text-justify' >
                            <HR title="Project Description" />
                            <p style={{ fontSize: "smaller" }}>{feedback}</p>
                        </div>
                    </div>
                </div>
                <p className="text-end feedback-date pt-2">{new Date(date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}</p>
            </div>

        </>
    );
}

export default ShowRating;