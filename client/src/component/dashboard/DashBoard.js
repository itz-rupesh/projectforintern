import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate} from 'react-router-dom';
import cogoToast from 'cogo-toast';
// import profileImage from '../../images/profile2.jpg';
import Spiner from '../../images/Spinner.gif';
import './dashboard.css';
import ReactStarsRating from 'react-awesome-stars-rating';
import { ProjTech } from '../setupProfile/ShowProject';
import { HR } from '../setupProfile/ShowProject';
// import { SocialLinkIcon } from '../setupProfile/ShowSocialLink'
import Menu from './Menu';
import { NavbarContext } from '../../App';

// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
const Input = styled('input')({
    display: 'none',
});

const DashBoard = () => {
    const { dispatch } = useContext(NavbarContext);
    const navigate = useNavigate();
    const [basicData, setBasicData] = useState({
        name: '',
        email: '',
        skills: [],
        profession: '',
        yoe: '',
        socialLinks: [],
        current_rating: 0,
        profile_image: ''
    });
    const [loading, setLoading] = useState(false);
    const showDashBoard = async () => {
        axios.get('/account/verify', { withCredentials: true })
            .then((res) => {
                // cogoToast.success("Well-Come to Dashboard")
            }).catch((err) => {
                cogoToast.error(err.response.data.error);
                navigate('/login/signin');
            });
        axios.get('/account/info/basic', { withCredentials: true })
            .then((res) => {
                setBasicData(res.data);
            }).catch((err) => {
                // cogoToast.error(err.response.data.error);
            })
    }
    useEffect(() => {
        showDashBoard();
    }, []);

    const fileUploader = (e) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('postDoc', e.target.files[0]);
        axios.post('/document/user/uploader', formData, { withCredentials: true }).then((res) => {
            // console.log(res.data.url);
            axios.post('/account/updateimage', { url: res.data.url }, { withCredentials: true }).then((result) => {
                setBasicData({ ...basicData, profile_image: res.data.url });
                dispatch({ type: "USER", payload: { image: result.data.image, name: result.data.name } });
                cogoToast.success(result.data.message);
                setLoading(false);
            }).catch((err) => {
                cogoToast.error(err.response.data.error);
                setLoading(false);
                e.target.value = '';
            })
            // setAchievObj({ ...achievObj, document: res.data.url });
            e.target.value = '';
        }).catch((err) => {
            cogoToast.error(err.response.data.error);
            setLoading(false);
            e.target.value = '';
        })
    }


    return (
        <>
            <div className='container mt-5'>
                <div className='container pt-5'>
                    {/* <div className='container-row text-end mb-4'>
                        <button className='border w-auto item-end' > Edit Profile <i className="far fa-edit"></i></button>
                    </div> */}
                    <div className='row'>
                        <div className='col-5 col-sm-4 col-md-3 col-lg-2 pe-4'>
                            <div className='dashboard-profile'>
                                <img className="img-fluid border border-2 rounded border-dark" src={basicData.profile_image} alt="img not found" />
                                {/* <button className='w-100 border mt-3  dashboard-profile-edit'><i className="far fa-edit"></i></button> */}
                                {
                                    loading ? <img src={Spiner} alr="Uploading..." className='update-image-loader' /> :
                                        <label htmlFor="icon-button-file" className='dashboard-profile-edit'>
                                            <Input accept="image/*" id="icon-button-file" type="file" onChange={fileUploader} />
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <PhotoCamera />
                                            </IconButton>
                                        </label>
                                }
                                {/* <Link to="/home"> <i className="fa-solid fa-camera-rotate dashboard-profile-edit fa-xl "></i></Link>     */}
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
                        <Menu />
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashBoard;