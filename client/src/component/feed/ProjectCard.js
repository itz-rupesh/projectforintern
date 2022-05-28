import React from "react";
// import CompLogo from '../../images/cognizantLogo.jpg';
import ReactStarsRating from 'react-awesome-stars-rating';
import './ProjectCard.css';
const ProjectCard = (props) => {
    const {
        _id,
        title,
        compensation,
        description,
        left_count,
        right_count,
        memebers_required,
        organization_name,
        post_date,
        technologies,
        role,
        start_date,
        work_type,
        location,
        organization_id } = props.project;
    const CompLogo = props?.project?.organization_id?.documents?.logo ? props?.project?.organization_id?.documents?.logo : props?.logo;
    const Rating = props?.project?.organization_id?.current_rating ? props?.project?.organization_id?.current_rating : props?.rating;

    return (<>

        <div className="container-fluid project-card-main-container ps-md-4 pe-md-4 pt-md-2" >
            <div className="row">
                <div className="col-12 company-intro-container ps-0 pe-0 pb-0 pt-2 m-0">
                    <img src={CompLogo} alt="logo" className="project-card-org-logo ms-3  " />
                    <span className="project-org-name ps-3">{organization_name} <i className="fa-solid fa-circle-check fa-sm text-primary"></i>
                        <ReactStarsRating value={Rating ? Rating : 0} count={5} size={11} isEdit={false} starGap={2} className="project-org-rating" />
                    </span>
                    {props.showFullCard && props.ShowCloseButton ? <i className="fa-solid fa-xmark fa-2x close-fullview-icon text-danger" onClick={() => props?.onSelect(!props?.showFullCard)}></i>
                        : props.showFullCardButton ? <i className="fa-solid fa-expand fa-lg expand-icon fa-2x" onClick={() => props?.onSelect(_id)}></i> : ''
                    }
                </div>
            </div>
            <hr className="mb-3 mt-2" />
            <div className="row">
                <div className="col-12 project-card-title text-start text-center ps-5 pe-5">
                    {title.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
                    <span className="job-requirement-icon ps-2 pe-2"><i className="fa-solid fa-user-large fa-sm"></i> {memebers_required}</span>
                </div>
            </div>

            <div className="row pt-3">
                <div className="col-6 col-sm-6 info-container">
                    <div className="project-card-heading">role</div>
                    <hr className="project-card-hr" />
                    <p className="project-card-value">{role}</p>
                </div>
                <div className="col-6 col-sm-6">
                    <div className="project-card-heading">compensation</div>
                    <hr className="project-card-hr" />
                    <p className="project-card-value">{compensation}</p>
                </div>
            </div>
            <div className="row pt-1">
                <div className="col-6 col-sm-6 info-container">
                    <div className="project-card-heading">work type</div>
                    <hr className="project-card-hr" />
                    <p className="project-card-value">{work_type} : {location.toUpperCase()}</p>
                </div>
                <div className="col-6 col-sm-6">
                    <div className="project-card-heading">start from</div>
                    <hr className="project-card-hr" />
                    <p className="project-card-value">{new Date(start_date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>
            <div className="row pt-1">
                <div className="col-12 col-md-6 info-container">
                    <div className="project-card-heading">skills</div>
                    <hr className="project-card-hr" />
                    <p className="project-card-value text-justify">{technologies.map((tech, index) => <button key={index} className="project-card-skill-tag">{tech}</button>)}</p>
                </div>
                <div className="col-12 col-md-6">
                    <div className="project-card-heading">description</div>
                    <hr className="project-card-hr" />
                    <p className="project-card-value">{description}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12 project-card-footer text-end">
                    <hr />
                    <span className="footer-info-tag"><i className="fa-solid fa-angles-left fa-sm"></i> {left_count}</span>
                    <span className="footer-info-tag">{right_count} <i className="fa-solid fa-angles-right fa-sm"></i> </span>
                </div>
            </div>
        </div>

    </>);
}

export default ProjectCard;