import React from "react";
import ReactStarsRating from 'react-awesome-stars-rating';
import '../feed/ProjectCard.css';
const UserProfileCard = (props) => {
    const {
        name,
        profile_image,
        projects,
        education,
        achievements,
        skills,
        current_rating,
    } = props.post.user.userID;

    const {
        // _id,
        title,
        memebers_required,
        technologies,
    } = props.post.project;
    var mached_skills = technologies.filter((n) => {
        return skills.indexOf(n) !== -1;
    });
    var other_skills = skills.filter((n) => {
        return mached_skills.indexOf(n) === -1;
    });
    return (<>

        <div className="container-fluid project-card-main-container ps-md-4 pe-md-4 pt-md-2" >
            <div className="row">
                <div className="col-12 company-intro-container ps-0 pe-0 pb-0 pt-2 m-0">
                    <img src={profile_image} alt="logo" className="project-card-org-logo ms-3  " />
                    <span className="project-org-name ps-3">{name}
                    </span>
                    <span>
                        <ReactStarsRating value={current_rating} count={5} size={11} isEdit={false} starGap={2} className="project-org-rating" />
                    </span>
                    {props.showFullCard && props.ShowCloseButton ? <i className="fa-solid fa-xmark fa-2x close-fullview-icon text-danger" onClick={() => props?.onSelect(!props?.showFullCard)}></i>
                        : props.showFullCardButton ? <i className="fa-solid fa-expand fa-lg expand-icon fa-2x" onClick={() => props?.onSelect(props.post.project._id + props.post.user.userID._id)}></i> : ''
                    }
                </div>
            </div>
            <hr className="mb-2 mt-2" />
            <div className="row">
                <div className="col-12 project-card-title text-start text-center ps-5 pe-5">
                    {title.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
                    <span className="job-requirement-icon ps-2 pe-2"><i className="fa-solid fa-user-large fa-sm"></i> {memebers_required}</span>
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-6 col-sm-6 info-container">
                    <div className="project-card-heading">{`past projects: ${projects.length}`}</div>
                    <hr className="project-card-hr" />
                    <ul className="list-Container">
                        {
                            projects.map((proj, index) => {
                                return <span key={index}><li key={index}><a href={proj?.link} target="true" className="link-on-list">{proj.title}</a></li>
                                    {proj.technologies.map((tech, ind) => {
                                        return <button key={ind} className="project-mini-tag-for-pastProjects">{tech}</button>
                                    })}
                                </span>
                            })
                        }
                    </ul>
                </div>
                <div className="col-6 col-sm-6">
                    <div className="project-card-heading">{`matched skills: ${mached_skills.length}`}</div>
                    <hr className="project-card-hr" />
                    <p className="project-card-value text-justify">{mached_skills.map((tech, index) => <button key={index} className="project-card-skill-tag" style={{ backgroundColor: "#029121" }}>{tech}</button>)}</p>
                </div>
            </div>
            <div className="row pt-1">
                <div className="col-6 col-sm-6 info-container">
                    <div className="project-card-heading">{`educations: ${education.length}`}</div>
                    <hr className="project-card-hr " />
                    <ul className="list-Container">
                        {
                            education.map((edu, index) => {
                                return <li key={index}>{edu.degree}</li>
                            })
                        }
                    </ul>
                </div>
                <div className="col-6 col-sm-6">
                    <div className="project-card-heading">{`achievements: ${achievements.length}`}</div>
                    <hr className="project-card-hr " />
                    <ul className="list-Container">
                        {
                            achievements.map((achi, index) => {
                                return <li key={index}><a href={achi?.document} target="true" className="link-on-list">{achi.title}</a></li>
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="row pt-1">
                <div className="col-12 col-md-12 info-container">
                    <div className="project-card-heading">{`other skills: ${other_skills.length}`}</div>
                    <hr className="project-card-hr" />
                    <p className="project-card-value text-justify">{other_skills.map((tech, index) => <button key={index} className="project-card-skill-tag">{tech}</button>)}</p>
                </div>
            </div>

        </div>

    </>);
}

export default UserProfileCard;