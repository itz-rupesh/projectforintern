import React, { useEffect, useState } from "react";
import axios from "axios";
import cogoToast from 'cogo-toast';
import { useNavigate } from 'react-router-dom';
import "./OrgDashboard.css";
import OrgDashMenu from "./OrgDashMenu";
import HeaderIntro from "./HeaderIntro";


const OrgDashboard = () => {
    const navigate = useNavigate();
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

    const showOrgDashboard = () => {                  // USER AUTHENTICATION 
        axios.get('/org/verify', { withCredentials: true })
            .then((res) => {
            }).catch((err) => {
                cogoToast.error("Session expire, Please login again");
                navigate('/organization/login/signin');
            })
    }
    useEffect(() => {
        showOrgDashboard();
    }, []);

    useEffect(() => {
        axios.get('/org/info/basic', { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setBasic(res.data);
                console.log(basic);
            }).catch((err) => {
                console.log(err.response.data.error);
            })
    }, []);

    const star = () => {

    }
    return (
        <div className="container pt-5 org-dashboard text-white">
            <HeaderIntro
                basic={basic}
            />
            <OrgDashMenu />
            {/* <MenuBar /> */}
        </div>
    );
}
export default OrgDashboard;