import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import cogoToast from 'cogo-toast';
import { useNavigate } from 'react-router-dom';
// import "./OrgDashboard.css";
import HeaderIntro from "../../orgdashboard/HeaderIntro";
// import { current, favi } from "../Feed";
import OrgProfileForUserMenubar from "./OrgProfileForUserMenubar";
import { CurrentUserContext } from "../../../App";


const OrgProfileForUser = () => {
    const { userState } = useContext(CurrentUserContext);
    const navigate = useNavigate();
    let current_org_id = userState;


    useEffect(async () => {
        if (userState === "") {
            return navigate('/feed');
        }
        showOrgDashboard();
        getBasicData();

    }, []);

    const [basic, setBasic] = useState({
        name: '',
        email: '',
        technologies: [],
        about: '',
        socialLinks: [],
        documents: {
            logo: '',
            cover: '',
            supportiveDoc: ''
        },
        current_rating: 0
    });
    const showOrgDashboard = () => {
        console.log("verify");           // USER AUTHENTICATION
        axios.get('/account/verify', { withCredentials: true })
            .then((res) => {
            }).catch((err) => {
                cogoToast.error("Session expire, Please login again");
                navigate('/login/signin');
            })
    }
    const getBasicData = () => {
        console.log("basic");
        axios.get(`/account/feed/orgprofile/basic/${userState}`, { withCredentials: true })
            .then((res) => {
                // console.log(res.data);
                setBasic(res.data);
                // console.log(basic);
            }).catch((err) => {
                console.log(err.response.data.error);
            })
    }


    return (
        <>
            <div className="container pt-5 org-dashboard text-white">

                <HeaderIntro
                    basic={basic}
                />
                <OrgProfileForUserMenubar
                    current_org_id={userState}
                />

            </div>
        </>
    )
}

export default OrgProfileForUser;