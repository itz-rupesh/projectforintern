import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import profileImage from '../../../images/profile2.jpg';
import '../../dashboard/dashboard.css';
import ReactStarsRating from 'react-awesome-stars-rating';
import { ProjTech } from '../../setupProfile/ShowProject';
import { HR } from '../../setupProfile/ShowProject';
// import { SocialLinkIcon } from '../setupProfile/ShowSocialLink'
import UserProfileForOrgMenubar from './UserProfileForOrgMenubar';
// import { current } from '../OrgFeed';
import { CurrentUserContext } from "../../../App";

const UserProfileForOrg = () => {
    const { userState } = useContext(CurrentUserContext);
    // const user_id = current.user_id;
    const user_id = useState;
    const navigate = useNavigate();
    const [basicData, setBasicData] = useState({
        name: '',
        email: '',
        skills: [],
        profession: '',
        yoe: '',
        socialLinks: [],
        current_rating: 0
    });

    useEffect(() => {
        if (user_id === "") {
            return navigate('/organization/orgfeed');
        }
        axios.get('/org/verify', { withCredentials: true })
            .then((res) => {
                // cogoToast.success("Well-Come to Dashboard")
            }).catch((err) => {
                cogoToast.error(err.response.data.error);
                navigate('/organization/login/signin');
            });

        axios.get(`/org/feed/userprofile/basic/${userState}`, { withCredentials: true })
            .then((res) => {
                setBasicData(res.data);
            }).catch((err) => {
                // cogoToast.error(err.response.data.error);
            })
    }, []);


    return (
        <>
            <div className='container mt-5'>
                <div className='container pt-5'>
                    <div className='row'>
                        <div className='col-5 col-sm-4 col-md-3 col-lg-2 pe-4'>
                            <div className='dashboard-profile'>
                                <img className="img-fluid border border-2 rounded border-dark" src={profileImage} alt="img not found" />
                                {/* <button className='w-100 border mt-3  dashboard-profile-edit'><i className="far fa-edit"></i></button> */}
                                {/* <Link to="/home"> <i className="fa-solid fa-camera-rotate dashboard-profile-edit fa-xl "></i></Link> */}
                            </div>
                            <div className="pt-4">
                                {
                                    basicData.socialLinks.map((obj, index) => {
                                        return (<span key={index}>
                                            {obj.icon === 'far fa-envelope fa-lg p-2' ?
                                                <a href={`mailto:${obj.link}`}  ><i className={`${obj.icon} social-link`}></i></a> :
                                                <a href={obj.link} target='_blank' rel="noreferrer noopener" ><i className={`${obj.icon} social-link`}></i></a>
                                            }
                                        </span>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div className='col-7 col-sm-8 col-md-9 col-lg-10 p-4 text-white' style={{ backgroundColor: "#000", borderRadius: "10px" }}>
                            <h4 className=''>{basicData.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</h4>
                            <h6 className='text-primary'><i className="fas fa-graduation-cap"></i> {basicData.profession}</h6>
                            <ReactStarsRating value={basicData.current_rating} count={5} size={20} isEdit={false} isHalf={true} starGap={2} />
                            <div className='skills pt-4'>
                                <HR title="Skills" />
                                {basicData.skills.map((tag, index) => {
                                    return <ProjTech
                                        key={index}
                                        index={index}
                                        tag={tag}
                                    />
                                }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-5' >
                    <div className='col-12 '>
                        <UserProfileForOrgMenubar
                            current_user_id={user_id}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserProfileForOrg;