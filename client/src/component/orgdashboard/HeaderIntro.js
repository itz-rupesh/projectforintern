import React from "react";
import Cover from '../../images/cognizantCover.jpg';
import Logo from '../../images/cognizantLogo.jpg';
import "./OrgDashboard.css";
import ReactStarsRating from 'react-awesome-stars-rating';
import ReactTooltip from 'react-tooltip';
import { HR, ProjTech } from "../setupProfile/ShowProject";

const HeaderIntro = (props) => {
    const {
        name,
        email,
        technologies,
        about,
        socialLinks,
        documents,
        current_rating
    } = props.basic;

    return (
        <div className="top-banner-container mt-5 mb-3" >
            <div className="contanier-fluid top-banner">
                <div className="cover-div">
                    <img src={documents.cover} className="img-fluid cover-img p-0 m-0" alt="image not found"></img>
                </div>
                <div className="logo-div">
                    <img src={documents.logo} className=" logo-image img-fluid" alt="image not found"></img>
                </div>
                <ReactStarsRating value={current_rating} count={5} size={15} isEdit={false} starGap={2} className="org-rating" id="showRatingAtTopHeader" />

            </div>
            <div className=" pt-5">
                <div className="pt-md-3 pt-0 m-4 ">
                    <h5 className="pb-3"> {name} <i className="fa-solid fa-circle-check fa-sm text-primary" data-tip="verified" data-for='verified'></i></h5>
                    <ReactTooltip place="top" id='verified' type="info" effect="solid" className="pt-1 pb-1 mb-5" />
                    <div className="row">
                        <div className="col-12 col-md-6 p-3">
                            <HR title="About" />
                            <p className="about-text pe-3"> {about}</p>
                        </div>
                        <div className="col-12 col-md-6 p-3 org-tech">
                            <HR title="Technologies" />
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

                    <div className="col-12 pb-4 mt-4 p-2">
                        <HR title="Contect us" />
                        {
                            socialLinks.map((obj, index) => {
                                return (<span key={index}>
                                    {obj.icon === 'far fa-envelope fa-lg p-2' ?
                                        <a href={`mailto:${obj.link}`}  ><i className={`${obj.icon} org-dashboard-social-link`}></i></a> :
                                        <a href={obj.link} target='_blank' rel="noreferrer noopener" ><i className={`${obj.icon} org-dashboard-social-link`}></i></a>
                                    }
                                </span>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>


    );
}
export default HeaderIntro;