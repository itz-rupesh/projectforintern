import React from "react";
import { HR, ProjTech } from "../setupProfile/ShowProject";
import ReactStarsRating from 'react-awesome-stars-rating';
import ReactTooltip from "react-tooltip";

const ShowOrgRating = (props) => {
    // const Tech = ["java", "pyhton", "javascript", "java", "pyhton", "javascript", "java", "pyhton", "javascript"];
    const { user_name, experience, feedback, star, date } = props.rating;
    return (
        <>
            <div className='container-fluid text-white ps-5 pe-5 pb-2  mt-2 mb-2' style={{ backgroundColor: "#000", borderRadius: "10px" }}>
                <div className='container-row text-end pt-4 mb-4' >
                    <ReactStarsRating value={star} count={5} size={20} isEdit={false} starGap={2} className="pe-0" />
                    <ReactTooltip place="top" id='delete' type="error" effect="solid" />
                </div>
                <div className='container-row'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 col-xl-6 text-capitalize pb-4'>
                            <HR title="Candidate name " />
                            <h5>{user_name}</h5>
                        </div>
                        <div className='col-sm-12 col-md-6 col-xl-6 pb-4'>
                            <HR title="Working Experience" />
                            <h5>{experience}</h5>
                        </div>
                    </div>
                </div>
                <div className='container-row '>
                    <div className='row text-justify '>
                        <div className='col-sm-12 col-md-12  pt-3 col-xl-12 text-justify' >
                            <HR title="Feedback" />
                            <p>{feedback}</p>
                        </div>
                    </div>
                </div>
                <p className="text-end feedback-date pt-2">{new Date(date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}</p>
            </div>

        </>
    );
}

export default ShowOrgRating;